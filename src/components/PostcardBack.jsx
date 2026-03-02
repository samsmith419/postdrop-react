import T from '../i18n';
import { useApp } from '../context';

export default function PostcardBack({ animClass }) {
  const { lang, message, setMessage, recipientName, setRecipientName, recipientCity, setRecipientCity } = useApp();

  return (
    <div className={`pc-face pc-back ${animClass}`}>
      <div className="pc-stripe" />
      <div className="pc-content">
        <div className="pc-stamp">🇨🇿<small>CZ</small></div>
        <textarea
          maxLength={150}
          placeholder={T[lang].msgPh}
          value={message}
          onChange={(e) => {
            const lines = e.target.value.split('\n');
            if (lines.length > 4) return;
            if (e.target.value.length > 150) return;
            setMessage(e.target.value);
          }}
        />
        <div className="pc-counter"><span>{message.length}</span>/150</div>
        <div className="pc-to">
          <input
            placeholder={T[lang].toName}
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
          <input
            placeholder={T[lang].toCity}
            value={recipientCity}
            onChange={(e) => setRecipientCity(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
