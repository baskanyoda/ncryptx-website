// Shared top navigation for all ncrptx pages
// Usage: <script src="../assets/nav.js"></script> (adjust path as needed)
// Call: renderNav(rootPath) where rootPath = '' for root, '../' for subpages

function renderNav(rootPath) {
  rootPath = rootPath || '';
  const currentPath = window.location.pathname;

  const features = [
    { href: rootPath + 'wallet/', label: '💳 Wallet' },
    { href: rootPath + 'onramp/', label: '⚡ Onramp' },
    { href: rootPath + 'pay/', label: '💸 Pay by Crypto' },
    { href: rootPath + 'gateway/', label: '🔗 Gateway' },
    { href: rootPath + 'partners/', label: '🤝 Partner Projects' },
  ];

  const isActive = (href) => currentPath.includes(href.replace(rootPath, '/').replace('../', '/'));

  const nav = document.createElement('nav');
  nav.id = 'shared-nav';
  nav.innerHTML = `
    <style>
      #shared-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
        padding: 12px 40px;
        display: flex; align-items: center; justify-content: space-between; gap: 16px;
        background: rgba(7,8,15,0.92);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(79,124,255,0.15);
        transition: padding 0.3s;
      }
      #shared-nav.scrolled { padding: 8px 40px; }
      .snav-logo { display:flex; align-items:center; text-decoration:none; flex-shrink:0; }
      .snav-logo img { height:26px; width:auto; }
      .snav-features {
        display: flex; gap: 3px; list-style: none;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(79,124,255,0.15);
        border-radius: 10px; padding: 4px;
      }
      .snav-features a {
        color: rgba(232,234,246,0.6);
        text-decoration: none; font-size: 0.8rem; font-weight: 600;
        padding: 7px 13px; border-radius: 7px;
        transition: all 0.2s; white-space: nowrap; display: block;
        font-family: 'Inter', sans-serif;
      }
      .snav-features a:hover { background: rgba(79,124,255,0.12); color: #4f7cff; }
      .snav-features a.active { background: rgba(79,124,255,0.15); color: #4f7cff; }
      .snav-actions { display: flex; align-items: center; gap: 8px; }
      .snav-btn {
        color: rgba(232,234,246,0.6); text-decoration: none; font-size: 0.8rem;
        font-weight: 600; padding: 7px 14px; border-radius: 8px;
        border: 1px solid rgba(79,124,255,0.2); transition: all 0.2s;
        font-family: 'Inter', sans-serif;
      }
      .snav-btn:hover { color: #4f7cff; border-color: #4f7cff; background: rgba(79,124,255,0.05); }
      .snav-cta {
        background: #4f7cff; color: #fff !important; padding: 7px 18px;
        border-radius: 8px; font-weight: 700; font-size: 0.8rem;
        text-decoration: none; transition: opacity 0.2s; font-family: 'Inter', sans-serif;
      }
      .snav-cta:hover { opacity: 0.85; }
      @media (max-width: 900px) {
        #shared-nav { padding: 10px 16px; }
        .snav-features { display: none; }
      }
    </style>
    <a href="${rootPath || '/'}" class="snav-logo">
      <img src="${rootPath}assets/logo.svg" alt="ncrptx" />
    </a>
    <ul class="snav-features">
      ${features.map(f => `
        <li><a href="${f.href}" class="${isActive(f.href) ? 'active' : ''}">${f.label}</a></li>
      `).join('')}
    </ul>
    <div class="snav-actions">
      <a href="${rootPath}trade/" class="snav-btn">📈 Trade</a>
      <a href="${rootPath}#contact" class="snav-cta">Contact Us</a>
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // R2D2 footer credit
  const footer = document.createElement('div');
  footer.style.cssText = 'position:fixed;bottom:8px;right:16px;font-size:0.7rem;color:rgba(136,144,181,0.5);font-family:Inter,sans-serif;z-index:998;pointer-events:none;';
  footer.innerHTML = 'Made with ❤️ by R2-D2 🤖';
  document.body.appendChild(footer);
}
