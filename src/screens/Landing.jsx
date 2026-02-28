import './Landing.css';
import T from '../i18n';
import { useApp } from '../context';
import MailboxSVG from '../components/MailboxSVG';

export default function Landing() {
  const { lang, setScreen } = useApp();

  return (
    <div className="landing">
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
