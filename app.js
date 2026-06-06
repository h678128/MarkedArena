const STARTING_CASH = 100000;
const STORAGE_KEY = "markedarena-state-v1";
const LAYOUT_KEY = "markedarena-layout-v1";
const SPLIT_VIEW_KEY = "markedarena-split-view-v1";
const CHART_MODE_KEY = "markedarena-chart-mode-v1";
const ACTIVE_TICKER_KEY = "markedarena-active-ticker-v1";
const SLIPPAGE_RATE = 0.001;
const FEE_RATE = 0.001;

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
  {
    ticker: "GOOGL",
    name: "Alphabet",
    price: 174.63,
    drift: 0.0006,
    volatility: 0.014,
    valueScore: 69,
    sentiment: 63,
    history: [166, 168, 171, 170, 173, 174, 174.63],
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    price: 186.51,
    drift: 0.0007,
    volatility: 0.016,
    valueScore: 58,
    sentiment: 66,
    history: [176, 179, 181, 180, 184, 185, 186.51],
  },
  {
    ticker: "META",
    name: "Meta Platforms",
    price: 472.22,
    drift: 0.0009,
    volatility: 0.018,
    valueScore: 62,
    sentiment: 70,
    history: [445, 452, 459, 455, 466, 470, 472.22],
  },
  {
    ticker: "AMD",
    name: "AMD",
    price: 158.34,
    drift: 0.0008,
    volatility: 0.023,
    valueScore: 51,
    sentiment: 61,
    history: [148, 151, 155, 152, 157, 156, 158.34],
  },
  {
    ticker: "AVGO",
    name: "Broadcom",
    price: 1348.8,
    drift: 0.00075,
    volatility: 0.018,
    valueScore: 57,
    sentiment: 68,
    history: [1275, 1298, 1320, 1311, 1335, 1342, 1348.8],
  },
  {
    ticker: "V",
    name: "Visa",
    price: 276.42,
    drift: 0.00035,
    volatility: 0.008,
    valueScore: 74,
    sentiment: 57,
    history: [269, 270, 272, 273, 274, 276, 276.42],
  },
  {
    ticker: "MA",
    name: "Mastercard",
    price: 456.39,
    drift: 0.00038,
    volatility: 0.009,
    valueScore: 71,
    sentiment: 58,
    history: [444, 446, 449, 451, 452, 455, 456.39],
  },
  {
    ticker: "WMT",
    name: "Walmart",
    price: 67.91,
    drift: 0.00025,
    volatility: 0.007,
    valueScore: 78,
    sentiment: 53,
    history: [65, 66, 66.4, 66.9, 67.2, 67.5, 67.91],
  },
  {
    ticker: "COST",
    name: "Costco",
    price: 812.44,
    drift: 0.00032,
    volatility: 0.01,
    valueScore: 65,
    sentiment: 62,
    history: [782, 790, 799, 795, 806, 810, 812.44],
  },
  {
    ticker: "KO",
    name: "Coca-Cola",
    price: 62.35,
    drift: 0.00015,
    volatility: 0.006,
    valueScore: 73,
    sentiment: 50,
    history: [61, 61.2, 61.6, 61.8, 62, 62.1, 62.35],
  },
  {
    ticker: "DIS",
    name: "Disney",
    price: 102.74,
    drift: 0.0002,
    volatility: 0.015,
    valueScore: 56,
    sentiment: 49,
    history: [108, 106, 104, 101, 103, 102, 102.74],
  },
  {
    ticker: "BA",
    name: "Boeing",
    price: 181.9,
    drift: 0.00015,
    volatility: 0.02,
    valueScore: 44,
    sentiment: 42,
    history: [194, 190, 187, 182, 179, 180, 181.9],
  },
  {
    ticker: "CAT",
    name: "Caterpillar",
    price: 329.18,
    drift: 0.0003,
    volatility: 0.012,
    valueScore: 77,
    sentiment: 55,
    history: [315, 319, 322, 324, 326, 328, 329.18],
  },
  {
    ticker: "NEE",
    name: "NextEra Energy",
    price: 73.28,
    drift: 0.00018,
    volatility: 0.011,
    valueScore: 70,
    sentiment: 47,
    history: [70, 71, 71.8, 72.1, 72.7, 73, 73.28],
  },
  {
    ticker: "CVX",
    name: "Chevron",
    price: 159.77,
    drift: 0.00022,
    volatility: 0.012,
    valueScore: 79,
    sentiment: 48,
    history: [153, 155, 156, 157, 158, 159, 159.77],
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
    id: "contrarian",
    name: "Dip Hunter",
    style: "Contrarian",
    cash: STARTING_CASH,
    holdings: {},
    lastAction: "Venter",
    history: [STARTING_CASH],
  },
  {
    id: "lowvol",
    name: "Low Vol Sigma",
    style: "Risk control",
    cash: STARTING_CASH,
    holdings: {},
    lastAction: "Venter",
    history: [STARTING_CASH],
  },
  {
    id: "quality",
    name: "Quality Quant",
    style: "Quality",
    cash: STARTING_CASH,
    holdings: {},
    lastAction: "Venter",
    history: [STARTING_CASH],
  },
  {
    id: "swing",
    name: "Swing Radar",
    style: "Swing",
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
let currentChartMode = localStorage.getItem(CHART_MODE_KEY) || "both";
let activeTicker = localStorage.getItem(ACTIVE_TICKER_KEY) || "AAPL";

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
  analytics: {
    eyebrow: "Split-visning",
    title: "Analyse",
    summary: "Sammenlign porteføljen mot børsen og følg risiko over tid.",
  },
  agents: {
    eyebrow: "Split-visning",
    title: "Agent arena",
    summary: "Leaderboard og beslutningslogg for strategiagentene.",
  },
};

