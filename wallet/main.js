// ============================================================
// NCRPTX WALLET — ONBOARDING ENGINE
// ============================================================

let selectedGroup = null;
let selectedWalletType = null;
let customerData = {};

const TERMS_TEXT = `
<strong>NCRPTX DIGITAL ASSET WALLET — TERMS & CONDITIONS</strong><br><br>
Last updated: March 2026<br><br>

<strong>1. ACCEPTANCE OF TERMS</strong><br>
By opening a ncrptx Wallet, you ("Customer") agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, do not open an account.<br><br>

<strong>2. ELIGIBILITY</strong><br>
You must be at least 18 years of age and have the legal capacity to enter into binding agreements in your jurisdiction. By using this service, you represent that you meet these requirements.<br><br>

<strong>3. ACCOUNT TYPES</strong><br>
3.1 Group A (Regulated Jurisdictions): Full KYC verification required. ncrptx acts as a regulated custodian.<br>
3.2 Group B (Custodial): ncrptx holds assets on your behalf. Lighter onboarding requirements apply.<br>
3.3 Group C (Non-Custodial): You hold your own private keys. ncrptx provides infrastructure only.<br><br>

<strong>4. CUSTOMER IDENTIFICATION</strong><br>
Each customer is assigned a unique Customer ID (NCX-XXXXXX). This ID is used for all account operations, P2P transfers, and sub-wallet management. Keep your Customer ID confidential.<br><br>

<strong>5. SUB-WALLETS & PARENTAL CONTROLS</strong><br>
Account holders may create sub-wallets under their Customer ID for supervised use by minors. The primary account holder assumes full responsibility for sub-wallet activity.<br><br>

<strong>6. DIGITAL ASSET RISKS</strong><br>
Digital assets are highly volatile. The value of your assets may fluctuate significantly. ncrptx does not guarantee any returns and is not liable for losses arising from market movements.<br><br>

<strong>7. COMPLIANCE & AML/KYC</strong><br>
ncrptx complies with applicable Anti-Money Laundering (AML) and Know Your Customer (KYC) regulations. We reserve the right to request additional verification at any time and to freeze or close accounts that fail compliance checks.<br><br>

<strong>8. PROHIBITED ACTIVITIES</strong><br>
You may not use ncrptx Wallet for: money laundering, terrorist financing, sanctions evasion, fraud, market manipulation, or any other illegal activity.<br><br>

<strong>9. PRIVACY</strong><br>
Your personal data is processed in accordance with our Privacy Policy. We may share data with regulators and law enforcement as required by applicable law.<br><br>

<strong>10. FEES</strong><br>
ncrptx may charge fees for certain services. Current fees are published on the website and may change with 30 days notice.<br><br>

<strong>11. TERMINATION</strong><br>
Either party may terminate this agreement at any time. ncrptx reserves the right to suspend or close accounts that violate these Terms.<br><br>

<strong>12. GOVERNING LAW</strong><br>
These Terms are governed by the laws of Switzerland. Any disputes shall be submitted to the exclusive jurisdiction of the courts of Zurich.<br><br>

<strong>13. CHANGES TO TERMS</strong><br>
ncrptx reserves the right to modify these Terms at any time. Continued use of the service constitutes acceptance of updated Terms.<br><br>

For questions, contact: legal@ncrptx.com
`;

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  populateCountryDropdowns();
  document.getElementById('terms-content').innerHTML = TERMS_TEXT;
});

function populateCountryDropdowns() {
  const selects = ['country-select', 'f-citizenship', 'f-residence'];
  selects.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    ALL_COUNTRIES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.code;
      opt.textContent = c.name;
      el.appendChild(opt);
    });
  });
}

// --- STEP 0: Country Detection ---
function detectGroup() {
  const code = document.getElementById('country-select').value;
  if (!code) return;

  selectedGroup = getCountryGroup(code);
  const info = document.getElementById('group-info');
  const btn = document.getElementById('btn-step1');

  const messages = {
    A: {
      cls: 'group-a',
      title: 'Group A — Full KYC Required',
      text: `Your country (${getCountryName(code)}) is subject to full identity verification requirements. You will need to provide name, address, date of birth, and citizenship details.`
    },
    B: {
      cls: 'group-b',
      title: 'Group B — Custodial Wallet Available',
      text: `Your country (${getCountryName(code)}) allows custodial wallets with optional KYC. ncrptx will hold your assets securely. Light verification required.`
    },
    C: {
      cls: 'group-c',
      title: 'Group C — Non-Custodial Available',
      text: `Your country (${getCountryName(code)}) supports non-custodial wallets. You can hold your own private keys with minimal onboarding. KYC is optional.`
    }
  };

  const msg = messages[selectedGroup];
  info.className = 'group-info ' + msg.cls;
  info.innerHTML = `<div class="gi-title">${msg.title}</div><div>${msg.text}</div>`;
  info.style.display = 'block';
  btn.disabled = false;

  // Pre-fill residence in KYC form
  document.getElementById('f-residence').value = code;
}

function getCountryName(code) {
  const c = ALL_COUNTRIES.find(c => c.code === code);
  return c ? c.name : code;
}

