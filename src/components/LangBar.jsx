import './LangBar.css';
import { useApp } from '../context';

export default function LangBar() {
  const { lang, setLang } = useApp();

  return (
    <div className="lang-bar">
      <button className={`lb${lang === 'en' ? ' on' : ''}`} onClick={() => setLang('en')}>EN</button>
      <button className={`lb${lang === 'zh' ? ' on' : ''}`} onClick={() => setLang('zh')}>中文</button>
    </div>
  );
}
