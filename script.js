* {
  box-sizing: border-box;
}

:root {
  --bg: #0d1117;
  --bg-soft: #171d28;
  --panel: rgba(22, 27, 38, 0.8);
  --panel-strong: #1c2634;
  --gold: #f3c66b;
  --gold-soft: #f9e2a1;
  --terracotta: #d77b5d;
  --rose: #f4b7ad;
  --green: #7da57c;
  --text: #edf2f7;
  --muted: #b7c0cc;
  --line: rgba(255, 255, 255, 0.1);
  --shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at top, rgba(243, 198, 107, 0.14), transparent 35%),
    linear-gradient(180deg, var(--bg) 0%, #101821 100%);
  color: var(--text);
  line-height: 1.6;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

.container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(12px);
  background: rgba(13, 17, 23, 0.7);
  border-bottom: 1px solid var(--line);
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 700;
}

.brand-mark {
  width: 2.1rem;
  height: 2.1rem;
  display: inline-grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--gold), var(--terracotta));
  color: #111;
  font-family: "Cormorant Garamond", serif;
  font-size: 1.6rem;
  font-weight: 700;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--muted);
  font-size: 0.96rem;
}

.main-nav a {
  transition: color 0.2s ease;
}

.main-nav a:hover,
.main-nav a:focus-visible {
  color: var(--text);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.9rem 1.4rem;
  font-weight: 700;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.btn:hover,
.btn:focus-visible {
  transform: translateY(-1px);
  filter: brightness(1.04);
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold), var(--terracotta));
  color: #1b120d;
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: var(--text);
}

.hero {
  padding: 5rem 0 3rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 3rem;
}

.eyebrow {
  margin: 0 0 0.7rem;
  color: var(--gold-soft);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  margin-top: 0;
  line-height: 1.08;
}

h1,
h2 {
  font-family: "Cormorant Garamond", serif;
  font-weight: 700;
  letter-spacing: -0.03em;
}

h1 {
  font-size: clamp(3.2rem, 6vw, 5.5rem);
  max-width: 12ch;
}

h2 {
  font-size: clamp(2.4rem, 3vw, 3.5rem);
  margin-bottom: 0.6rem;
}

.lead {
  max-width: 58ch;
  color: var(--muted);
  font-size: 1.06rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
}

.hero-metrics {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 0;
  margin: 2rem 0 0;
}

.hero-metrics li {
  min-width: 140px;
  padding-right: 1rem;
  border-right: 1px solid var(--line);
}

.hero-metrics li:last-child {
  border-right: 0;
}

.hero-metrics strong {
  display: block;
  font-size: clamp(1.4rem, 2vw, 2rem);
  margin-bottom: 0.1rem;
}

.hero-metrics span {
  color: var(--muted);
  font-size: 0.9rem;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.visual-card {
  position: relative;
  width: min(100%, 420px);
  min-height: 520px;
  padding: 1.5rem;
  background: linear-gradient(180deg, rgba(31, 40, 52, 0.96), rgba(18, 25, 33, 0.86));
  border: 1px solid var(--line);
  border-radius: 28px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  inset: auto -40px -40px auto;
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, rgba(243, 198, 107, 0.38), transparent 62%);
  filter: blur(4px);
}

