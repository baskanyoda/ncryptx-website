// ============================================================
// ncrptx TRADE — TRADING UI ENGINE
// ============================================================

// --- MARKET DATA ---
const PAIRS = [
  { name: 'BTC/USDT', base: 'BTC', price: 67234.50, change: 2.34, vol: '24,521', high: 68120, low: 65890 },
  { name: 'ETH/USDT', base: 'ETH', price: 3521.80, change: 1.87, vol: '182,340', high: 3580, low: 3440 },
  { name: 'SOL/USDT', base: 'SOL', price: 142.30, change: -0.92, vol: '1,243,210', high: 148, low: 139 },
  { name: 'BNB/USDT', base: 'BNB', price: 412.50, change: 0.45, vol: '342,100', high: 418, low: 405 },
  { name: 'XRP/USDT', base: 'XRP', price: 0.5821, change: 3.12, vol: '84,320,000', high: 0.60, low: 0.56 },
  { name: 'ADA/USDT', base: 'ADA', price: 0.4521, change: -1.23, vol: '42,100,000', high: 0.47, low: 0.44 },
  { name: 'DOGE/USDT', base: 'DOGE', price: 0.1234, change: 5.43, vol: '2,100,000,000', high: 0.13, low: 0.11 },
  { name: 'DOT/USDT', base: 'DOT', price: 7.82, change: -2.10, vol: '12,430,000', high: 8.10, low: 7.65 },
  { name: 'LINK/USDT', base: 'LINK', price: 14.32, change: 1.56, vol: '8,320,000', high: 14.80, low: 13.90 },
  { name: 'AVAX/USDT', base: 'AVAX', price: 38.40, change: -0.78, vol: '4,230,000', high: 39.50, low: 37.80 },
];

let currentPair = PAIRS[0];
let isBuy = true;
let orderType = 'limit';
let priceChart, volumeChart;
let openOrders = [];

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  renderPairsList();
  renderOrderBook();
  renderRecentTrades();
  initChart();
  startLivePrices();
  updateOrderForm();
});

// --- PAIRS LIST ---
function renderPairsList() {
  const list = document.getElementById('pairs-list');
  list.innerHTML = '';
  PAIRS.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'pair-row' + (i === 0 ? ' active' : '');
    row.innerHTML = `
      <div><div class="pr-name">${p.base}</div><div class="pr-base">/${p.name.split('/')[1]}</div></div>
      <div class="pr-price">${formatPrice(p.price)}</div>
      <div class="pr-change ${p.change >= 0 ? 'positive' : 'negative'}">${p.change >= 0 ? '+' : ''}${p.change}%</div>
    `;
    row.onclick = () => switchPair(p, row);
    list.appendChild(row);
  });
}

function filterPairs() {
  const q = document.getElementById('pair-search').value.toLowerCase();
  const list = document.getElementById('pair-list');
  list.innerHTML = '';
  PAIRS.filter(p => p.name.toLowerCase().includes(q)).forEach(p => {
    const item = document.createElement('div');
    item.className = 'pair-list-item';
    item.innerHTML = `
      <span class="pl-name">${p.name}</span>
      <span class="pl-price">${formatPrice(p.price)}</span>
      <span class="pl-change ${p.change >= 0 ? 'positive' : 'negative'}">${p.change >= 0 ? '+' : ''}${p.change}%</span>
    `;
    item.onclick = () => { switchPair(p); togglePairMenu(); };
    list.appendChild(item);
  });
}

function switchPair(pair, rowEl) {
  currentPair = pair;
  document.getElementById('current-pair').textContent = pair.name;
  document.getElementById('nav-price').textContent = formatPrice(pair.price);
  document.getElementById('nav-change').textContent = (pair.change >= 0 ? '+' : '') + pair.change + '%';
  document.getElementById('nav-change').className = 'pair-change ' + (pair.change >= 0 ? 'positive' : 'negative');
  document.getElementById('nav-high').textContent = formatPrice(pair.high);
  document.getElementById('nav-low').textContent = formatPrice(pair.low);
  document.getElementById('nav-vol').textContent = pair.vol + ' ' + pair.base;
  document.getElementById('order-price').value = pair.price;
  document.getElementById('order-btn').textContent = (isBuy ? 'Buy ' : 'Sell ') + pair.base;
  document.getElementById('order-balance').textContent = isBuy ? '10,000.00 USDT' : '0.50 ' + pair.base;
  renderOrderBook();
  renderRecentTrades();
  updateChart();
  document.querySelectorAll('.pair-row').forEach(r => r.classList.remove('active'));
  if (rowEl) rowEl.classList.add('active');
  filterPairs();
}

