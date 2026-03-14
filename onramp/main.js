// ============================================================
// ncrptx ONRAMP — WIDGET & INTERACTIONS
// ============================================================

// --- RATES (mock) ---
const RATES = {
  BTC: 0.0000156,
  ETH: 0.00038,
  SOL: 0.0085,
  BNB: 0.0028,
  USDT: 0.99,
  USDC: 0.99,
  XRP: 1.72,
  ADA: 3.2
};

const FIATS = [
  { symbol: 'USD', flag: '🇺🇸' },
  { symbol: 'EUR', flag: '🇪🇺' },
  { symbol: 'GBP', flag: '🇬🇧' },
  { symbol: 'TRY', flag: '🇹🇷' },
  { symbol: 'CHF', flag: '🇨🇭' },
];

const CRYPTOS = [
  { symbol: 'BTC', icon: '₿' },
  { symbol: 'ETH', icon: 'Ξ' },
  { symbol: 'SOL', icon: '◎' },
  { symbol: 'BNB', icon: '🔶' },
  { symbol: 'USDT', icon: '💲' },
  { symbol: 'USDC', icon: '🔵' },
];

const PAYMENT_METHODS = [
  '💳 Credit Card', '🏦 Bank Transfer', '🍎 Apple Pay',
  '🤖 Google Pay', '🅿️ PayPal', '⚡ SEPA Instant'
];

let fiatIndex = 0;
let cryptoIndex = 0;
let paymentIndex = 0;

function updateWidget() {
  const amount = parseFloat(document.getElementById('fiat-amount').value) || 0;
  const crypto = CRYPTOS[cryptoIndex].symbol;
  const rate = RATES[crypto] || 0;
  const result = (amount * rate).toFixed(crypto === 'BTC' ? 6 : 4);
  document.getElementById('crypto-amount').value = result + ' ' + crypto;
}

function cycleFiat() {
  fiatIndex = (fiatIndex + 1) % FIATS.length;
  document.getElementById('fiat-flag').textContent = FIATS[fiatIndex].flag;
  document.getElementById('fiat-symbol').textContent = FIATS[fiatIndex].symbol;
  updateWidget();
}

function cycleCrypto() {
  cryptoIndex = (cryptoIndex + 1) % CRYPTOS.length;
  document.getElementById('crypto-icon').textContent = CRYPTOS[cryptoIndex].icon;
  document.getElementById('crypto-symbol').textContent = CRYPTOS[cryptoIndex].symbol;
  updateWidget();
}

function swapCurrencies() {
  cycleCrypto();
}

function setTab(el, mode) {
  document.querySelectorAll('.widget-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  paymentIndex = (paymentIndex + 1) % PAYMENT_METHODS.length;
  document.getElementById('payment-method').textContent = PAYMENT_METHODS[paymentIndex];
}

function handleBuy() {
  const btn = document.querySelector('.widget-btn');
  btn.textContent = '✓ Redirecting...';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = 'Continue →';
    btn.style.background = '';
  }, 2000);
}

// --- MARQUEE ---
const partners = [
  'Visa', 'Mastercard', 'PayPal', 'Stripe', 'Coinbase', 'Binance',
  'Kraken', 'Uniswap', 'MetaMask', 'Ledger', 'Chainlink', 'Polygon',
  'Solana', 'Ethereum', 'Bitcoin', 'Avalanche'
];

function buildMarquee() {
  const track = document.getElementById('marquee-track');
  const doubled = [...partners, ...partners]; // duplicate for infinite loop
  doubled.forEach(p => {
    const item = document.createElement('div');
    item.className = 'marquee-item';
    item.textContent = p;
    track.appendChild(item);
  });
}

// --- NAV SCROLL ---
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  updateWidget();
  buildMarquee();

  // Animate stats on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.stat-card, .feature-card, .step-card, .payment-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});
