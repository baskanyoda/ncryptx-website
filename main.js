// ============================================================
// NCRYPTX — MAIN RENDERER
// Reads from config.js and builds the page
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const c = CONFIG;

  // Page meta
  document.getElementById('page-title').textContent = c.company.name;
  document.getElementById('page-desc').content = c.company.description;

  // Nav
  document.getElementById('nav-logo').textContent = c.company.name;
  const navLinks = document.getElementById('nav-links');
  c.nav.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${item.href}">${item.label}</a>`;
    navLinks.appendChild(li);
  });

  // Hero
  document.getElementById('hero-badge').textContent = c.company.license;
  document.getElementById('hero-title').innerHTML = c.hero.headline.replace(
    /(Digital Assets?|Crypto\w*)/gi,
    '<span>$1</span>'
  );
  document.getElementById('hero-sub').textContent = c.hero.subheadline;
  document.getElementById('hero-cta1').textContent = c.hero.cta_primary;
  document.getElementById('hero-cta2').textContent = c.hero.cta_secondary;

  // Stats
  const statsGrid = document.getElementById('stats-grid');
  c.stats.forEach(s => {
    statsGrid.innerHTML += `
      <div class="stat-item">
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>`;
  });

  // Services
  document.getElementById('services-title').textContent = c.services.title;
  document.getElementById('services-sub').textContent = c.services.subtitle;
  const servicesGrid = document.getElementById('services-grid');
  c.services.items.forEach(s => {
    servicesGrid.innerHTML += `
      <div class="service-card">
        <span class="service-icon">${s.icon}</span>
        <div class="service-title">${s.title}</div>
        <div class="service-desc">${s.description}</div>
      </div>`;
  });

  // Why Us
  document.getElementById('why-title').textContent = c.why.title;
  document.getElementById('why-sub').textContent = c.why.subtitle;
  const whyGrid = document.getElementById('why-grid');
  c.why.items.forEach(w => {
    whyGrid.innerHTML += `
      <div class="why-item">
        <div class="why-icon">${w.icon}</div>
        <div>
          <div class="why-title">${w.title}</div>
          <div class="why-desc">${w.description}</div>
        </div>
      </div>`;
  });

  // Team
  document.getElementById('team-title').textContent = c.team.title;
  document.getElementById('team-sub').textContent = c.team.subtitle;
  const teamGrid = document.getElementById('team-grid');
  c.team.members.forEach(m => {
    teamGrid.innerHTML += `
      <div class="team-card">
        <img class="team-avatar" src="${m.image}" alt="${m.name}" />
        <div class="team-name">${m.name}</div>
        <div class="team-role">${m.role}</div>
        <div class="team-bio">${m.bio}</div>
      </div>`;
  });

  // Contact
  document.getElementById('contact-title').textContent = c.contact.title;
  document.getElementById('contact-sub').textContent = c.contact.subtitle;
  document.getElementById('contact-cta').textContent = c.contact.cta;

  // Footer
  document.getElementById('footer-logo').textContent = c.company.name;
  const footerLinks = document.getElementById('footer-links');
  c.footer.links.forEach(l => {
    footerLinks.innerHTML += `<li><a href="${l.href}">${l.label}</a></li>`;
  });
  document.getElementById('footer-disclaimer').textContent = c.footer.disclaimer;
  document.getElementById('footer-copy').innerHTML =
    `© ${new Date().getFullYear()} ${c.company.name}. All rights reserved. &nbsp;·&nbsp; Made with ❤️ by R2-D2`;

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });
});

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = CONFIG.contact.cta;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