function togglePairMenu() {
  document.getElementById('pair-menu').classList.toggle('open');
  if (document.getElementById('pair-menu').classList.contains('open')) filterPairs();
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.pair-selector') && !e.target.closest('.pair-menu')) {
    document.getElementById('pair-menu').classList.remove('open');
  }
});

// --- ORDER BOOK ---
function renderOrderBook() {
  const price = currentPair.price;
  const asksEl = document.getElementById('ob-asks');
  const bidsEl = document.getElementById('ob-bids');
  document.getElementById('ob-price').textContent = formatPrice(price);
  document.getElementById('ob-change').textContent = (currentPair.change >= 0 ? '+' : '') + currentPair.change + '%';
  document.getElementById('ob-change').className = 'ob-spread-pct ' + (currentPair.change >= 0 ? 'positive' : 'negative');

  const asks = generateOrderBookSide(price, 'ask', 12);
  const bids = generateOrderBookSide(price, 'bid', 12);
  const maxAsk = Math.max(...asks.map(a => a.total));
  const maxBid = Math.max(...bids.map(b => b.total));

  asksEl.innerHTML = asks.reverse().map(a => `
    <div class="ob-row ask" onclick="setPrice(${a.price})">
      <div class="ob-bar" style="width:${(a.total/maxAsk*100).toFixed(0)}%"></div>
      <span class="ob-col-price">${formatPrice(a.price)}</span>
      <span class="ob-col-amt">${a.amount.toFixed(4)}</span>
      <span class="ob-col-total">${a.total.toFixed(2)}</span>
    </div>`).join('');

  bidsEl.innerHTML = bids.map(b => `
    <div class="ob-row bid" onclick="setPrice(${b.price})">
      <div class="ob-bar" style="width:${(b.total/maxBid*100).toFixed(0)}%"></div>
      <span class="ob-col-price">${formatPrice(b.price)}</span>
      <span class="ob-col-amt">${b.amount.toFixed(4)}</span>
      <span class="ob-col-total">${b.total.toFixed(2)}</span>
    </div>`).join('');
}

function generateOrderBookSide(price, side, count) {
  const rows = [];
  let p = side === 'ask' ? price * 1.0001 : price * 0.9999;
  for (let i = 0; i < count; i++) {
    const amt = Math.random() * 2 + 0.01;
    rows.push({ price: parseFloat(p.toFixed(2)), amount: amt, total: amt * p });
    p = side === 'ask' ? p * (1 + Math.random() * 0.0003) : p * (1 - Math.random() * 0.0003);
  }
  return rows;
}

function setPrice(p) {
  document.getElementById('order-price').value = p;
  calculateTotal();
}

// --- RECENT TRADES ---
function renderRecentTrades() {
  const list = document.getElementById('trades-list');
  const price = currentPair.price;
  list.innerHTML = '';
  for (let i = 0; i < 30; i++) {
    const isBuyTrade = Math.random() > 0.5;
    const tradePrice = price * (1 + (Math.random() - 0.5) * 0.002);
    const amt = (Math.random() * 1.5 + 0.001).toFixed(4);
    const now = new Date();
    now.setSeconds(now.getSeconds() - i * Math.floor(Math.random() * 10 + 1));
    const time = now.toTimeString().slice(0, 8);
    const row = document.createElement('div');
    row.className = 'trade-row';
    row.innerHTML = `
      <span class="tr-price ${isBuyTrade ? 'positive' : 'negative'}">${formatPrice(tradePrice)}</span>
      <span class="tr-amt">${amt}</span>
      <span class="tr-time">${time}</span>`;
    list.appendChild(row);
  }
}

