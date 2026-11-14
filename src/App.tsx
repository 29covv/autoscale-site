import { useEffect, useRef } from 'react';
import { siteHtml } from './siteHtml';
import './App.css';

/** AutoScale Systems: slim sticky navigation and one-time brand banner. */
export default function App() {
  const siteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const site = siteRef.current;
    if (!site) return;
    document.title = 'AutoScale Systems | AI for UK Commercial Mortgage Brokers';

    const header = site.querySelector<HTMLElement>('.banner-sticky-header');
    const links = Array.from(site.querySelectorAll<HTMLAnchorElement>('.section-link'));
    const targets = links
      .map(link => site.querySelector<HTMLElement>(link.getAttribute('href') || ''))
      .filter((target): target is HTMLElement => Boolean(target));

    // Calendly's JavaScript embed supports automatic height changes as the
    // visitor moves from choosing a time to entering booking details.
    const bookingHost = site.querySelector<HTMLElement>('#autoscale-calendly-embed');
    const calendlyScriptUrl = 'https://assets.calendly.com/assets/external/widget.js';
    const calendlyWindow = window as typeof window & {
      Calendly?: {
        initInlineWidget: (options: {
          url: string;
          parentElement: HTMLElement;
          resize: boolean;
        }) => void;
      };
    };
    let bookingActive = true;
    const initialiseBooking = () => {
      if (!bookingActive || !bookingHost || !calendlyWindow.Calendly) return;
      if (bookingHost.querySelector('iframe')) return;
      calendlyWindow.Calendly.initInlineWidget({
        url: 'https://calendly.com/demo-autoscalesystems/30min',
        parentElement: bookingHost,
        resize: true,
      });
    };
    let calendlyScript = document.querySelector<HTMLScriptElement>('script[data-autoscale-calendly]');
    if (calendlyWindow.Calendly) {
      initialiseBooking();
    } else {
      if (!calendlyScript) {
        calendlyScript = document.createElement('script');
        calendlyScript.src = calendlyScriptUrl;
        calendlyScript.async = true;
        calendlyScript.dataset.autoscaleCalendly = 'true';
        document.body.appendChild(calendlyScript);
      }
      calendlyScript.addEventListener('load', initialiseBooking);
    }

    const year = site.querySelector<HTMLElement>('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    const updateHeaderHeight = () => {
      if (!header) return;
      document.documentElement.style.setProperty(
        '--sticky-header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`
      );
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight, { passive: true });
    const logo = header?.querySelector<HTMLImageElement>('.autoscale-sticky-brand img');
    logo?.addEventListener('load', updateHeaderHeight);

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        links.forEach(link => link.classList.toggle('active', link.hash === '#' + visible.target.id));
      }
    }, { rootMargin: '-22% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] });
    targets.forEach(target => observer.observe(target));

    return () => {
      bookingActive = false;
      calendlyScript?.removeEventListener('load', initialiseBooking);
      bookingHost?.replaceChildren();
      observer.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
      logo?.removeEventListener('load', updateHeaderHeight);
    };
  }, []);

  // The page HTML is bundled as trusted static first-party content.
  return <div ref={siteRef} dangerouslySetInnerHTML={{ __html: siteHtml }} />;
}
