/* ============================================================
   EDISON EAGLES BASEBALL
   Data + interactions. No dependencies.
   ============================================================ */
(() => {
  'use strict';

  const $ = (sel, scope = document) => scope.querySelector(sel);
  const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

  /* ------------------------------------------------------------
     2026 SCHEDULE — via NJ.com
  ------------------------------------------------------------ */
  const schedule = [
    { date: '2026-03-31', site: 'away', opponent: 'Old Bridge', tag: 'league', w: 5, l: 2 },
    { date: '2026-04-02', site: 'home', opponent: 'Old Bridge', tag: 'league', w: 2, l: 1 },
    { date: '2026-04-04', site: 'home', opponent: 'South Plainfield', tag: 'league', w: 5, l: 4 },
    { date: '2026-04-07', site: 'away', opponent: 'South Plainfield', tag: 'league', w: 10, l: 8 },
    { date: '2026-04-09', site: 'home', opponent: 'Monroe', tag: 'league', w: 7, l: 1 },
    { date: '2026-04-11', site: 'away', opponent: 'Monroe', tag: 'league', w: 0, l: 2 },
    { date: '2026-04-14', site: 'home', opponent: 'St. Joseph (Met.)', tag: 'league', w: 4, l: 0, note: 'Murphy no-hitter · 13 K', highlight: true },
    { date: '2026-04-16', site: 'away', opponent: 'St. Joseph (Met.)', tag: 'league', w: 5, l: 3 },
    { date: '2026-04-19', site: 'neutral', opponent: 'Columbia', tag: 'classic', w: 4, l: 10, note: 'Autism Awareness Challenge' },
    { date: '2026-04-21', site: 'away', opponent: 'East Brunswick', tag: 'league', w: 9, l: 0 },
    { date: '2026-04-23', site: 'home', opponent: 'Woodbridge', tag: 'league', w: 0, l: 14 },
    { date: '2026-04-27', site: 'away', opponent: 'Woodbridge', tag: 'league', w: 1, l: 0 },
    { date: '2026-04-28', site: 'away', opponent: 'St. Thomas Aquinas', tag: 'league', w: 2, l: 3 },
    { date: '2026-04-30', site: 'home', opponent: 'St. Thomas Aquinas', tag: 'league', w: 5, l: 0 },
    { date: '2026-05-02', site: 'away', opponent: 'North Brunswick', tag: 'nonleague', w: 15, l: 4 },
    { date: '2026-05-02', site: 'home', opponent: 'J.P. Stevens', tag: 'nonleague', w: 7, l: 2, note: 'Tavarez go-ahead HR' },
    { date: '2026-05-04', site: 'away', opponent: 'Metuchen', tag: 'nonleague', w: 5, l: 6 },
    { date: '2026-05-05', site: 'home', opponent: 'East Brunswick', tag: 'league', w: 16, l: 2 },
    { date: '2026-05-06', site: 'home', opponent: 'Spotswood', tag: 'nonleague', w: 1, l: 0, note: 'Tirado walk-off · 9 inn.', highlight: true },
    { date: '2026-05-11', site: 'home', opponent: 'Piscataway Magnet', tag: 'gmc', w: 10, l: 0, note: 'GMC first round' },
    { date: '2026-05-13', site: 'home', opponent: 'Monroe', tag: 'gmc', w: 1, l: 9, note: 'GMC quarterfinal' },
    { date: '2026-05-14', site: 'home', opponent: 'South Brunswick', tag: 'nonleague', w: 5, l: 2 },
    { date: '2026-05-16', site: 'home', opponent: 'Nottingham', tag: 'nonleague', w: 7, l: 2 },
    { date: '2026-05-19', site: 'home', opponent: 'Somerville', tag: 'nonleague', w: 9, l: 1, note: 'Tavarez 9–1 complete game' },
    { date: '2026-05-20', site: 'home', opponent: 'Carteret', tag: 'nonleague', w: 9, l: 0, note: 'Kentos 12 K' },
    { date: '2026-05-21', site: 'home', opponent: 'Hunterdon Central', tag: 'nonleague', w: 0, l: 4 },
    { date: '2026-05-27', site: 'neutral', opponent: 'Franklin', tag: 'state', w: 4, l: 5, note: 'NJSIAA CJ Group 4 first round' }
  ];

  /* ------------------------------------------------------------
     2026 ROSTER + STATS — via NJ.com
  ------------------------------------------------------------ */
  const players = [
    {
      num: 1, name: 'Daren Tirado', pos: 'OF', cls: 'Senior', wt: 165,
      cardStat: '.299 · 18 RBI',
      batting: { ab: 77, r: 17, h: 23, rbi: 18, hr: 2, sb: 7, avg: .299, slg: .455 },
      note: 'Walk-off RBI single in the ninth to beat Spotswood, 1–0, on May 6.'
    },
    {
      num: 2, name: 'Connor Murphy', pos: 'P, IF', cls: 'Senior',
      cardStat: '5–1 · 0.54 ERA',
      batting: { ab: 72, r: 16, h: 21, rbi: 11, hr: 0, sb: 4, avg: .292, slg: .375 },
      pitching: { w: 5, l: 1, ip: 39, h: 14, er: 3, bb: 10, k: 83, era: 0.54 },
      commit: 'Monmouth University',
      note: 'No-hitter vs. St. Joseph on April 14: 7 innings, 0 hits, 13 strikeouts, 4–0.'
    },
    {
      num: 3, name: 'Ray Tavarez', pos: 'IF, P', cls: 'Junior',
      cardStat: '.345 · 24 RBI',
      batting: { ab: 84, r: 21, h: 29, rbi: 24, hr: 1, sb: 8, avg: .345, slg: .536 },
      pitching: { w: 3, l: 1, ip: 34.1, h: 33, er: 12, bb: 17, k: 39, era: 2.45 },
      note: 'Two-way leader: 29 hits, 24 RBI, and a 2.45 ERA over 34.1 innings.'
    },
    {
      num: 4, name: 'Sean Whyte', pos: 'IF, P', cls: 'Sophomore',
      cardStat: '9.2 IP',
      batting: { ab: 16, r: 4, h: 2, rbi: 1, hr: 0, sb: 0, avg: .125, slg: .125 },
      pitching: { w: 0, l: 0, ip: 9.2, h: 15, er: 6, bb: 8, k: 3, era: 4.34 }
    },
    {
      num: 5, name: 'Dom Innocenti', pos: 'P, SS', cls: 'Senior',
      cardStat: '.364 · 28 H',
      batting: { ab: 77, r: 20, h: 28, rbi: 14, hr: 2, sb: 4, avg: .364, slg: .468 },
      pitching: { w: 1, l: 2, ip: 20.2, h: 22, er: 9, bb: 6, k: 25, era: 3.05 },
      commit: 'Wagner College',
      note: 'Hit .364 with 28 hits and 20 runs while making eight appearances on the mound.'
    },
    {
      num: 7, name: 'James Fogarile', pos: 'IF, P', cls: 'Junior'
    },
    {
      num: 8, name: 'Dante di Pasquale', pos: 'P, OF', cls: 'Junior',
      cardStat: '7.1 IP · 4.77',
      batting: { ab: 9, r: 0, h: 0, rbi: 0, hr: 0, sb: 0, avg: null, slg: null },
      pitching: { w: 1, l: 0, ip: 7.1, h: 7, er: 5, bb: 4, k: 3, era: 4.77 }
    },
    {
      num: 9, name: 'Keith Hahn', pos: 'C', cls: 'Freshman',
      cardStat: '2-for-4 · 3 RBI',
      batting: { ab: 4, r: 1, h: 2, rbi: 3, hr: 0, sb: 1, avg: .500, slg: .500 }
    },
    {
      num: 10, name: 'Cole Berner', pos: 'P, 1B', cls: 'Freshman', ht: '5-8', wt: 185
    },
    {
      num: 11, name: 'Sam Kentos', pos: 'OF, P', cls: 'Sophomore',
      cardStat: '3–1 · 2.47 ERA',
      batting: { ab: 57, r: 17, h: 17, rbi: 15, hr: 2, sb: 3, avg: .298, slg: .596 },
      pitching: { w: 3, l: 1, ip: 28.1, h: 19, er: 10, bb: 18, k: 42, era: 2.47 },
      note: 'Struck out 12 with three hits and no walks in a 9–0 shutout of Carteret on May 20.'
    },
    {
      num: 12, name: 'Adam Spelda', pos: 'OF, P', cls: 'Junior'
    },
    {
      num: 13, name: 'Damien Calandra', pos: 'C', cls: 'Sophomore',
      cardStat: '13 H · 9 RBI',
      batting: { ab: 71, r: 5, h: 13, rbi: 9, hr: 0, sb: 0, avg: .183, slg: .282 },
      note: 'Caught the final runner stealing to seal Connor Murphy’s no-hitter.'
    },
    {
      num: 14, name: 'Isaiah Lutz Sowell', pos: 'OF, DH', cls: 'Senior',
      cardStat: '7 H · 4 RBI',
      batting: { ab: 46, r: 6, h: 7, rbi: 4, hr: 0, sb: 0, avg: .152, slg: .174 }
    },
    {
      num: 17, name: 'Robert Roma', pos: 'P, 1B', cls: 'Senior', ht: '6-3', wt: 215,
      cardStat: '.407 · 3 HR',
      batting: { ab: 81, r: 25, h: 33, rbi: 14, hr: 3, sb: 9, avg: .407, slg: .753 },
      pitching: { w: 2, l: 1, ip: 12.2, h: 7, er: 3, bb: 8, k: 17, era: 1.66 },
      commit: 'Wagner College',
      note: 'Led the team in average (.407), slugging (.753), hits (33), runs (25) and stolen bases (9).'
    },
    {
      num: 18, name: 'Andrew Marruga', pos: 'IF', cls: 'Freshman'
    },
    {
      num: 20, name: 'Elijah Pavez', pos: 'DH, 1B', cls: 'Senior',
      cardStat: '1-for-4',
      batting: { ab: 4, r: 0, h: 1, rbi: 0, hr: 0, sb: 0, avg: .250, slg: .250 }
    },
    {
      num: 22, name: 'Brayden Roma', pos: 'P, 1B', cls: 'Sophomore', ht: '6-4', wt: 290,
      cardStat: '4–2 · 2.89 ERA',
      batting: { ab: 44, r: 2, h: 6, rbi: 4, hr: 0, sb: 0, avg: .136, slg: .136 },
      pitching: { w: 4, l: 2, ip: 26.2, h: 30, er: 11, bb: 17, k: 13, era: 2.89 },
      note: 'Won four games and threw 26.2 innings as a sophomore.'
    },
    {
      num: 25, name: 'Sam Westdyke', pos: 'C, P', cls: 'Freshman', ht: '5-11', wt: 175,
      cardStat: '1 AB',
      batting: { ab: 1, r: 0, h: 0, rbi: 0, hr: 0, sb: 0, avg: null, slg: null }
    },
    {
      num: 26, name: 'Tyler Schuck', pos: 'IF', cls: 'Freshman',
      cardStat: '.370 AVG',
      batting: { ab: 27, r: 2, h: 10, rbi: 4, hr: 0, sb: 1, avg: .370, slg: .370 },
      note: 'Hit .370 (10-for-27) in his first varsity season.'
    },
    {
      num: 28, name: 'Kyle Knox', pos: 'OF, P', cls: 'Sophomore'
    },
    {
      num: 30, name: 'Ethan Melendez', pos: 'OF, P', cls: 'Freshman',
      cardStat: '3-for-6',
      batting: { ab: 6, r: 1, h: 3, rbi: 2, hr: 0, sb: 0, avg: .500, slg: .500 }
    },
    {
      num: 32, name: 'Krishna Das', pos: 'OF', cls: 'Freshman'
    },
    {
      num: 33, name: 'Liam Tavares', pos: 'OF', cls: 'Freshman'
    },
    {
      num: 36, name: 'Ryo Rivera', pos: 'OF', cls: 'Freshman'
    },
    {
      num: 40, name: 'Aiden Castainca', pos: 'IF', cls: 'Freshman'
    },
    {
      num: 41, name: 'Jason Biskupek', pos: 'OF, P', cls: 'Freshman'
    },
    {
      num: 46, name: 'Connor DiFrenza', pos: 'IF, P', cls: 'Freshman', ht: '6-3', wt: 205
    },
    {
      num: 52, name: 'Owen Oshinski', pos: 'P, IF', cls: 'Sophomore'
    }
  ];

  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const dateParts = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return { date, month: MONTHS[date.getMonth()], day: date.getDate(), weekday: WEEKDAYS[date.getDay()] };
  };

  const avg = (value) => (value == null ? '—' : value.toFixed(3).replace(/^0/, ''));
  const era = (value) => (value == null ? '—' : value.toFixed(2));
  const ip = (value) => (value == null ? '—' : value.toFixed(1));
  const size = (p) => {
    if (p.ht && p.wt) return `${p.ht.replace('-', '′')}″ · ${p.wt} lb`;
    if (p.wt) return `${p.wt} lb`;
    return '—';
  };

  const tagLabel = (tag) => ({
    league: 'GMC Red',
    gmc: 'GMC Tournament',
    state: 'NJSIAA CJ Group 4',
    classic: 'Autism Awareness Challenge'
  }[tag] || '');

  /* ------------------------------------------------------------
     HEADER / MOBILE NAV
  ------------------------------------------------------------ */
  const initHeader = () => {
    const header = $('#siteHeader');
    const toggle = $('.nav-toggle');
    const mobileNav = $('#mobileNav');
    if (!header) return;

    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!toggle || !mobileNav) return;

    const setNav = (open) => {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileNav.setAttribute('aria-hidden', String(!open));
      if (open) {
        const first = $('a', mobileNav);
        window.setTimeout(() => first && first.focus(), 260);
      }
    };

    toggle.addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
    $$('a', mobileNav).forEach((link) => link.addEventListener('click', () => setNav(false)));
    mobileNav.addEventListener('click', (event) => {
      if (event.target === mobileNav) setNav(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
        setNav(false);
        toggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1020 && document.body.classList.contains('nav-open')) setNav(false);
    });
  };

  /* ------------------------------------------------------------
     SCROLL REVEAL
  ------------------------------------------------------------ */
  const initReveal = () => {
    const items = $$('.reveal');
    if (!items.length) return;

    items.forEach((el) => {
      const siblings = [...(el.parentElement?.children || [])].filter((child) => child.classList.contains('reveal'));
      const index = siblings.indexOf(el);
      if (index > 0) el.style.transitionDelay = `${Math.min(index, 5) * 55}ms`;
    });

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });

    items.forEach((el) => observer.observe(el));
  };

  /* ------------------------------------------------------------
     COUNT-UP NUMBERS
  ------------------------------------------------------------ */
  const initCounters = () => {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = Number(el.dataset.decimals || 0);
      if (Number.isNaN(target)) return;

      if (reduce) {
        el.textContent = decimals ? target.toFixed(decimals) : String(Math.round(target));
        return;
      }

      const duration = 1300;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = decimals ? value.toFixed(decimals) : String(Math.round(value));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(run);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .6 });

    counters.forEach((el) => observer.observe(el));
  };

  /* ------------------------------------------------------------
     SCHEDULE
  ------------------------------------------------------------ */
  const gameList = $('#gameList');
  let activeFilter = 'all';

  const gameMatches = (game) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'win') return game.w > game.l;
    if (activeFilter === 'loss') return game.w < game.l;
    if (activeFilter === 'home') return game.site === 'home';
    if (activeFilter === 'away') return game.site === 'away';
    if (activeFilter === 'league') return game.tag === 'league';
    if (activeFilter === 'postseason') return game.tag === 'gmc' || game.tag === 'state';
    return true;
  };

  const renderSchedule = () => {
    if (!gameList) return;
    const games = schedule.filter(gameMatches);

    if (!games.length) {
      gameList.innerHTML = '<p class="schedule-empty">No games match that filter.</p>';
      return;
    }

    gameList.innerHTML = games.map((game) => {
      const { month, day, weekday } = dateParts(game.date);
      const win = game.w > game.l;
      const siteMark = game.site === 'away' ? '@' : game.site === 'neutral' ? 'N' : 'VS';
      const siteClass = game.site === 'home' ? ' is-home' : game.site === 'neutral' ? ' is-neutral' : '';
      const tag = tagLabel(game.tag);
      const tagClass = game.tag === 'league' ? 'tag-league' : game.tag === 'gmc' || game.tag === 'state' ? 'tag-post' : '';
      const note = game.note
        ? `<span class="game-note"><svg aria-hidden="true"><use href="#i-star"/></svg>${game.note}</span>`
        : '';

      return `
        <article class="game${game.highlight ? ' game--highlight' : ''}" data-result="${win ? 'win' : 'loss'}" data-site="${game.site}" data-tag="${game.tag}">
          <div class="game-date" aria-label="${month} ${day}, ${weekday}">
            <span class="m">${month}</span>
            <span class="d">${day}</span>
            <span class="dw">${weekday}</span>
          </div>
          <div class="game-main">
            <span class="site-mark${siteClass}" aria-hidden="true">${siteMark}</span>
            <div class="game-opponent">
              <h3>${game.opponent}</h3>
              <div class="game-tags">
                ${tag ? `<span class="${tagClass}">${tag}</span>` : ''}
                <span>${game.site === 'home' ? 'Home' : game.site === 'away' ? 'Away' : 'Neutral'}</span>
              </div>
            </div>
          </div>
          <div class="game-score">
            <span class="wl ${win ? 'w' : 'l'}">${win ? 'W' : 'L'}</span>
            <strong>${game.w}–${game.l}</strong>
          </div>
          ${note}
        </article>
      `;
    }).join('');
  };

  const initSchedule = () => {
    if (!gameList) return;
    renderSchedule();
    $$('.filter').forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filter || 'all';
        $$('.filter').forEach((btn) => btn.classList.toggle('is-active', btn === button));
        renderSchedule();
      });
    });
  };

  /* ------------------------------------------------------------
     ROSTER
  ------------------------------------------------------------ */
  const rosterGrid = $('#rosterGrid');
  const rosterCount = $('#rosterCount');
  const rosterSearch = $('#rosterSearch');
  let rosterClass = 'all';
  let rosterPos = 'all';
  let rosterQuery = '';

  const matchesPos = (player, pos) => {
    if (pos === 'all') return true;
    const tokens = player.pos.split(',').map((token) => token.trim());
    if (pos === 'IF') return tokens.includes('IF') || tokens.includes('SS') || tokens.includes('2B') || tokens.includes('3B');
    return tokens.includes(pos);
  };

  const filteredPlayers = () => {
    const query = rosterQuery.trim().toLowerCase();
    return players.filter((player) => {
      if (rosterClass !== 'all' && player.cls !== rosterClass) return false;
      if (!matchesPos(player, rosterPos)) return false;
      if (!query) return true;
      return `${player.num} ${player.name} ${player.pos} ${player.cls}`.toLowerCase().includes(query);
    });
  };

  const renderRoster = () => {
    if (!rosterGrid) return;
    const list = filteredPlayers();

    if (rosterCount) {
      rosterCount.textContent = list.length === players.length
        ? `Showing all ${players.length} players`
        : `Showing ${list.length} of ${players.length} players`;
    }

    if (!list.length) {
      rosterGrid.innerHTML = '<p class="roster-empty">No players match those filters. Try a different class, position, or search.</p>';
      return;
    }

    rosterGrid.innerHTML = list.map((player) => `
      <button class="player-card" type="button" data-num="${player.num}">
        <span class="player-top">
          <span class="sr-only">View player profile: </span>
          <span class="player-num">${player.num}</span>
          <span class="player-class">${player.cls}</span>
        </span>
        <span class="player-name">${player.name}</span>
        <span class="player-pos">${player.pos}${player.commit ? '<span class="d1-tag">D-I</span>' : ''}</span>
        <span class="player-foot">
          <span>${size(player)}</span>
          <b>${player.cardStat || '—'}</b>
        </span>
      </button>
    `).join('');
  };

  const initRoster = () => {
    if (!rosterGrid) return;
    renderRoster();

    $$('#classFilters .chip').forEach((button) => {
      button.addEventListener('click', () => {
        rosterClass = button.dataset.class || 'all';
        $$('#classFilters .chip').forEach((chip) => chip.classList.toggle('is-active', chip === button));
        renderRoster();
      });
    });

    $$('#posFilters .chip').forEach((button) => {
      button.addEventListener('click', () => {
        rosterPos = button.dataset.pos || 'all';
        $$('#posFilters .chip').forEach((chip) => chip.classList.toggle('is-active', chip === button));
        renderRoster();
      });
    });

    if (rosterSearch) {
      rosterSearch.addEventListener('input', () => {
        rosterQuery = rosterSearch.value;
        renderRoster();
      });
    }

    rosterGrid.addEventListener('click', (event) => {
      const card = event.target.closest('.player-card');
      if (!card) return;
      openPlayer(Number(card.dataset.num), card);
    });
  };

  /* ------------------------------------------------------------
     PLAYER MODAL
  ------------------------------------------------------------ */
  const playerModal = $('#playerModal');
  const playerModalBody = $('#playerModalBody');
  let modalTrigger = null;

  const statCell = (label, value) => `<div class="pm-stat"><span>${label}</span><b>${value}</b></div>`;

  const openPlayer = (num, trigger) => {
    const player = players.find((item) => item.num === num);
    if (!player || !playerModal || !playerModalBody) return;
    modalTrigger = trigger || null;

    const batting = player.batting && player.batting.ab
      ? `
        <section class="pm-section">
          <h3>Batting · 2026</h3>
          <div class="pm-stats">
            ${statCell('AVG', avg(player.batting.avg))}
            ${statCell('SLG', avg(player.batting.slg))}
            ${statCell('AB', player.batting.ab)}
            ${statCell('H', player.batting.h)}
            ${statCell('R', player.batting.r)}
            ${statCell('RBI', player.batting.rbi)}
            ${statCell('HR', player.batting.hr)}
            ${statCell('SB', player.batting.sb)}
          </div>
        </section>`
      : '';

    const pitching = player.pitching
      ? `
        <section class="pm-section">
          <h3>Pitching · 2026</h3>
          <div class="pm-stats">
            ${statCell('W–L', `${player.pitching.w}–${player.pitching.l}`)}
            ${statCell('ERA', era(player.pitching.era))}
            ${statCell('IP', ip(player.pitching.ip))}
            ${statCell('H', player.pitching.h)}
            ${statCell('ER', player.pitching.er)}
            ${statCell('BB', player.pitching.bb)}
            ${statCell('K', player.pitching.k)}
          </div>
        </section>`
      : '';

    const noStats = !batting && !pitching
      ? '<p class="pm-empty">Season statistics were not published for this player. Roster information is via NJ.com.</p>'
      : '';

    playerModalBody.innerHTML = `
      <header class="pm-head">
        <span class="pm-num" aria-hidden="true">${player.num}</span>
        <div>
          <p class="pm-kicker">2026 Edison Eagles</p>
          <h2 class="pm-name" id="playerModalTitle">${player.name}</h2>
          <p class="pm-pos">${player.pos}</p>
          <div class="pm-badges">
            <span>${player.cls}</span>
            <span>${size(player)}</span>
            ${player.commit ? `<span class="pm-d1">${player.commit}</span>` : ''}
          </div>
        </div>
      </header>
      ${batting}
      ${pitching}
      ${player.note ? `<p class="pm-note">${player.note}</p>` : ''}
      ${noStats}
      <p class="pm-foot">Stats via NJ.com · 2026 season</p>
    `;

    if (typeof playerModal.showModal === 'function') {
      playerModal.showModal();
    } else {
      playerModal.setAttribute('open', '');
    }
  };

  const initPlayerModal = () => {
    if (!playerModal) return;
    const close = $('[data-close-modal]', playerModal);
    close?.addEventListener('click', () => playerModal.close());

    playerModal.addEventListener('click', (event) => {
      if (event.target === playerModal) playerModal.close();
    });

    playerModal.addEventListener('close', () => {
      if (modalTrigger) modalTrigger.focus();
      modalTrigger = null;
    });
  };

  /* ------------------------------------------------------------
     STATS
  ------------------------------------------------------------ */
  const renderStats = () => {
    const battingBody = $('#battingBody');
    const pitchingBody = $('#pitchingBody');
    const battingLeaders = $('#battingLeaders');
    const pitchingLeaders = $('#pitchingLeaders');

    const hitters = players
      .filter((player) => player.batting && player.batting.ab >= 20)
      .sort((a, b) => b.batting.avg - a.batting.avg);

    const pitchers = players
      .filter((player) => player.pitching && player.pitching.ip > 0)
      .sort((a, b) => a.pitching.era - b.pitching.era);

    if (battingBody) {
      battingBody.innerHTML = hitters.map((player) => `
        <tr>
          <td>
            <span class="player-cell">
              <span class="mini-num">${player.num}</span>
              <span class="mini-name">${player.name}</span>
              <span class="mini-pos">${player.pos}</span>
            </span>
          </td>
          <td>${player.batting.ab}</td>
          <td>${player.batting.h}</td>
          <td>${player.batting.r}</td>
          <td>${player.batting.rbi}</td>
          <td class="avg-cell">${avg(player.batting.avg)}</td>
          <td>${avg(player.batting.slg)}</td>
        </tr>
      `).join('');
    }

    if (pitchingBody) {
      pitchingBody.innerHTML = pitchers.map((player) => `
        <tr>
          <td>
            <span class="player-cell">
              <span class="mini-num">${player.num}</span>
              <span class="mini-name">${player.name}</span>
              <span class="mini-pos">${player.pos}</span>
            </span>
          </td>
          <td>${player.pitching.w}–${player.pitching.l}</td>
          <td>${ip(player.pitching.ip)}</td>
          <td>${player.pitching.h}</td>
          <td>${player.pitching.er}</td>
          <td>${player.pitching.bb}</td>
          <td>${player.pitching.k}</td>
          <td class="era-cell">${era(player.pitching.era)}</td>
        </tr>
      `).join('');
    }

    if (battingLeaders) {
      const avgLeader = [...hitters].sort((a, b) => b.batting.avg - a.batting.avg)[0];
      const hitLeader = [...hitters].sort((a, b) => b.batting.h - a.batting.h)[0];
      const rbiLeader = [...hitters].sort((a, b) => b.batting.rbi - a.batting.rbi)[0];
      const sbLeader = [...hitters].sort((a, b) => b.batting.sb - a.batting.sb)[0];

      battingLeaders.innerHTML = [
        ['Average', avg(avgLeader.batting.avg), avgLeader.name],
        ['Hits', hitLeader.batting.h, hitLeader.name],
        ['RBI', rbiLeader.batting.rbi, rbiLeader.name],
        ['Stolen bases', sbLeader.batting.sb, sbLeader.name]
      ].map(([label, value, name]) => `
        <div class="leader-card">
          <span class="label">${label}</span>
          <span class="value">${value}</span>
          <span class="player">${name}</span>
        </div>
      `).join('');
    }

    if (pitchingLeaders) {
      const eraLeader = [...pitchers].sort((a, b) => a.pitching.era - b.pitching.era)[0];
      const kLeader = [...pitchers].sort((a, b) => b.pitching.k - a.pitching.k)[0];
      const winLeader = [...pitchers].sort((a, b) => b.pitching.w - a.pitching.w)[0];
      const ipLeader = [...pitchers].sort((a, b) => b.pitching.ip - a.pitching.ip)[0];

      pitchingLeaders.innerHTML = [
        ['ERA', era(eraLeader.pitching.era), eraLeader.name],
        ['Strikeouts', kLeader.pitching.k, kLeader.name],
        ['Wins', winLeader.pitching.w, winLeader.name],
        ['Innings', ip(ipLeader.pitching.ip), ipLeader.name]
      ].map(([label, value, name]) => `
        <div class="leader-card">
          <span class="label">${label}</span>
          <span class="value">${value}</span>
          <span class="player">${name}</span>
        </div>
      `).join('');
    }
  };

  const initStatsTabs = () => {
    const tabs = $$('.stat-tab');
    if (!tabs.length) return;

    const activate = (tab) => {
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        if (panel) panel.hidden = !active;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const next = tabs[(index + direction + tabs.length) % tabs.length];
        next.focus();
        activate(next);
      });
    });
  };

  /* ------------------------------------------------------------
     GALLERY LIGHTBOX
  ------------------------------------------------------------ */
  const initLightbox = () => {
    const lightbox = $('#lightbox');
    const image = $('#lightboxImage');
    const caption = $('#lightboxCaption');
    if (!lightbox || !image || !caption) return;

    $$('.gallery-item').forEach((button) => {
      button.addEventListener('click', () => {
        const source = button.dataset.full;
        const label = button.dataset.caption || '';
        const inner = $('img', button);
        image.src = source || inner?.src || '';
        image.alt = inner?.alt || label;
        caption.textContent = label;
        if (typeof lightbox.showModal === 'function') lightbox.showModal();
        else lightbox.setAttribute('open', '');
      });
    });

    $('[data-close-lightbox]', lightbox)?.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  };

  /* ------------------------------------------------------------
     SCROLLSPY
  ------------------------------------------------------------ */
  const initScrollspy = () => {
    const links = $$('.main-nav a');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const map = new Map();
    links.forEach((link) => {
      const id = link.getAttribute('href')?.slice(1);
      const section = id ? document.getElementById(id) : null;
      if (section) map.set(section, link);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove('is-active'));
        map.get(entry.target)?.classList.add('is-active');
      });
    }, { rootMargin: '-38% 0px -55% 0px', threshold: 0 });

    map.forEach((_, section) => observer.observe(section));
  };

  /* ------------------------------------------------------------
     BOOT
  ------------------------------------------------------------ */
  const initYear = () => {
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  };

  const boot = () => {
    document.documentElement.dataset.booted = 'true';
    initHeader();
    initReveal();
    initCounters();
    initSchedule();
    initRoster();
    initPlayerModal();
    renderStats();
    initStatsTabs();
    initLightbox();
    initScrollspy();
    initYear();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