// --- STEP 1: Wallet Type ---
function buildWalletTypes() {
  const container = document.getElementById('wallet-types');
  container.innerHTML = '';

  let types = [];

  if (selectedGroup === 'A') {
    types = [{
      id: 'custodial-kyc',
      icon: 'CW',
      title: 'Regulated Custodial Wallet',
      badge: 'KYC Required',
      badgeCls: 'kyc',
      desc: 'ncrptx holds your assets under full regulatory supervision. Full identity verification required. FDIC-equivalent protection where applicable.'
    }];
  } else if (selectedGroup === 'B') {
    types = [
      {
        id: 'custodial',
        icon: 'CW',
        title: 'Custodial Wallet',
        badge: 'KYC Optional',
        badgeCls: 'optional',
        desc: 'ncrptx securely holds your private keys. Easy access, account recovery available. Light verification only.'
      },
      {
        id: 'non-custodial',
        icon: 'NC',
        title: 'Non-Custodial Wallet',
        badge: 'KYC Optional',
        badgeCls: 'optional',
        desc: 'You hold your own private keys. Maximum privacy and control. No account recovery — keep your seed phrase safe.'
      }
    ];
  } else {
    types = [
      {
        id: 'non-custodial',
        icon: 'NC',
        title: 'Non-Custodial Wallet',
        badge: 'No KYC',
        badgeCls: 'optional',
        desc: 'You hold your own private keys. Maximum privacy and control. No account recovery — keep your seed phrase safe.'
      },
      {
        id: 'custodial',
        icon: 'CW',
        title: 'Custodial Wallet',
        badge: 'No KYC',
        badgeCls: 'optional',
        desc: 'ncrptx securely holds your private keys. Easy access and account recovery. No identity verification required.'
      }
    ];
  }

  types.forEach(t => {
    const card = document.createElement('div');
    card.className = 'wallet-type-card';
    card.innerHTML = `
      <div class="wt-header">
        <span class="wt-icon">${t.icon}</span>
        <span class="wt-title">${t.title}</span>
        <span class="wt-badge ${t.badgeCls}">${t.badge}</span>
      </div>
      <div class="wt-desc">${t.desc}</div>`;
    card.onclick = () => {
      document.querySelectorAll('.wallet-type-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedWalletType = t.id;
      document.getElementById('btn-step2').disabled = false;
    };
    container.appendChild(card);
  });

  // Group A auto-selects
  if (selectedGroup === 'A') {
    selectedWalletType = 'custodial-kyc';
    container.firstChild?.classList.add('selected');
    document.getElementById('btn-step2').disabled = false;
  }
}

// --- STEP 2: KYC Form ---
function buildKYCForm() {
  const isGroupA = selectedGroup === 'A';
  const isNonCustodial = selectedWalletType === 'non-custodial';

  document.getElementById('kyc-badge').textContent = 'Step 3 of 4';
  document.getElementById('kyc-title').innerHTML = isGroupA
    ? 'Verify Your <span>Identity</span>'
    : isNonCustodial ? 'Create Your <span>Account</span>' : 'Set Up Your <span>Wallet</span>';

  document.getElementById('kyc-sub').textContent = isGroupA
    ? 'Full KYC is required in your jurisdiction. All fields are mandatory.'
    : 'Provide your basic details to create your account. Fields marked * are required.';

  // Show/hide Group A fields
  document.querySelectorAll('.kyc-a').forEach(el => {
    el.style.display = isGroupA ? 'flex' : 'none';
    const input = el.querySelector('input');
    if (input) input.required = isGroupA;
  });
}

// --- NAVIGATION ---
function goStep(stepId) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
  updateProgress(stepId);

  if (stepId === 'step-type') buildWalletTypes();
  if (stepId === 'step-kyc') buildKYCForm();
}

function updateProgress(stepId) {
  const map = { 'step-country': 1, 'step-type': 2, 'step-kyc': 3, 'step-success': 4 };
  const current = map[stepId] || 1;
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('ps' + i);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i < current) el.classList.add('done');
    else if (i === current) el.classList.add('active');
  }

  // Skip type step for Group A
  if (stepId === 'step-country' && selectedGroup === 'A') {
    document.getElementById('btn-step1').onclick = () => goStep('step-kyc');
  } else {
    document.getElementById('btn-step1').onclick = () => goStep('step-type');
  }
}

// --- SUBMIT ---
function submitKYC(e) {
  e.preventDefault();

  customerData = {
    id: generateCustomerID(),
    firstName: document.getElementById('f-firstname').value,
    lastName: document.getElementById('f-lastname').value,
    email: document.getElementById('f-email').value,
    dob: document.getElementById('f-dob').value,
    citizenship: getCountryName(document.getElementById('f-citizenship').value),
    residence: getCountryName(document.getElementById('f-residence').value),
    group: selectedGroup,
    walletType: selectedWalletType,
    createdAt: new Date().toISOString()
  };

  if (selectedGroup === 'A') {
    customerData.address = document.getElementById('f-address').value;
    customerData.city = document.getElementById('f-city').value;
    customerData.postal = document.getElementById('f-postal').value;
    customerData.phone = document.getElementById('f-phone').value;
  }

  document.getElementById('customer-id').textContent = customerData.id;

  const walletLabels = {
    'custodial-kyc': 'Regulated Custodial Wallet',
    'custodial': 'Custodial Wallet',
    'non-custodial': 'Non-Custodial Wallet'
  };

  document.getElementById('wallet-info-box').innerHTML = `
    <strong>Account Summary</strong><br>
    Name: ${customerData.firstName} ${customerData.lastName}<br>
    Wallet Type: ${walletLabels[customerData.walletType]}<br>
    Compliance Group: ${customerData.group}<br>
    Country of Residence: ${customerData.residence}
  `;

  goStep('step-success');
}