// --- CHART ---
function initChart() {
  const priceCtx = document.getElementById('priceChart').getContext('2d');
  const volCtx = document.getElementById('volumeChart').getContext('2d');
  const { labels, opens, highs, lows, closes, vols } = generateCandleData(currentPair.price, 60);

  priceChart = new Chart(priceCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Price',
        data: closes,
        borderColor: '#0ecb81',
        borderWidth: 1.5,
        pointRadius: 0,
        fill: true,
        backgroundColor: (ctx) => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          g.addColorStop(0, 'rgba(14,203,129,0.2)');
          g.addColorStop(1, 'rgba(14,203,129,0)');
          return g;
        },
        tension: 0.3
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: false,
      plugins: { legend: { display: false }, tooltip: {
        mode: 'index', intersect: false,
        backgroundColor: '#1e2329', titleColor: '#848e9c', bodyColor: '#eaecef',
        borderColor: '#2b3139', borderWidth: 1
      }},
      scales: {
        x: { display: false, grid: { display: false } },
        y: {
          position: 'right', grid: { color: 'rgba(43,49,57,0.5)' },
          ticks: { color: '#848e9c', font: { size: 10 } }
        }
      }
    }
  });

  volumeChart = new Chart(volCtx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: vols,
        backgroundColor: closes.map((c, i) => i > 0 && c >= closes[i-1] ? 'rgba(14,203,129,0.5)' : 'rgba(246,70,93,0.5)'),
        borderWidth: 0
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}

function generateCandleData(basePrice, count) {
  const labels = [], opens = [], highs = [], lows = [], closes = [], vols = [];
  let p = basePrice * 0.97;
  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.48) * basePrice * 0.003;
    const o = p; const c = p + change;
    opens.push(o.toFixed(2)); closes.push(c.toFixed(2));
    highs.push((Math.max(o, c) + Math.random() * basePrice * 0.001).toFixed(2));
    lows.push((Math.min(o, c) - Math.random() * basePrice * 0.001).toFixed(2));
    vols.push((Math.random() * 500 + 50).toFixed(2));
    labels.push(i);
    p = c;
  }
  return { labels, opens, highs, lows, closes, vols };
}

