import { useState, useRef } from 'react';
import './Editor.css';
import T from '../i18n';
import { useApp } from '../context';
import PostcardFront from '../components/PostcardFront';
import PostcardBack from '../components/PostcardBack';

export default function Editor() {
  const { lang, setScreen } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontAnim, setFrontAnim] = useState('');
  const [backAnim, setBackAnim] = useState('hidden');
  const flipping = useRef(false);

  function flipCard() {
    if (flipping.current) return;
    flipping.current = true;

    const outAnim = isFlipped ? 'flip-out' : 'flip-out';
    const inEl = isFlipped ? 'front' : 'back';

    if (isFlipped) {
      setBackAnim('flip-out');
    } else {
      setFrontAnim('flip-out');
    }

    setTimeout(() => {
      if (isFlipped) {
        setBackAnim('hidden');
        setFrontAnim('flip-in');
        setTimeout(() => { setFrontAnim(''); flipping.current = false; }, 200);
      } else {
        setFrontAnim('hidden');
        setBackAnim('flip-in');
        setTimeout(() => { setBackAnim(''); flipping.current = false; }, 200);
      }
      setIsFlipped(f => !f);
    }, 180);
  }

  // Swipe to flip
  const swipeStartX = useRef(0);
  function onTouchStart(e) {
    swipeStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (Math.abs(e.changedTouches[0].clientX - swipeStartX.current) > 50) {
      flipCard();
    }
  }

  function handleOpenDrop() {
    setScreen('drop');
  }

  return (
    <div className="editor">
      <h2 className="editor-title">{T[lang].editorTitle}</h2>

      <div
        className="pc-scene"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <PostcardFront animClass={frontAnim} onFlipOut={flipCard} />
        <PostcardBack animClass={backAnim} />
      </div>

      <button className="flip-pill" onClick={flipCard}>
        {T[lang][isFlipped ? 'flipToFront' : 'flipToBack']}
      </button>

      <button className="btn" style={{ marginTop: 18 }} onClick={handleOpenDrop}>
        {T[lang].btnDrop}
      </button>
      <button className="btn btn-ghost" onClick={() => setScreen('landing')}>
        {T[lang].btnBack}
      </button>
    </div>
  );
}