const agentStrategyNotes = [
  {
    id: "momentum",
    name: "Momentum Llama",
    summary: "Jakter aksjen med sterkest historisk momentum i den simulerte feeden.",
    detail: "Strategien antar at sterke bevegelser kan fortsette litt til. Den rebalanserer mot vinneren, men kan bli sårbar når trenden snur brått.",
  },
  {
    id: "value",
    name: "Value GPT",
    summary: "Prioriterer høy valueScore og trekker ned aksjer som allerede har løpt mye.",
    detail: "Strategien prøver å finne rimeligere kvalitetskandidater. Den kan ligge bak i sterke momentumperioder, men søker mer defensiv inngang.",
  },
  {
    id: "sentiment",
    name: "Sentiment Claude",
    summary: "Kombinerer sentiment-score med kortsiktig dagsendring.",
    detail: "Strategien følger aksjer der stemning og prisbevegelse peker samme vei. Den er mer følsom for raske skift i nyhetsfølelse.",
  },
  {
    id: "contrarian",
    name: "Dip Hunter",
    summary: "Ser etter kvalitetsaksjer som har falt på kort sikt.",
    detail: "Strategien prøver å kjøpe når markedet overreagerer nedover. Den favoriserer høy valueScore og svake dagsbevegelser, men unngår rene fallkniver ved å kreve litt kvalitet.",
  },
  {
    id: "lowvol",
    name: "Low Vol Sigma",
    summary: "Prioriterer roligere aksjer med lav volatilitet og grei sentiment.",
    detail: "Strategien forsøker å holde risikoen lavere enn de mer aggressive agentene. Den velger ofte jevnere tickere fremfor de største momentum-vinnerne.",
  },
  {
    id: "quality",
    name: "Quality Quant",
    summary: "Leter etter balanse mellom valueScore, sentiment og stabil momentum.",
    detail: "Strategien liker aksjer som ser solide ut på flere enkle signaler samtidig. Den straffer ekstreme prisbevegelser litt for å unngå å kjøpe for sent.",
  },
  {
    id: "swing",
    name: "Swing Radar",
    summary: "Jakter kortsiktige setups der dagstrend og historisk momentum peker opp.",
    detail: "Strategien er mer taktisk enn quality og low-vol. Den forsøker å fange korte bevegelser, men kan rotere oftere når signalene skifter.",
  },
  {
    id: "benchmark",
    name: "Market Basket",
    summary: "Equal-weight kurv av de største tickere i arenaen.",
    detail: "Dette er referansen for selve børsen i MVP-en. Den handler ikke taktisk, men viser hvordan en bred kurv utvikler seg.",
  },
];

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

