/* Diland portfolio, vanilla JS */
(function () {
  'use strict';
  var S = window.SITE, P = window.PROJECTS, V = window.SERVICES;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var page = document.body.dataset.page || 'home';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h12M9 3l5 5-5 5"/></svg>';
  var pad2 = function (n) { return String(n).padStart(2, '0'); };

  /* ---------- chrome ---------- */
  var links = [['Home', 'index.html', 'home'], ['About', 'about.html', 'about'], ['Services', 'services.html', 'services'], ['Projects', 'projects.html', 'projects'], ['Media', 'media.html', 'media'], ['Contact', 'contact.html', 'contact']];
  var navw = $('#nav');
  if (navw) {
    navw.className = 'nav-w';
    navw.innerHTML = '<div class="nav"><a class="logo" href="index.html" aria-label="Diland home"><i>D</i></a><div class="links">' +
      links.map(function (l) {
        var on = (page === l[2] || (page === 'project' && l[2] === 'projects')) ? ' on' : '';
        return '<a class="l' + on + '" href="' + l[1] + '">' + l[0] + '</a>';
      }).join('') + '<a class="btn" href="contact.html"><span>Work with me</span>' + ARROW + '</a></div>' +
      '<button class="burger" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button></div>';
    var nav = $('.nav', navw), bg = $('.burger', navw), last = 0;
    var darkTop = document.body.dataset.top !== 'light';
    var chk = function () {
      var y = window.scrollY;
      nav.classList.toggle('solid', !darkTop || y > 60);
      navw.classList.toggle('hide', y > last && y > 500 && !document.body.classList.contains('menu-open'));
      last = y;
    };
    window.addEventListener('scroll', chk, { passive: true }); chk();
    bg.addEventListener('click', function () {
      var o = document.body.classList.toggle('menu-open');
      bg.setAttribute('aria-expanded', o);
    });
  }
  var ft = $('#ft');
  if (ft) {
    ft.className = 'ft';
    ft.innerHTML = '<div class="ft-top"><div><p class="ft-big">Systems that run while you sleep.</p></div>' +
      '<div><h5>Explore</h5><ul>' + links.map(function (l) { return '<li><a href="' + l[1] + '">' + l[0] + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h5>Reach me</h5><ul><li><a href="mailto:' + S.email + '">' + S.email + '</a></li><li><a href="' + S.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li></ul></div>' +
      '<div><h5>Credentials</h5><p style="color:var(--tint);font-size:.95rem">GoHighLevel Virtual Assistant &amp; Automation Specialist. Certified GHL expert.</p></div></div>' +
      '<div class="ft-word" aria-hidden="true">Diland</div>' +
      '<div class="ft-bot"><span>© 2026 Diland. All rights reserved.</span><a href="#top">Back to top ↑</a></div>';
  }

  /* ---------- helpers ---------- */
  function win(src, alt, label, url) {
    return '<div class="win"><div class="win-bar"><i></i><i></i><i></i><span>' + esc(url) + '</span></div><div class="win-body" data-label="' + esc(label) + '">' +
      (src ? '<img src="' + src + '" alt="' + esc(alt) + '" loading="lazy">' : '') + '</div></div>';
  }
  var webs = P.filter(function (p) { return p.kind === 'web'; });
  var flows = P.filter(function (p) { return p.kind === 'flow'; });

  /* stacked work */
  var st = $('#stack');
  if (st) st.innerHTML = webs.map(function (p, i) {
    var s = p.shots[0];
    return '<article class="scard" style="--i:' + i + '"><div class="media">' + win(s && s.src, s && s.alt, p.title, 'case-study / ' + p.slug) + '</div>' +
      '<div class="txt"><div><span class="num">' + p.n + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p></div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap"><a class="arrow-link" href="project.html?p=' + p.slug + '">View case study ' + ARROW.replace('<svg', '<svg width="16" height="16"') + '</a><span class="chip live">Live preview</span></div></div></article>';
  }).join('');

  /* workflow bento */
  var bn = $('#bento');
  if (bn) {
    var cls = ['w3 feat', 'w3', 'w2', 'w2', 'w2', 'w6'];
    bn.innerHTML = flows.map(function (p, i) {
      return '<a class="bc ' + cls[i] + '" href="project.html?p=' + p.slug + '" data-r style="--d:' + (i % 3) * 80 + 'ms"><span class="go">' + ARROW.replace('<svg', '<svg width="16" height="16"') + '</span><span class="mono">' + p.n + ', ' + esc(p.cat) + '</span><div><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p></div></a>';
    }).join('');
  }

  /* services bento (home) */
  var sh = $('#svc-home');
  if (sh) sh.innerHTML = V.filter(function (v) { return v.core; }).map(function (v, i) {
    return '<a class="sv" href="services.html#s' + i + '" data-r style="--d:' + (i % 3) * 80 + 'ms"><span class="ic">' + pad2(i + 1) + '</span><h3>' + esc(v.t) + '</h3><p>' + esc(v.d) + '</p></a>';
  }).join('');

  /* services tabs */
  var tl = $('#tablist');
  if (tl) {
    var h = '<div class="grp">Core, backed by work</div>', ph = '';
    V.forEach(function (v, i) {
      if (i === 5) h += '<div class="grp">Additional capabilities</div>';
      h += '<button class="tab' + (i === 0 ? ' on' : '') + '" data-i="' + i + '" role="tab"><span class="mono">' + pad2(i + 1) + '</span>' + esc(v.t) + '</button>';
      ph += '<div class="panel' + (i === 0 ? ' on' : '') + '" id="p' + i + '" role="tabpanel"><span class="eyebrow">' + (v.core ? 'Core service' : 'Additional capability') + '</span><h2 style="margin-top:22px">' + esc(v.t) + '</h2><p class="lead mute">' + esc(v.d) + '</p>' +
        '<div class="blk"><h4>Solves</h4><p>' + esc(v.solves) + '</p></div><div class="blk"><h4>Typical implementations</h4><ul>' + v.impl.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="blk"><h4>Value</h4><p class="val">' + esc(v.value) + '</p></div></div>';
    });
    tl.innerHTML = h; $('#panels').innerHTML = ph;
    var pick = function (i) {
      $$('.tab', tl).forEach(function (t) { t.classList.toggle('on', +t.dataset.i === i); });
      $$('.panel').forEach(function (p, k) { p.classList.toggle('on', k === i); });
    };
    tl.addEventListener('click', function (e) {
      var b = e.target.closest('.tab'); if (!b) return; pick(+b.dataset.i);
      if (window.innerWidth <= 1000) $('#panels').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    var m = location.hash.match(/^#s(\d+)$/); if (m && V[+m[1]]) pick(+m[1]);
  }

  /* projects grid + filters */
  var pg = $('#pg');
  if (pg) {
    pg.innerHTML = P.map(function (p) {
      var s = p.shots[0];
      return '<a class="pcard" href="project.html?p=' + p.slug + '" data-cat="' + esc(p.cat) + '">' + win(s && s.src, s && s.alt, p.title, 'case-study / ' + p.slug) +
        '<div class="in"><span class="chip' + (p.live ? ' live' : '') + '">' + esc(p.cat) + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p></div></a>';
    }).join('');
    var cats = ['All'].concat(P.map(function (p) { return p.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    var fb = $('#fil');
    fb.innerHTML = cats.map(function (c, i) { return '<button class="fb' + (i === 0 ? ' on' : '') + '" data-c="' + esc(c) + '">' + esc(c) + '</button>'; }).join('');
    fb.addEventListener('click', function (e) {
      var b = e.target.closest('.fb'); if (!b) return;
      $$('.fb', fb).forEach(function (x) { x.classList.toggle('on', x === b); });
      $$('.pcard', pg).forEach(function (c) { c.classList.toggle('hide', b.dataset.c !== 'All' && c.dataset.cat !== b.dataset.c); });
    });
  }

  /* media */
  var mg = $('#mg');
  if (mg) {
    var o = '';
    P.forEach(function (p) {
      p.shots.forEach(function (s) {
        o += '<a class="mi" href="project.html?p=' + p.slug + '" data-r>' + win(s.src, s.alt, p.title, 'case-study / ' + p.slug) + '<div class="cp"><p>' + esc(s.cap) + '</p><span class="mono">' + esc(p.title) + ' →</span></div></a>';
      });
    });
    mg.innerHTML = o;
  }

  /* project detail */
  var pdm = $('#pd-main');
  if (pdm) {
    var slug = new URLSearchParams(location.search).get('p');
    var ix = P.findIndex(function (p) { return p.slug === slug; }); if (ix < 0) ix = 0;
    var p = P[ix], nx = P[(ix + 1) % P.length];
    document.title = p.title + ', Diland';
    var rel = p.kind === 'web' ? V[2] : (p.full ? V[5] : V[1]);
    $('#pd-head').innerHTML = '<a class="crumb mono" href="projects.html">← Back to project library</a><div><span class="eyebrow">' + esc(p.cat) + ' · ' + p.n + ' / ' + P.length + '</span></div>' +
      '<h1 class="d d-lg" style="margin:24px 0 26px;max-width:18ch">' + esc(p.title) + '</h1><p class="lead">' + esc(p.desc) + '</p>';
    var side = p.full
      ? '<div class="blk2"><span class="mono">My role</span><p>' + esc(p.role) + '</p></div><div class="blk2"><span class="mono">Tools &amp; features</span><div class="tags">' + p.tools.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div></div>'
      : '<div class="blk2"><span class="mono">Category</span><p>' + esc(p.cat) + '</p></div><div class="blk2"><span class="mono">Related service</span><p>' + esc(rel.t) + '</p></div>';
    $('#pd-side').innerHTML = side;
    var li = function (a) { return '<ul>' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; };
    var m2 = '';
    if (p.full) {
      m2 += '<div class="blk2"><span class="mono">Business context</span><p>' + esc(p.context) + '</p></div>' +
        '<div class="blk2"><span class="mono">The problem</span><p class="big">' + esc(p.problem) + '</p></div>' +
        '<div class="blk2"><span class="mono">Objectives</span>' + li(p.objectives) + '</div>' +
        '<div class="blk2"><span class="mono">Workflow logic</span><ul>' + p.steps.map(function (x, i) { return '<li><span class="mono">' + pad2(i + 1) + '</span><span>' + esc(x) + '</span></li>'; }).join('') + '</ul></div>';
    } else {
      m2 += '<div class="blk2"><span class="mono">What this demonstrates</span><p>' + esc(rel.d) + '</p></div><div class="blk2"><span class="mono">Typical implementations</span>' + li(rel.impl) + '</div>';
    }
    if (p.shots.length) m2 += '<div class="blk2"><span class="mono">Screenshots</span><div class="shots">' + p.shots.map(function (s) {
      return '<figure class="shot" data-r>' + win(s.src, s.alt, p.title, 'case-study / ' + p.slug) + '<figcaption>' + esc(s.cap) + '</figcaption></figure>';
    }).join('') + '</div></div>';
    if (p.full) m2 += '<div class="blk2"><span class="mono">Results, intended business benefits</span>' + li(p.results) + '<p class="mute" style="margin-top:14px;font-size:.9rem">' + esc(p.resultsNote) + '</p></div>';
    pdm.innerHTML = m2;
    var nl = $('#next'); nl.href = 'project.html?p=' + nx.slug;
    nl.innerHTML = '<span class="mono mute">Next project</span><div class="d d-lg" style="margin-top:16px">' + esc(nx.title) + ' →</div>';
  }

  /* contact */
  var cf = $('#cform');
  if (cf) cf.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(cf);
    location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Project enquiry from ' + f.get('name')) +
      '&body=' + encodeURIComponent('Name: ' + f.get('name') + '\nEmail: ' + f.get('email') + '\n\n' + f.get('msg'));
  });

  /* ---------- image fallback ---------- */
  var miss = function (img) { var b = img.closest('.win-body'); if (b) b.classList.add('noimg'); };
  document.addEventListener('error', function (e) { if (e.target.tagName === 'IMG') miss(e.target); }, true);
  $$('img').forEach(function (i) { if (i.complete && i.naturalWidth === 0 && i.getAttribute('src')) miss(i); });
  $$('.win-body:not(:has(img))').forEach(function (b) { b.classList.add('noimg'); });

  /* ---------- reveal + counters ---------- */
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) {
      if (!x.isIntersecting) return;
      x.target.classList.add('in'); io.unobserve(x.target);
      if (x.target.dataset.count) {
        var end = +x.target.dataset.count, t0 = null;
        var step = function (t) { t0 = t0 || t; var k = Math.min(1, (t - t0) / 1400); x.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 4))); if (k < 1) requestAnimationFrame(step); };
        reduce ? (x.target.textContent = end) : requestAnimationFrame(step);
      }
    });
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('[data-r],[data-count],.tstep').forEach(function (e) { io.observe(e); });

  /* ---------- hero tilt ---------- */
  var stage = $('.stage');
  if (stage && !reduce && window.matchMedia('(hover:hover)').matches) {
    var tl2 = $('.tilt', stage);
    stage.addEventListener('mousemove', function (e) {
      var r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      tl2.style.transform = 'rotateY(' + (x * 12) + 'deg) rotateX(' + (-y * 10) + 'deg)';
    });
    stage.addEventListener('mouseleave', function () { tl2.style.transform = ''; });
  }

  /* ---------- timeline fill ---------- */
  var tlw = $('.tl');
  if (tlw) {
    var fill = $('.tl-fill', tlw);
    var up = function () {
      var r = tlw.getBoundingClientRect(), vh = window.innerHeight;
      var k = Math.min(1, Math.max(0, (vh * .7 - r.top) / (r.height || 1)));
      fill.style.height = (k * (r.height - 16)) + 'px';
    };
    window.addEventListener('scroll', up, { passive: true }); up();
  }
})();
