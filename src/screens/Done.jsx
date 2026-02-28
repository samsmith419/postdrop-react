import './Done.css';
import T from '../i18n';
import { useApp } from '../context';

export default function Done() {
  const { lang, reset } = useApp();

  return (
    <div className="done-screen">
      <div className="done-icon">🎉</div>
      <h2 className="done-title">{T[lang].doneTitle}</h2>
      <p className="done-sub">{T[lang].doneSub}</p>

      <div className="info-card">
        <div className="info-row">
          <span className="ico">📍</span>
          <div>
            <div>{T[lang].sentFrom}</div>
            <div className="info-label">{T[lang].sentFromSub}</div>
          </div>
        </div>
        <div className="info-row">
          <span className="ico">📅</span>
          <div>
            <div>{T[lang].eta}</div>
            <div className="info-label">{T[lang].etaSub}</div>
          </div>
        </div>
        <div className="info-row">
          <span className="ico">🟠</span>
          <div>
            <div>{T[lang].proc}</div>
            <div className="info-label">{T[lang].procSub}</div>
          </div>
        </div>
      </div>

      <button className="btn" onClick={reset}>
        {T[lang].btnAgain}
      </button>
    </div>
  );
}
