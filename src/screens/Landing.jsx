import './Landing.css';
import T from '../i18n';
import { useApp } from '../context';
import MailboxSVG from '../components/MailboxSVG';

export default function Landing() {
  const { lang, setScreen } = useApp();

  return (
    <div className="landing">
      {/* Decorative scattered dots & arcs */}
      <svg className="deco deco-tl" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5" fill="#FF6600" opacity=".35" />
        <circle cx="38" cy="6"  r="2"   fill="#FF6600" opacity=".2"  />
        <circle cx="6"  cy="42" r="2"   fill="#fff"    opacity=".1"  />
        <path d="M20 60 Q44 36 68 52" stroke="#FF6600" strokeWidth="1.2" opacity=".2" fill="none" strokeDasharray="3 5" />
      </svg>

      <svg className="deco deco-tr" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="68" cy="14" r="3"   fill="#FF6600" opacity=".3"  />
        <circle cx="48" cy="4"  r="1.8" fill="#fff"    opacity=".12" />
        <circle cx="74" cy="44" r="2.5" fill="#FF6600" opacity=".18" />
        <path d="M10 20 Q30 50 60 30" stroke="#fff" strokeWidth="1" opacity=".08" fill="none" strokeDasharray="2 6" />
      </svg>

      <svg className="deco deco-bl" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="10" cy="70" r="4"   fill="#FF6600" opacity=".2"  />
        <circle cx="30" cy="76" r="2"   fill="#fff"    opacity=".1"  />
        <path d="M4 40 Q24 60 50 50"   stroke="#FF6600" strokeWidth="1" opacity=".15" fill="none" strokeDasharray="3 4" />
      </svg>

      <svg className="deco deco-br" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="70" cy="68" r="3.5" fill="#FF6600" opacity=".25" />
        <circle cx="50" cy="76" r="2"   fill="#FF6600" opacity=".15" />
        <circle cx="76" cy="44" r="1.8" fill="#fff"    opacity=".1"  />
      </svg>

      <h1
        className="tagline"
        dangerouslySetInnerHTML={{ __html: T[lang].tagline }}
      />
      <p className="sub">{T[lang].sub}</p>
      <MailboxSVG className="mailbox-svg" />
      <button className="btn" onClick={() => setScreen('editor')}>
        {T[lang].btnWrite}
      </button>
    </div>
  );
}
