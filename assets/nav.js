// Shared top navigation for all ncrptx pages
// Usage: <script src="../assets/nav.js"></script> (adjust path as needed)
// Call: renderNav(rootPath) where rootPath = '' for root, '../' for subpages

function renderNav(rootPath) {
  rootPath = rootPath || '';
  const currentPath = window.location.pathname;

  const features = [
    { href: rootPath + 'wallet/',   label: 'Wallet' },
    { href: rootPath + 'onramp/',   label: 'Onramp' },
    { href: rootPath + 'pay/',      label: 'Pay' },
    { href: rootPath + 'gateway/',  label: 'Gateway' },
    { href: rootPath + 'partners/', label: 'Partners' },
  ];

  const isActive = (href) => currentPath.includes(href.replace(rootPath, '/').replace('../', '/'));

  const nav = document.createElement('nav');
  nav.id = 'shared-nav';
  nav.innerHTML = `
    <style>
      #shared-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
        padding: 14px 48px;
        display: flex; align-items: center; justify-content: space-between; gap: 16px;
        background: rgba(8,8,8,0.92);
        backdrop-filter: blur(24px);
        border-bottom: 1px solid rgba(229,41,42,0.18);
        transition: padding 0.3s;
      }
      #shared-nav.scrolled { padding: 10px 48px; }
      .snav-logo { display:flex; align-items:center; text-decoration:none; flex-shrink:0; }
      .snav-logo img { height:36px; width:auto; }
      .snav-features {
        display: flex; gap: 2px; list-style: none;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(229,41,42,0.18);
        border-radius: 10px; padding: 4px;
      }
      .snav-features a {
        color: rgba(240,240,240,0.5);
        text-decoration: none; font-size: 0.8rem; font-weight: 600;
        padding: 7px 14px; border-radius: 7px;
        transition: all 0.2s; white-space: nowrap; display: block;
        font-family: 'Inter', sans-serif;
      }
      .snav-features a:hover { background: rgba(229,41,42,0.1); color: #e5292a; }
      .snav-features a.active { background: rgba(229,41,42,0.12); color: #e5292a; }
      .snav-actions { display: flex; align-items: center; gap: 8px; }
      .snav-btn {
        color: rgba(240,240,240,0.55); text-decoration: none; font-size: 0.8rem;
        font-weight: 600; padding: 7px 14px; border-radius: 8px;
        border: 1px solid rgba(229,41,42,0.18); transition: all 0.2s;
        font-family: 'Inter', sans-serif;
      }
      .snav-btn:hover { color: #e5292a; border-color: #e5292a; background: rgba(229,41,42,0.05); }
      .snav-cta {
        background: #e5292a; color: #fff !important; padding: 7px 18px;
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
      <a href="${rootPath}trade/" class="snav-btn">Trade</a>
      <a href="${rootPath}#contact" class="snav-cta">Contact Us</a>
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Footer credit
  const footer = document.createElement('div');
  footer.style.cssText = 'position:fixed;bottom:8px;right:16px;font-size:0.68rem;color:rgba(120,120,120,0.5);font-family:Inter,sans-serif;z-index:998;pointer-events:none;';
  footer.textContent = 'Made by R2-D2';
  document.body.appendChild(footer);
}
