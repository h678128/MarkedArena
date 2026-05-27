const STARTING_CASH = 100000;
const STORAGE_KEY = "markedarena-state-v1";
const LAYOUT_KEY = "markedarena-layout-v1";
const SPLIT_VIEW_KEY = "markedarena-split-view-v1";

const stocks = [
  {
    ticker: "AAPL",
    name: "Apple",
    price: 191.24,
    drift: 0.0008,
    volatility: 0.012,
    valueScore: 67,
    sentiment: 58,
    history: [184, 185, 187, 186, 189, 190, 191.24],
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    price: 427.83,
    drift: 0.0007,
    volatility: 0.011,
    valueScore: 61,
    sentiment: 65,
    history: [412, 417, 421, 420, 423, 426, 427.83],
  },
  {
    ticker: "NVDA",
    name: "Nvidia",
    price: 938.65,
    drift: 0.0013,
    volatility: 0.021,
    valueScore: 49,
    sentiment: 74,
    history: [865, 884, 901, 889, 918, 930, 938.65],
  },
  {
    ticker: "TSLA",
    name: "Tesla",
    price: 178.12,
    drift: 0.0004,
    volatility: 0.024,
    valueScore: 42,
    sentiment: 55,
    history: [189, 184, 181, 176, 179, 177, 178.12],
  },
  {
    ticker: "JPM",
    name: "JPMorgan Chase",
    price: 198.67,
    drift: 0.0005,
    volatility: 0.01,
    valueScore: 76,
    sentiment: 52,
    history: [190, 192, 194, 193, 196, 197, 198.67],
  },
  {
    ticker: "UNH",
    name: "UnitedHealth",
    price: 517.44,
    drift: 0.0003,
    volatility: 0.009,
    valueScore: 72,
    sentiment: 48,
    history: [529, 525, 521, 518, 514, 516, 517.44],
  },
  {
    ticker: "XOM",
    name: "Exxon Mobil",
    price: 117.08,
    drift: 0.0002,
    volatility: 0.013,
    valueScore: 81,
    sentiment: 46,
    history: [113, 114, 115, 116, 115, 117, 117.08],
  },
  {
    ticker: "SPY",
    name: "S&P 500 ETF",
    price: 523.19,
    drift: 0.00045,
    volatility: 0.007,
    valueScore: 64,
    sentiment: 60,
    history: [512, 514, 516, 518, 519, 522, 523.19],
  },
];

const agentsTemplate = [
  {
    id: "momentum",
    name: "Momentum Llama",
    style: "Trend",
    cash: STARTING_CASH,
    holdings: {},
    lastAction: "Venter",
    history: [STARTING_CASH],
  },
  {
    id: "value",
    name: "Value GPT",
    style: "Fundamental",
    cash: STARTING_CASH,
    holdings: {},
    lastAction: "Venter",
    history: [STARTING_CASH],
  },
  {
    id: "sentiment",
    name: "Sentiment Claude",
    style: "Nyhetsfølelse",
    cash: STARTING_CASH,
    holdings: {},
    lastAction: "Venter",
    history: [STARTING_CASH],
  },
  {
    id: "benchmark",
    name: "Market Basket",
    style: "Benchmark",
    cash: 0,
    holdings: {},
    lastAction: "Equal weight",
    history: [STARTING_CASH],
  },
];

let state = loadState();
let feedPaused = false;
let tickCount = 0;
let currentLayout = "standard";
let currentSplitView = localStorage.getItem(SPLIT_VIEW_KEY) || "dashboard";

const standardHeader = {
  eyebrow: "Alt-i-ett arbeidsflate",
  title: "Trading floor",
  summary: "Portefølje, marked, ordre og agenter i samme standardvindu.",
};