function mergeMarket(savedMarket = []) {
  const savedByTicker = new Map(savedMarket.map((stock) => [stock.ticker, stock]));
  return stocks.map((stock) => ({ ...clone(stock), ...(savedByTicker.get(stock.ticker) || {}) }));
}

function ensureBenchmarkHoldings(agent) {
  if (Object.keys(agent.holdings || {}).length) return agent;

  const basket = stocks.slice(0, 12);
  const allocation = STARTING_CASH / basket.length;
  agent.holdings = {};
  basket.forEach((stock) => {
    agent.holdings[stock.ticker] = allocation / stock.price;
  });
  return agent;
}

function mergeAgents(savedAgents = []) {
  const savedById = new Map(savedAgents.map((agent) => [agent.id, agent]));
  return agentsTemplate.map((template) => {
    const merged = { ...clone(template), ...(savedById.get(template.id) || {}) };
    if (merged.id === "benchmark") ensureBenchmarkHoldings(merged);
    if (!Array.isArray(merged.history) || !merged.history.length) merged.history = [STARTING_CASH];
    if (!merged.holdings) merged.holdings = {};
    return merged;
  });
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed?.market?.length) {
        parsed.market = mergeMarket(parsed.market);
        parsed.agents = mergeAgents(parsed.agents);
        return parsed;
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const initialAgents = clone(agentsTemplate);
  const benchmark = initialAgents.find((agent) => agent.id === "benchmark");
  ensureBenchmarkHoldings(benchmark);

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
  renderRiskMetrics();
  renderAgentStrategies();
  renderTickerDetails();
  updateOrderPreview();
  drawPortfolioChart();
  drawMarketChart();
  drawComparisonChart();
  drawTickerChart();
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
      const isActive = stock.ticker === activeTicker;
      return `
        <tr class="${isActive ? "active-row" : ""}" data-ticker="${stock.ticker}" tabindex="0" aria-label="Velg ${stock.ticker}">
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
  if (select.options.length === state.market.length) {
    select.value = activeTicker;
    return;
  }

  select.innerHTML = state.market
    .map((stock) => `<option value="${stock.ticker}">${stock.ticker} - ${stock.name}</option>`)
    .join("");
  select.value = activeTicker;
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

function portfolioHistoryWithCurrent() {
  return state.portfolioHistory.length > 1 ? [...state.portfolioHistory, portfolioValue()] : [STARTING_CASH, portfolioValue()];
}

function marketHistoryWithCurrent() {
  const benchmark = state.agents.find((agent) => agent.id === "benchmark");
  const currentValue = portfolioValue(benchmark);
  return benchmark.history.length > 1 ? [...benchmark.history, currentValue] : [STARTING_CASH, currentValue];
}

function returnsFor(history) {
  const returns = [];
  for (let i = 1; i < history.length; i += 1) {
    const previous = history[i - 1];
    if (previous > 0) {
      returns.push(((history[i] - previous) / previous) * 100);
    }
  }
  return returns;
}

function riskStats(history) {
  const returns = returnsFor(history);
  const totalReturn = ((history.at(-1) - history[0]) / history[0]) * 100;
  const average = returns.reduce((sum, value) => sum + value, 0) / Math.max(1, returns.length);
  const variance = returns.reduce((sum, value) => sum + (value - average) ** 2, 0) / Math.max(1, returns.length);
  let peak = history[0];
  let maxDrawdown = 0;

  history.forEach((value) => {
    peak = Math.max(peak, value);
    maxDrawdown = Math.min(maxDrawdown, ((value - peak) / peak) * 100);
  });

  return {
    totalReturn,
    volatility: Math.sqrt(variance),
    maxDrawdown,
    bestTick: returns.length ? Math.max(...returns) : 0,
    worstTick: returns.length ? Math.min(...returns) : 0,
  };
}

function renderRiskMetrics() {
  const metrics = [
    { label: "Portefølje", stats: riskStats(portfolioHistoryWithCurrent()) },
    { label: "Børs", stats: riskStats(marketHistoryWithCurrent()) },
  ];

  document.querySelector("#riskMetrics").innerHTML = metrics
    .map(
      ({ label, stats }) => `
        <div class="risk-card">
          <h4>${label}</h4>
          <div class="risk-row"><span>Totalavkastning</span><strong class="${stats.totalReturn >= 0 ? "positive" : "negative"}">${formatPercent(stats.totalReturn)}</strong></div>
          <div class="risk-row"><span>Volatilitet/tick</span><strong>${stats.volatility.toFixed(2)}%</strong></div>
          <div class="risk-row"><span>Max drawdown</span><strong class="negative">${stats.maxDrawdown.toFixed(2)}%</strong></div>
          <div class="risk-row"><span>Beste tick</span><strong class="positive">${formatPercent(stats.bestTick)}</strong></div>
          <div class="risk-row"><span>Verste tick</span><strong class="negative">${formatPercent(stats.worstTick)}</strong></div>
        </div>
      `,
    )
    .join("");
}

function renderAgentStrategies() {
  document.querySelector("#agentStrategies").innerHTML = agentStrategyNotes
    .map(
      (agent) => `
        <div class="strategy-card">
          <h4>${agent.name}</h4>
          <p><strong>${agent.summary}</strong></p>
          <p>${agent.detail}</p>
        </div>
      `,
    )
    .join("");
}

function agentTickerView(agentId, stock) {
  if (agentId === "benchmark") {
    return state.agents.find((agent) => agent.id === "benchmark")?.holdings[stock.ticker] ? "I kurven" : "Utenfor kurv";
  }

  const agent = state.agents.find((candidate) => candidate.id === agentId);
  const target = agent ? targetForAgent(agent) : null;
  const score = agentScore(agentId, stock);
  return target?.ticker === stock.ticker ? `Favoritt (${score.toFixed(1)})` : `Score ${score.toFixed(1)}`;
}

function renderTickerDetails() {
  const stock = stockByTicker(activeTicker) || state.market[0];
  if (!stock) return;

  activeTicker = stock.ticker;
  const change = stockDayChange(stock);
  const momentum = stockMomentum(stock);
  const owned = state.holdings[stock.ticker] || 0;
  const signal = signalFor(stock);
  const select = document.querySelector("#tickerSelect");

  if (select.value !== activeTicker) {
    select.value = activeTicker;
  }

  document.querySelector("#activeTickerTitle").textContent = `${stock.ticker} · ${stock.name}`;
  document.querySelector("#activeTickerSignal").textContent = signal;
  document.querySelector("#tickerDetails").innerHTML = `
    <div><span>Pris</span><strong>${formatPrice(stock.price)}</strong></div>
    <div><span>Dag</span><strong class="${change >= 0 ? "positive" : "negative"}">${formatPercent(change)}</strong></div>
    <div><span>Momentum</span><strong class="${momentum >= 0 ? "positive" : "negative"}">${formatPercent(momentum)}</strong></div>
    <div><span>Signal</span><strong>${signal}</strong></div>
    <div><span>Value score</span><strong>${stock.valueScore}</strong></div>
    <div><span>Sentiment</span><strong>${stock.sentiment.toFixed(0)}</strong></div>
    <div><span>Din beholdning</span><strong>${owned.toFixed(2)} aksjer</strong></div>
    <div><span>Markedsverdi</span><strong>${formatMoney(owned * stock.price)}</strong></div>
  `;
  document.querySelector("#agentTickerViews").innerHTML = agentStrategyNotes
    .map(
      (agent) => `
        <div class="agent-view-row">
          <span>${agent.name}</span>
          <strong>${agentTickerView(agent.id, stock)}</strong>
        </div>
      `,
    )
    .join("");
}

function drawChart(canvas, series, label) {
  const context = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  context.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const leftPadding = 18;
  const rightPadding = 18;
  const topPadding = 30;
  const bottomPadding = 34;
  const allValues = series.flatMap((item) => item.history);
  const longestHistory = Math.max(...series.map((item) => item.history.length));
  const min = Math.min(...allValues) * 0.995;
  const max = Math.max(...allValues) * 1.005;
  const range = Math.max(1, max - min);

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#eef3f0";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "#d6dfda";
  context.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = topPadding + ((height - topPadding - bottomPadding) / 3) * i;
    context.beginPath();
    context.moveTo(leftPadding, y);
    context.lineTo(width - rightPadding, y);
    context.stroke();
  }

  series.forEach((item) => {
    context.strokeStyle = item.color;
    context.lineWidth = 3;
    context.beginPath();
    item.history.forEach((value, index) => {
      const x = leftPadding + ((width - leftPadding - rightPadding) * index) / Math.max(1, item.history.length - 1);
      const y = height - bottomPadding - ((value - min) / range) * (height - topPadding - bottomPadding);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();
  });

  const tickCount = Math.min(5, longestHistory);
  context.fillStyle = "#64727a";
  context.font = "700 11px system-ui";
  context.textAlign = "center";
  for (let i = 0; i < tickCount; i += 1) {
    const ratio = tickCount === 1 ? 0 : i / (tickCount - 1);
    const index = Math.round(ratio * (longestHistory - 1));
    const x = leftPadding + (width - leftPadding - rightPadding) * ratio;
    const labelText = index === longestHistory - 1 ? "Nå" : `T-${longestHistory - 1 - index}`;
    context.fillText(labelText, x, height - 11);
  }

  context.fillStyle = "#17211d";
  context.font = "700 13px system-ui";
  context.textAlign = "left";
  context.fillText(label, leftPadding, 22);
}

function drawLineChart(canvas, history, label, color) {
  drawChart(canvas, [{ history, color }], label);
}

function drawPortfolioChart() {
  const canvas = document.querySelector("#portfolioChart");
  drawLineChart(canvas, portfolioHistoryWithCurrent(), "Porteføljehistorikk", "#0c6d73");
}

function drawMarketChart() {
  const canvas = document.querySelector("#marketChart");
  drawLineChart(canvas, marketHistoryWithCurrent(), "Børsutvikling", "#285ca8");
}

function drawComparisonChart() {
  const canvas = document.querySelector("#comparisonChart");
  const series = [];

  if (currentChartMode === "portfolio" || currentChartMode === "both") {
    series.push({ history: portfolioHistoryWithCurrent(), color: "#0c6d73" });
  }

  if (currentChartMode === "market" || currentChartMode === "both") {
    series.push({ history: marketHistoryWithCurrent(), color: "#285ca8" });
  }

  drawChart(canvas, series, "Portefølje vs børs");
}

function drawTickerChart() {
  const canvas = document.querySelector("#tickerChart");
  const stock = stockByTicker(activeTicker) || state.market[0];
  if (!stock) return;
  drawLineChart(canvas, stock.history, `${stock.ticker} historikk`, "#95630f");
}

function setActiveTicker(ticker) {
  const stock = stockByTicker(ticker);
  if (!stock) return;

  activeTicker = stock.ticker;
  localStorage.setItem(ACTIVE_TICKER_KEY, activeTicker);

  const select = document.querySelector("#tickerSelect");
  if (select.value !== activeTicker) {
    select.value = activeTicker;
  }

  renderMarket();
  renderTickerDetails();
  updateOrderPreview();
  requestAnimationFrame(drawTickerChart);
}

function orderQuote(portfolio, ticker, side, quantity) {
  const stock = stockByTicker(ticker);
  const amount = Number(quantity);

  if (!stock || !Number.isFinite(amount) || amount <= 0) {
    return {
      ok: false,
      reason: "Ugyldig ordre.",
      stock,
      quantity: amount,
      marketPrice: stock?.price || 0,
      executionPrice: stock?.price || 0,
      fee: 0,
      cashAfter: portfolio.cash,
      total: 0,
    };
  }

  const isBuy = side === "buy";
  const executionPrice = stock.price * (isBuy ? 1 + SLIPPAGE_RATE : 1 - SLIPPAGE_RATE);
  const gross = executionPrice * amount;
  const fee = gross * FEE_RATE;
  const total = isBuy ? gross + fee : gross - fee;
  const owned = portfolio.holdings[ticker] || 0;
  const cashAfter = isBuy ? portfolio.cash - total : portfolio.cash + total;
  let ok = true;
  let reason = "";

  if (isBuy && cashAfter < -0.0001) {
    ok = false;
    reason = "Ikke nok virtuell cash.";
  }

  if (!isBuy && owned < amount) {
    ok = false;
    reason = `Du eier bare ${owned.toFixed(2)} ${ticker}.`;
  }

  return {
    ok,
    reason,
    stock,
    quantity: amount,
    marketPrice: stock.price,
    executionPrice,
    gross,
    fee,
    total,
    cashAfter,
    side,
  };
}

function updateOrderPreview() {
  const ticker = document.querySelector("#tickerSelect").value;
  const side = document.querySelector("#sideSelect").value;
  const quantity = Number(document.querySelector("#quantityInput").value);
  const quote = orderQuote(state, ticker, side, quantity);
  const submitButton = document.querySelector("#submitTradeButton");
  const previewNote = document.querySelector("#previewNote");

  document.querySelector("#previewMarketPrice").textContent = quote.stock ? formatPrice(quote.marketPrice) : "-";
  document.querySelector("#previewExecutionPrice").textContent = quote.stock ? formatPrice(quote.executionPrice) : "-";
  document.querySelector("#previewFee").textContent = formatMoney(quote.fee);
  document.querySelector("#previewTotal").textContent = formatMoney(quote.total);
  document.querySelector("#previewCashAfter").textContent = formatMoney(quote.cashAfter);

  submitButton.disabled = !quote.ok;
  previewNote.textContent = quote.ok ? "Slippage 0.10% + gebyr 0.10%" : quote.reason;
  previewNote.className = quote.ok ? "" : "negative";
}

function executeTrade(portfolio, ticker, side, quantity) {
  const quote = orderQuote(portfolio, ticker, side, quantity);
  if (!quote.ok) {
    return { ok: false, message: quote.reason };
  }

  if (side === "buy") {
    portfolio.cash -= quote.total;
    portfolio.holdings[ticker] = (portfolio.holdings[ticker] || 0) + quote.quantity;
    return {
      ok: true,
      message: `Kjøpte ${quote.quantity.toFixed(2)} ${ticker} til ${formatPrice(quote.executionPrice)} inkl. ${formatMoney(quote.fee)} gebyr.`,
    };
  }

  const owned = portfolio.holdings[ticker] || 0;
  portfolio.cash += quote.total;
  portfolio.holdings[ticker] = owned - quote.quantity;
  if (portfolio.holdings[ticker] <= 0.0001) delete portfolio.holdings[ticker];
  return {
    ok: true,
    message: `Solgte ${quote.quantity.toFixed(2)} ${ticker} til ${formatPrice(quote.executionPrice)} etter ${formatMoney(quote.fee)} gebyr.`,
  };
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

function agentScore(agentId, stock) {
  const momentum = stockMomentum(stock);
  const dayChange = stockDayChange(stock);

  const scores = {
    momentum: momentum * 1.4 + stock.sentiment * 0.25,
    value: stock.valueScore - Math.max(0, momentum / 2),
    sentiment: stock.sentiment + dayChange,
    contrarian: stock.valueScore * 0.9 - dayChange * 8 - Math.max(0, momentum) * 0.2,
    lowvol: stock.valueScore * 0.35 + stock.sentiment * 0.35 - stock.volatility * 1800,
    quality: stock.valueScore * 0.65 + stock.sentiment * 0.45 - Math.abs(momentum) * 0.25,
    swing: dayChange * 2.2 + momentum * 0.75 + stock.sentiment * 0.18,
  };

  return scores[agentId] ?? 0;
}

function targetForAgent(agent) {
  return bestBy((stock) => agentScore(agent.id, stock));
}

function allocationForAgent(agentId) {
  const allocations = {
    momentum: 0.2,
    value: 0.18,
    sentiment: 0.18,
    contrarian: 0.16,
    lowvol: 0.14,
    quality: 0.17,
    swing: 0.2,
  };

  return allocations[agentId] ?? 0.18;
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

    const target = targetForAgent(agent);
    const log = rebalanceAgent(agent, target, allocationForAgent(agent.id));
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

  if (currentSplitView === "market") {
    requestAnimationFrame(drawMarketChart);
    requestAnimationFrame(drawTickerChart);
  }

  if (currentSplitView === "analytics") {
    requestAnimationFrame(drawComparisonChart);
  }
}

function setComparisonChartMode(mode) {
  currentChartMode = ["portfolio", "market", "both"].includes(mode) ? mode : "both";

  document.querySelectorAll(".chart-mode-button").forEach((button) => {
    const isActive = button.dataset.chartMode === currentChartMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem(CHART_MODE_KEY, currentChartMode);
  requestAnimationFrame(drawComparisonChart);
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
  requestAnimationFrame(drawMarketChart);
  requestAnimationFrame(drawComparisonChart);
  requestAnimationFrame(drawTickerChart);
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

  document.querySelectorAll(".chart-mode-button").forEach((button) => {
    button.addEventListener("click", () => {
      setComparisonChartMode(button.dataset.chartMode);
    });
  });

  setComparisonChartMode(currentChartMode);
  setLayout(localStorage.getItem(LAYOUT_KEY));
}

document.querySelector("#tradeForm").addEventListener("submit", handleTrade);
["#tickerSelect", "#sideSelect", "#quantityInput"].forEach((selector) => {
  const element = document.querySelector(selector);
  element.addEventListener("input", updateOrderPreview);
  element.addEventListener("change", updateOrderPreview);
});
document.querySelector("#tickerSelect").addEventListener("change", (event) => {
  setActiveTicker(event.target.value);
});
document.querySelector("#marketRows").addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-ticker]");
  if (row) setActiveTicker(row.dataset.ticker);
});
document.querySelector("#marketRows").addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const row = event.target.closest("tr[data-ticker]");
  if (!row) return;
  event.preventDefault();
  setActiveTicker(row.dataset.ticker);
});
document.querySelector("#runAgentsButton").addEventListener("click", runAgents);
document.querySelector("#resetButton").addEventListener("click", resetArena);
document.querySelector("#pauseFeedButton").addEventListener("click", () => {
  feedPaused = !feedPaused;
  render();
});
window.addEventListener("resize", () => {
  drawPortfolioChart();
  drawMarketChart();
  drawComparisonChart();
  drawTickerChart();
});

bindLayoutControls();
render();
setInterval(tickMarket, 2600);