function updateChart() {
  const { closes, vols, labels } = generateCandleData(currentPair.price, 60);
  priceChart.data.labels = labels;
  priceChart.data.datasets[0].data = closes;
  priceChart.data.datasets[0].backgroundColor = (ctx) => {
    const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
    g.addColorStop(0, currentPair.change >= 0 ? 'rgba(14,203,129,0.2)' : 'rgba(246,70,93,0.2)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    return g;
  };
  priceChart.data.datasets[0].borderColor = currentPair.change >= 0 ? '#0ecb81' : '#f6465d';
  priceChart.update();
  volumeChart.data.labels = labels;
  volumeChart.data.datasets[0].data = vols;
  volumeChart.update();
}

function setTF(el) {
  document.querySelectorAll('.tf').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  updateChart();
}

// --- ORDER FORM ---
function setOrderTab(el, side) {
  isBuy = side === 'buy';
  document.querySelectorAll('.otab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const btn = document.getElementById('order-btn');
  btn.className = 'order-btn ' + side;
  btn.textContent = (isBuy ? 'Buy ' : 'Sell ') + currentPair.base;
  document.getElementById('order-balance').textContent = isBuy ? '10,000.00 USDT' : '0.50 ' + currentPair.base;
}

function setOrderType(el, type) {
  orderType = type;
  document.querySelectorAll('.otyp').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('price-field').style.display = type === 'market' ? 'none' : 'block';
}

function updateOrderForm() {
  document.getElementById('order-price').addEventListener('input', calculateTotal);
  document.getElementById('order-amount').addEventListener('input', calculateTotal);
  document.getElementById('order-total').addEventListener('input', calculateFromTotal);
}

function calculateTotal() {
  const price = parseFloat(document.getElementById('order-price').value) || 0;
  const amount = parseFloat(document.getElementById('order-amount').value) || 0;
  document.getElementById('order-total').value = (price * amount).toFixed(2);
}

function calculateFromTotal() {
  const price = parseFloat(document.getElementById('order-price').value) || 0;
  const total = parseFloat(document.getElementById('order-total').value) || 0;
  if (price > 0) document.getElementById('order-amount').value = (total / price).toFixed(6);
}

function setPct(pct) {
  const balance = 10000;
  const price = parseFloat(document.getElementById('order-price').value) || currentPair.price;
  const total = (balance * pct / 100).toFixed(2);
  document.getElementById('order-total').value = total;
  document.getElementById('order-amount').value = (total / price).toFixed(6);
}

function placeOrder() {
  const price = parseFloat(document.getElementById('order-price').value);
  const amount = parseFloat(document.getElementById('order-amount').value);
  const total = parseFloat(document.getElementById('order-total').value);
  if (!amount || amount <= 0) { alert('Please enter an amount'); return; }

  const order = {
    pair: currentPair.name, side: isBuy ? 'Buy' : 'Sell',
    type: orderType, price, amount, total,
    time: new Date().toLocaleTimeString(), status: 'Open'
  };
  openOrders.unshift(order);
  renderOpenOrders();

  const btn = document.getElementById('order-btn');
  const orig = btn.textContent;
  btn.textContent = '✓ Order Placed!';
  btn.style.opacity = '0.7';
  setTimeout(() => { btn.textContent = orig; btn.style.opacity = ''; }, 2000);

  document.getElementById('order-amount').value = '';
  document.getElementById('order-total').value = '';
}

function renderOpenOrders() {
  const el = document.getElementById('open-orders');
  document.querySelector('.btab').textContent = `Open Orders (${openOrders.length})`;
  if (!openOrders.length) { el.innerHTML = '<div class="empty-orders">No open orders</div>'; return; }
  el.innerHTML = `
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr style="color:var(--muted);font-size:10px;">
        <th style="padding:8px 12px;text-align:left">Time</th>
        <th>Pair</th><th>Type</th><th>Side</th>
        <th>Price</th><th>Amount</th><th>Total</th><th>Action</th>
      </tr></thead>
      <tbody>${openOrders.map((o,i) => `
        <tr style="border-top:1px solid var(--border);font-size:11px;">
          <td style="padding:8px 12px">${o.time}</td>
          <td>${o.pair}</td>
          <td style="text-transform:capitalize">${o.type}</td>
          <td class="${o.side === 'Buy' ? 'positive' : 'negative'}">${o.side}</td>
          <td>${formatPrice(o.price)}</td>
          <td>${o.amount?.toFixed(6)}</td>
          <td>${o.total?.toFixed(2)}</td>
          <td><span onclick="cancelOrder(${i})" style="color:var(--red);cursor:pointer">Cancel</span></td>
        </tr>`).join('')}
      </tbody>
    </table>`;
}

function cancelOrder(i) {
  openOrders.splice(i, 1);
  renderOpenOrders();
}

// --- LIVE PRICES ---
function startLivePrices() {
  setInterval(() => {
    PAIRS.forEach(p => {
      const delta = (Math.random() - 0.499) * p.price * 0.0004;
      p.price = parseFloat((p.price + delta).toFixed(p.price > 100 ? 2 : 4));
    });
    // Update nav price
    document.getElementById('nav-price').textContent = formatPrice(currentPair.price);
    // Refresh order book and trades periodically
    if (Math.random() > 0.7) renderOrderBook();
    if (Math.random() > 0.8) {
      const list = document.getElementById('trades-list');
      if (list.firstChild) list.removeChild(list.lastChild);
      const isBuyTrade = Math.random() > 0.5;
      const tradePrice = currentPair.price * (1 + (Math.random() - 0.5) * 0.001);
      const amt = (Math.random() * 0.5 + 0.001).toFixed(4);
      const row = document.createElement('div');
      row.className = 'trade-row';
      row.innerHTML = `
        <span class="tr-price ${isBuyTrade ? 'positive' : 'negative'}">${formatPrice(tradePrice)}</span>
        <span class="tr-amt">${amt}</span>
        <span class="tr-time">${new Date().toTimeString().slice(0,8)}</span>`;
      list.prepend(row);
    }
    // Update pairs list prices
    document.querySelectorAll('.pair-row').forEach((row, i) => {
      row.querySelector('.pr-price').textContent = formatPrice(PAIRS[i].price);
    });
  }, 800);
}

// --- HELPERS ---
function formatPrice(p) {
  if (p >= 1000) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (p >= 1) return p.toFixed(4);
  return p.toFixed(6);
}