const splitViews = {
  dashboard: {
    eyebrow: "Split-visning",
    title: "Dashboard",
    summary: "Portefølje, cash, avkastning, benchmark og historikk i én rolig oversikt.",
  },
  market: {
    eyebrow: "Split-visning",
    title: "Marked",
    summary: "Overvåkningslisten med pris, dagsendring og signaler.",
  },
  trade: {
    eyebrow: "Split-visning",
    title: "Paper trading",
    summary: "Ordrepanel og posisjoner samlet for simulert handel.",
  },
  agents: {
    eyebrow: "Split-visning",
    title: "Agent arena",
    summary: "Leaderboard og beslutningslogg for strategiagentene.",
  },
};

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const formatPercent = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed?.market?.length) {
        return parsed;
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const initialAgents = clone(agentsTemplate);
  const benchmark = initialAgents.find((agent) => agent.id === "benchmark");
  const basket = stocks.slice(0, 6);
  const allocation = STARTING_CASH / basket.length;
  basket.forEach((stock) => {
    benchmark.holdings[stock.ticker] = allocation / stock.price;
  });

  return {
    cash: STARTING_CASH,
    holdings: {},
    market: clone(stocks),
    portfolioHistory: [STARTING_CASH],
    agents: initialAgents,
    log: ["Arenaen er klar med simulert markedsfeed."],
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function stockByTicker(ticker) {
  return state.market.find((stock) => stock.ticker === ticker);
}

function positionValue(holdings) {
  return Object.entries(holdings).reduce((sum, [ticker, quantity]) => {
    const stock = stockByTicker(ticker);
    return sum + (stock ? stock.price * quantity : 0);
  }, 0);
}

function portfolioValue(portfolio = state) {
  return portfolio.cash + positionValue(portfolio.holdings);
}

function stockDayChange(stock) {
  const previous = stock.history.at(-2) ?? stock.price;
  return ((stock.price - previous) / previous) * 100;
}

function stockMomentum(stock) {
  const first = stock.history[0];
  const last = stock.history.at(-1);
  return ((last - first) / first) * 100;
}

function signalFor(stock) {
  const momentum = stockMomentum(stock);
  if (momentum > 4 && stock.sentiment > 55) return "Momentum";
  if (stock.valueScore > 74) return "Value";
  if (stockDayChange(stock) < -1.5) return "Dip";
  return "Hold";
}

function render() {
  renderStats();
  renderMarket();
  renderTradeControls();
  renderHoldings();
  renderAgents();
  renderLog();
  drawPortfolioChart();
  saveState();
}

function renderStats() {
  const value = portfolioValue();
  const totalReturn = ((value - STARTING_CASH) / STARTING_CASH) * 100;
  const benchmark = state.agents.find((agent) => agent.id === "benchmark");
  const benchmarkReturn = ((portfolioValue(benchmark) - STARTING_CASH) / STARTING_CASH) * 100;

  document.querySelector("#portfolioValue").textContent = formatMoney(value);
  document.querySelector("#cashValue").textContent = formatMoney(state.cash);
  document.querySelector("#returnValue").textContent = formatPercent(totalReturn);
  document.querySelector("#returnValue").className = `metric ${totalReturn >= 0 ? "positive" : "negative"}`;
  document.querySelector("#benchmarkValue").textContent = formatPercent(benchmarkReturn);
  document.querySelector("#benchmarkValue").className = `metric ${benchmarkReturn >= 0 ? "positive" : "negative"}`;
  document.querySelector("#portfolioSummary").textContent =
    totalReturn >= benchmarkReturn
      ? "Du leder mot benchmark akkurat nå."
      : "Benchmark ligger foran, men arenaen er fortsatt ung.";
}

function renderMarket() {
  const rows = state.market
    .map((stock) => {
      const change = stockDayChange(stock);
      const direction = change >= 0 ? "positive" : "negative";
      return `
        <tr>
          <td>
            <div class="ticker-cell">
              <span class="ticker-badge">${stock.ticker}</span>
            </div>
          </td>
          <td>${stock.name}</td>
          <td>${formatPrice(stock.price)}</td>
          <td class="${direction}">${formatPercent(change)}</td>
          <td><span class="signal">${signalFor(stock)}</span></td>
        </tr>
      `;
    })
    .join("");

  document.querySelector("#marketRows").innerHTML = rows;
  document.querySelector("#feedStatus").textContent = feedPaused ? "Feed pauset" : "Feed aktiv";
}

function renderTradeControls() {
  const select = document.querySelector("#tickerSelect");
  if (select.options.length === state.market.length) return;

  select.innerHTML = state.market
    .map((stock) => `<option value="${stock.ticker}">${stock.ticker} - ${stock.name}</option>`)
    .join("");
}

function renderHoldings() {
  const entries = Object.entries(state.holdings).filter(([, quantity]) => quantity > 0);
  const list = document.querySelector("#holdingsList");

  if (!entries.length) {
    list.innerHTML = `<p class="muted">Ingen posisjoner ennå. Kjøp en aksje for å starte.</p>`;
    return;
  }

  list.innerHTML = entries
    .map(([ticker, quantity]) => {
      const stock = stockByTicker(ticker);
      const value = stock.price * quantity;
      return `
        <div class="holding-row">
          <div>
            <strong>${ticker}</strong>
            <span class="muted">${quantity.toFixed(2)} aksjer</span>
          </div>
          <strong>${formatMoney(value)}</strong>
        </div>
      `;
    })
    .join("");
}

function renderAgents() {
  const sorted = [...state.agents].sort((a, b) => portfolioValue(b) - portfolioValue(a));
  document.querySelector("#agentRows").innerHTML = sorted
    .map((agent, index) => {
      const value = portfolioValue(agent);
      const totalReturn = ((value - STARTING_CASH) / STARTING_CASH) * 100;
      return `
        <tr>
          <td>${index + 1}. ${agent.name}</td>
          <td>${agent.style}</td>
          <td>${formatMoney(value)}</td>
          <td class="${totalReturn >= 0 ? "positive" : "negative"}">${formatPercent(totalReturn)}</td>
          <td>${agent.lastAction}</td>
        </tr>
      `;
    })
    .join("");
}

function renderLog() {
  document.querySelector("#agentLog").innerHTML = state.log
    .slice(-12)
    .reverse()
    .map((entry) => `<div class="log-item"><strong>Agentlogg</strong>${entry}</div>`)
    .join("");
}

function drawPortfolioChart() {
  const canvas = document.querySelector("#portfolioChart");
  const context = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  context.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const padding = 18;
  const history = state.portfolioHistory.length > 1 ? state.portfolioHistory : [STARTING_CASH, portfolioValue()];
  const min = Math.min(...history) * 0.995;
  const max = Math.max(...history) * 1.005;
  const range = Math.max(1, max - min);

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#eef3f0";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "#d6dfda";
  context.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = padding + ((height - padding * 2) / 3) * i;
    context.beginPath();
    context.moveTo(padding, y);
    context.lineTo(width - padding, y);
    context.stroke();
  }

  context.strokeStyle = "#0c6d73";
  context.lineWidth = 3;
  context.beginPath();
  history.forEach((value, index) => {
    const x = padding + ((width - padding * 2) * index) / Math.max(1, history.length - 1);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();

  context.fillStyle = "#17211d";
  context.font = "700 13px system-ui";
  context.fillText("Porteføljehistorikk", padding, 24);
}

function executeTrade(portfolio, ticker, side, quantity) {
  const stock = stockByTicker(ticker);
  if (!stock || quantity <= 0) {
    return { ok: false, message: "Ugyldig ordre." };
  }

  const cost = stock.price * quantity;
  if (side === "buy") {
    if (portfolio.cash < cost) {
      return { ok: false, message: "Ikke nok virtuell cash." };
    }
    portfolio.cash -= cost;
    portfolio.holdings[ticker] = (portfolio.holdings[ticker] || 0) + quantity;
    return { ok: true, message: `Kjøpte ${quantity.toFixed(2)} ${ticker} til ${formatPrice(stock.price)}.` };
  }

  const owned = portfolio.holdings[ticker] || 0;
  if (owned < quantity) {
    return { ok: false, message: `Du eier bare ${owned.toFixed(2)} ${ticker}.` };
  }
  portfolio.cash += cost;
  portfolio.holdings[ticker] = owned - quantity;
  if (portfolio.holdings[ticker] <= 0.0001) delete portfolio.holdings[ticker];
  return { ok: true, message: `Solgte ${quantity.toFixed(2)} ${ticker} til ${formatPrice(stock.price)}.` };
}

function handleTrade(event) {
  event.preventDefault();
  const ticker = document.querySelector("#tickerSelect").value;
  const side = document.querySelector("#sideSelect").value;
  const quantity = Number(document.querySelector("#quantityInput").value);
  const result = executeTrade(state, ticker, side, quantity);
  document.querySelector("#tradeMessage").textContent = result.message;
  document.querySelector("#tradeMessage").className = `form-message ${result.ok ? "positive" : "negative"}`;
  state.portfolioHistory.push(portfolioValue());
  render();
}

function randomWalk(stock) {
  const noise = (Math.random() - 0.48) * stock.volatility;
  const eventShock = Math.random() > 0.93 ? (Math.random() - 0.5) * stock.volatility * 3 : 0;
  const next = stock.price * (1 + stock.drift + noise + eventShock);
  stock.price = Math.max(5, Number(next.toFixed(2)));
  stock.sentiment = Math.max(20, Math.min(85, stock.sentiment + (Math.random() - 0.5) * 4));
  stock.history.push(stock.price);
  if (stock.history.length > 32) stock.history.shift();
}

function tickMarket() {
  if (feedPaused) return;
  state.market.forEach(randomWalk);
  tickCount += 1;
  if (tickCount % 3 === 0) {
    state.portfolioHistory.push(portfolioValue());
    state.agents.forEach((agent) => agent.history.push(portfolioValue(agent)));
  }
  render();
}

function bestBy(metric) {
  return [...state.market].sort((a, b) => metric(b) - metric(a))[0];
}

function rebalanceAgent(agent, targetStock, allocation = 0.18) {
  const value = portfolioValue(agent);
  const currentValue = (agent.holdings[targetStock.ticker] || 0) * targetStock.price;
  const targetValue = value * allocation;
  const diff = targetValue - currentValue;
  const quantity = Math.abs(diff) / targetStock.price;
  if (quantity < 0.05) {
    agent.lastAction = `Holder ${targetStock.ticker}`;
    return `${agent.name} holder ${targetStock.ticker}.`;
  }

  const side = diff > 0 ? "buy" : "sell";
  const result = executeTrade(agent, targetStock.ticker, side, quantity);
  agent.lastAction = result.ok
    ? `${side === "buy" ? "Kjøpte" : "Solgte"} ${targetStock.ticker}`
    : `Holdt ${targetStock.ticker}`;
  return `${agent.name}: ${result.message}`;
}

function runAgents() {
  state.agents.forEach((agent) => {
    if (agent.id === "benchmark") {
      agent.history.push(portfolioValue(agent));
      return;
    }

    let target;
    if (agent.id === "momentum") {
      target = bestBy(stockMomentum);
    }
    if (agent.id === "value") {
      target = bestBy((stock) => stock.valueScore - Math.max(0, stockMomentum(stock) / 2));
    }
    if (agent.id === "sentiment") {
      target = bestBy((stock) => stock.sentiment + stockDayChange(stock));
    }

    const log = rebalanceAgent(agent, target);
    state.log.push(log);
    agent.history.push(portfolioValue(agent));
  });
  render();
}

function resetArena() {
  localStorage.removeItem(STORAGE_KEY);
  state = loadState();
  feedPaused = false;
  tickCount = 0;
  document.querySelector("#tradeMessage").textContent = "Arenaen er nullstilt.";
  render();
}

function updateWorkspaceHeader() {
  const header = currentLayout === "split" ? splitViews[currentSplitView] : standardHeader;
  document.querySelector("#workspaceEyebrow").textContent = header.eyebrow;
  document.querySelector("#workspaceTitle").textContent = header.title;
  document.querySelector("#workspaceSummary").textContent = header.summary;
}

function setSplitView(view) {
  currentSplitView = splitViews[view] ? view : "dashboard";

  document.querySelectorAll("[data-split-view]").forEach((panel) => {
    panel.classList.toggle("active-split-panel", panel.dataset.splitView === currentSplitView);
  });

  document.querySelectorAll(".split-nav-item").forEach((button) => {
    const isActive = button.dataset.splitTarget === currentSplitView;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  localStorage.setItem(SPLIT_VIEW_KEY, currentSplitView);
  updateWorkspaceHeader();

  if (currentSplitView === "dashboard") {
    requestAnimationFrame(drawPortfolioChart);
  }
}

function setLayout(layout) {
  const nextLayout = layout === "split" ? "split" : "standard";
  const floor = document.querySelector("#tradingFloor");
  const buttons = [...document.querySelectorAll(".layout-button")];
  currentLayout = nextLayout;

  floor.classList.toggle("standard-layout", nextLayout === "standard");
  floor.classList.toggle("split-layout", nextLayout === "split");
  document.body.classList.toggle("split-mode", nextLayout === "split");

  buttons.forEach((button) => {
    const isActive = button.dataset.layout === nextLayout;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem(LAYOUT_KEY, nextLayout);
  setSplitView(currentSplitView);
  updateWorkspaceHeader();
  requestAnimationFrame(drawPortfolioChart);
}

function bindLayoutControls() {
  document.querySelectorAll(".layout-button").forEach((button) => {
    button.addEventListener("click", () => {
      setLayout(button.dataset.layout);
    });
  });

  document.querySelectorAll(".split-nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      setSplitView(button.dataset.splitTarget);
    });
  });

  setLayout(localStorage.getItem(LAYOUT_KEY));
}

document.querySelector("#tradeForm").addEventListener("submit", handleTrade);
document.querySelector("#runAgentsButton").addEventListener("click", runAgents);
document.querySelector("#resetButton").addEventListener("click", resetArena);
document.querySelector("#pauseFeedButton").addEventListener("click", () => {
  feedPaused = !feedPaused;
  render();
});
window.addEventListener("resize", drawPortfolioChart);

bindLayoutControls();
render();
setInterval(tickMarket, 2600);