.mini-stat {
  position: relative;
  z-index: 1;
  width: fit-content;
  background: rgba(12, 15, 19, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 0.6rem 0.9rem;
}

.mini-stat span {
  display: block;
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.mini-stat strong {
  font-size: 1.1rem;
}

.portrait-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2.25rem;
  height: 360px;
}

.portrait {
  border-radius: 24px;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.portrait-one {
  background: linear-gradient(135deg, rgba(243, 198, 107, 0.45), rgba(101, 71, 48, 0.8)),
    url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80') center/cover;
}

.portrait-two {
  background: linear-gradient(135deg, rgba(215, 123, 93, 0.3), rgba(27, 24, 29, 0.72)),
    url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80') center/cover;
}

.portrait-three {
  background: linear-gradient(135deg, rgba(125, 165, 124, 0.28), rgba(18, 28, 29, 0.8)),
    url('https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80') center/cover;
  grid-column: span 2;
}

.intro-band {
  padding-bottom: 2.5rem;
}

.mini-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.mini-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.3rem 1.2rem;
}

.label {
  display: block;
  color: var(--gold-soft);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  margin-bottom: 0.4rem;
}

.section {
  padding: 5rem 0;
}

.alt {
  background: rgba(255, 255, 255, 0.015);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.two-col {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 2rem;
  align-items: start;
}

.section-copy p,
.section-body p,
.community-copy p,
.resource-card p,
.story-content p,
.timeline-item p,
.event-list p {
  color: var(--muted);
}

.section-heading {
  max-width: 760px;
  margin-bottom: 2rem;
}

.story-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.filter-btn {
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn.active,
.filter-btn:hover {
  background: rgba(243, 198, 107, 0.12);
  border-color: rgba(243, 198, 107, 0.5);
  color: var(--text);
}

.story-grid,
.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.story-card,
.resource-card {
  background: rgba(16, 22, 30, 0.88);
  border: 1px solid var(--line);
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.story-card:hover,
.resource-card:hover {
  transform: translateY(-3px);
  border-color: rgba(243, 198, 107, 0.4);
}

.story-image {
  height: 220px;
  background-size: cover;
  background-position: center;
}

.story-one {
  background: linear-gradient(180deg, rgba(31, 35, 28, 0.15), rgba(10, 12, 12, 0.65)),
    url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80') center/cover;
}

.story-two {
  background: linear-gradient(180deg, rgba(31, 35, 28, 0.18), rgba(14, 12, 16, 0.62)),
    url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80') center/cover;
}

.story-three {
  background: linear-gradient(180deg, rgba(31, 35, 28, 0.18), rgba(10, 12, 12, 0.65)),
    url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80') center/cover;
}

.story-content {
  padding: 1.3rem 1.2rem 1.5rem;
}

.tag {
  display: inline-flex;
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  background: rgba(243, 198, 107, 0.12);
  color: var(--gold-soft);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
}

.timeline {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 1.5rem;
  align-items: start;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.2rem 1.4rem;
}

.year {
  color: var(--gold-soft);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-top: 0.3rem;
}

.community-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 2rem;
  align-items: center;
}

.event-list {
  display: grid;
  gap: 1rem;
}

.event-list article {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1rem;
  background: rgba(17, 22, 29, 0.85);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1rem 1.2rem;
}

.date {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 62px;
  padding: 0.7rem;
  border-radius: 14px;
  background: rgba(243, 198, 107, 0.1);
  color: var(--gold-soft);
  font-weight: 700;
}

.resource-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.resource-card {
  padding: 1.35rem 1.15rem;
}

.resource-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.7rem;
}

.cta-section {
  padding-top: 2rem;
}

.cta-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(243, 198, 107, 0.1), rgba(215, 123, 93, 0.08));
  padding: 2rem 2.2rem;
}

.site-footer {
  border-top: 1px solid var(--line);
  padding: 2rem 0 3rem;
}

.footer-wrap {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--muted);
  font-size: 0.95rem;
}

.hidden {
  display: none !important;
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 900px) {
  .hero-grid,
  .two-col,
  .community-grid,
  .story-grid,
  .resource-grid,
  .mini-grid {
    grid-template-columns: 1fr;
  }

  .main-nav {
    display: none;
  }

  .story-grid,
  .resource-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cta-wrap,
  .footer-wrap {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 560px) {
  .nav-wrap {
    flex-wrap: wrap;
    padding: 0.9rem 0;
  }

  .hero {
    padding-top: 3.5rem;
  }

  .visual-card {
    min-height: 420px;
  }

  .story-grid,
  .resource-grid {
    grid-template-columns: 1fr;
  }

  .timeline-item,
  .event-list article {
    grid-template-columns: 1fr;
  }
}
