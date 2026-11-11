import { useEffect, useRef, type FormEvent } from 'react';
import { siteHtml } from './siteHtml';
import './App.css';

/** Seven-section, banner-first AutoScale Systems website. */
export default function App() {
  const siteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const site = siteRef.current;
    if (!site) return;
    document.title = 'AutoScale Systems | AI for UK Commercial Mortgage Brokers';
    const header = site.querySelector<HTMLElement>('.banner-sticky-header');
    const links = Array.from(site.querySelectorAll<HTMLAnchorElement>('.section-link'));
    const targets = links.map(link => site.querySelector<HTMLElement>(link.getAttribute('href') || '')).filter((x): x is HTMLElement => Boolean(x));
    // Simplified footer for the commercial mortgage broker website.
    // The existing siteHtml.ts content and every other section remain unchanged.
    const footer = site.querySelector<HTMLElement>('footer');
    if (footer) {
      footer.classList.add('autoscale-clean-footer');
      footer.innerHTML = `
        <div class="autoscale-footer-layout">
          <a class="autoscale-footer-brand" href="#home" aria-label="AutoScale Systems homepage">
            AutoScale <span>Systems</span>
          </a>
          <div class="autoscale-footer-meta">
            <a href="/privacy-policy.html">Privacy Policy</a>
            <small>© <span id="year"></span> AutoScale Systems. All rights reserved.</small>
          </div>
        </div>`;
    }
    const year = site.querySelector<HTMLElement>('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    const updateHeaderHeight = () => {
      if (!header) return;
      document.documentElement.style.setProperty('--sticky-header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight, { passive: true });
    header?.querySelector('img')?.addEventListener('load', updateHeaderHeight);

    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) links.forEach(link => link.classList.toggle('active', link.hash === '#' + visible.target.id));
    }, { rootMargin: '-22% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] });
    targets.forEach(target => observer.observe(target));
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
      header?.querySelector('img')?.removeEventListener('load', updateHeaderHeight);
    };
  }, []);

  const handleFormSubmit = (event: FormEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLFormElement) || target.id !== 'contactForm') return;
    event.preventDefault();
    if (!target.reportValidity()) return;
    const data = new FormData(target);
    const subject = 'AutoScale Systems – demo booking request';
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nBrokerage: ${data.get('company') || 'Not supplied'}\n\nMain challenge:\n${data.get('challenge')}\n\nPlease contact me to arrange a demo.`;
    window.location.href = `mailto:hello@autoscalesystems.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // This is first-party static site markup, never untrusted user input.
  return (
    <>
      <style>{`
        footer.autoscale-clean-footer {
          background: #071535 !important;
          color: #fff !important;
          padding: 30px 24px !important;
          border: 0 !important;
        }
        .autoscale-clean-footer .autoscale-footer-layout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
          width: min(1200px, 100%);
          margin: 0 auto;
        }
        .autoscale-clean-footer .autoscale-footer-brand {
          color: #fff !important;
          font-size: 19px;
          font-weight: 800;
          text-decoration: none !important;
          white-space: nowrap;
        }
        .autoscale-clean-footer .autoscale-footer-brand span { color: #38bdf8 !important; }
        .autoscale-clean-footer .autoscale-footer-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 22px;
        }
        .autoscale-clean-footer .autoscale-footer-meta a,
        .autoscale-clean-footer .autoscale-footer-meta small {
          color: #cbd5e1 !important;
          font-size: 13px;
          font-weight: 400;
          text-decoration: none;
          margin: 0;
        }
        .autoscale-clean-footer .autoscale-footer-meta a:hover,
        .autoscale-clean-footer .autoscale-footer-meta a:focus-visible {
          color: #fff !important;
          text-decoration: underline;
        }
        @media (max-width: 650px) {
          .autoscale-clean-footer .autoscale-footer-layout,
          .autoscale-clean-footer .autoscale-footer-meta {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
      <div ref={siteRef} onSubmit={handleFormSubmit} dangerouslySetInnerHTML={{ __html: siteHtml }} />
    </>
  );
}
