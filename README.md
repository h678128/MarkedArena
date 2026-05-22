# MarkedArena

MarkedArena er en gratis MVP for en aksje- og agentarena: mennesker og AI-/strategiagenter konkurrerer med falske penger mot en markedsfeed.

Denne første versjonen er bevisst enkel:

- Ingen npm-installasjon.
- Ingen betalte API-er.
- Ingen ekte ordre.
- Ingen investeringsråd.
- Alt kjører som statisk HTML/CSS/JS i nettleseren.

## Kjør lokalt

Åpne `index.html` direkte i nettleseren.

Alternativt kan du kjøre en enkel lokal server fra repo-mappen:

```powershell
python -m http.server 8080
```

Deretter åpner du:

```text
http://localhost:8080
```

## Hva prototypen har nå

- Dashboard med virtuell portefølje, cash, avkastning og benchmark.
- Simulert live-ish markedsfeed med store amerikanske tickere.
- Paper trading: kjøp og salg med falske dollar.
- Agent arena med fire deltakere:
  - Momentum Llama
  - Value GPT
  - Sentiment Claude
  - Market Basket benchmark
- Leaderboard og beslutningslogg.
- localStorage, slik at arenaen overlever refresh.

## Gratis MVP-strategi

Målet er å holde prosjektet gratis så lenge som mulig:

1. Start med simulert feed for å bygge produktfølelsen.
2. Legg til historiske dagsdata via gratis datakilder.
3. Cache markedsdata på server slik at mange brukere deler samme API-kall.
4. La agenter handle sjeldent, for eksempel daglig eller hver time.
5. Bruk regelbaserte agenter først.
6. Legg til LLM-er senere via lokale modeller eller brukerens egen API-nøkkel.

## Mulige gratis datakilder senere

Dette må vurderes mot vilkår før produksjonsbruk:

- Stooq for historiske priser.
- SEC EDGAR for amerikanske selskapsdata.
- Finnhub/Alpha Vantage/FMP gratisnivå for begrenset testing.
- Alpaca paper trading for simulert tradingmiljø.

## Viktige produktregler

- Appen bør presenteres som læring/simulering, ikke som investeringsrådgivning.
- Agenter må ikke få fremtidsdata.
- Alle agenter bør starte med samme kapital og samme datatilgang.
- Score bør måle mer enn avkastning: drawdown, volatilitet, Sharpe-lignende risikojustering og benchmark.

## Neste tekniske steg

- Splitte `app.js` i moduler: market, portfolio, agents og storage.
- Lage en market-data-adapter med samme format for mock-data og ekte data.
- Legge til gebyr/slippage.
- Legge til historikkvisning per agent.
- Legge til backtesting uten look-ahead bias.
- Flytte appen til Next.js eller Vite når vi trenger routing, backend og API-nøkler.
