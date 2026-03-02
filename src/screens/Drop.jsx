import { useRef, useEffect, useState } from 'react';
import './Drop.css';
import T from '../i18n';
import { useApp } from '../context';
import MailboxSVG from '../components/MailboxSVG';

export default function Drop() {
  const { lang, photoDataUrl, recipientName, setScreen } = useApp();
  const cardRef = useRef(null);
  const boxRef = useRef(null);
  const slotRef = useRef(null);
  const flapRef = useRef(null);
  const [isNear, setIsNear] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const box = boxRef.current;
    const slot = slotRef.current;
    const flap = flapRef.current;

    let ox = 0, oy = 0, dragging = false, dropped = false;

    function ptOf(e) {
      return e.touches ? e.touches[0] : e;
    }

    function slotRect() {
      return slot.getBoundingClientRect();
    }

    function cardCenter() {
      const r = card.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }

    function nearSlot() {
      const s = slotRect(), c = cardCenter();
      return (
        c.y > s.top - 50 && c.y < s.bottom + 70 &&
        c.x > s.left - 70 && c.x < s.right + 70
      );
    }

    function onStart(e) {
      if (dropped) return;
      e.preventDefault();
      dragging = true;
      setIsDragging(true);
      const pt = ptOf(e);
      const r = card.getBoundingClientRect();
      ox = pt.clientX - r.left - r.width / 2;
      oy = pt.clientY - r.top - r.height / 2;

    }

    function onMove(e) {
      if (!dragging || dropped) return;
      e.preventDefault();
      const pt = ptOf(e);
      card.style.position = 'fixed';
      card.style.left = (pt.clientX - ox - card.offsetWidth / 2) + 'px';
      card.style.top = (pt.clientY - oy - card.offsetHeight / 2) + 'px';
      card.style.margin = '0';
      card.style.zIndex = '100';
      const n = nearSlot();
      box.classList.toggle('glow', n);
      if (flap) flap.style.transform = n ? 'scaleY(0.15)' : '';
      setIsNear(n);
    }

    function onEnd() {
      if (!dragging || dropped) return;
      dragging = false;
      setIsDragging(false);
      if (nearSlot()) {
        dropped = true;
        const s = slotRect();
        if (navigator.vibrate) navigator.vibrate([25, 15, 50]);
        if (flap) flap.style.transform = 'scaleY(0.1)';

        // Stop pulse
        box.style.animation = 'none';

        const slotCenterX = s.left + s.width / 2;
        const slotCenterY = s.top + s.height / 2;

        // Phase 1: slide to align with slot center + begin tilting flat (rotateX)
        card.style.transition = 'left 0.35s ease-out, top 0.35s ease-out, transform 0.45s cubic-bezier(0.4,0,0.55,1)';
        card.style.transformOrigin = 'center center';
        card.style.left = (slotCenterX - card.offsetWidth / 2) + 'px';
        card.style.top = (slotCenterY - card.offsetHeight / 2) + 'px';
        card.style.transform = 'perspective(700px) rotateX(72deg) scale(0.92)';
        card.style.opacity = '1';

        // Phase 2: fully flat + slide into slot (depth via scale + opacity)
        setTimeout(() => {
          card.style.transition = 'transform 0.32s ease-in, opacity 0.28s ease-in';
          card.style.transform = 'perspective(700px) rotateX(90deg) scale(0.82)';
          card.style.opacity = '0';
        }, 430);

        setTimeout(() => {
          card.style.display = 'none';
          setScreen('done');
        }, 1050);
      } else {
        // Snap back
        card.style.transition = 'all .4s cubic-bezier(.175,.885,.32,1.275)';
        card.style.position = '';
        card.style.left = '';
        card.style.top = '';
        card.style.margin = '';
        card.style.zIndex = '';
        setTimeout(() => { card.style.transition = ''; }, 400);
        box.classList.remove('glow');
        if (flap) flap.style.transform = '';
        setIsNear(false);

      }
    }

    card.addEventListener('mousedown', onStart);
    card.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);

    return () => {
      card.removeEventListener('mousedown', onStart);
      card.removeEventListener('touchstart', onStart);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchend', onEnd);
    };
  }, [setScreen]);

  return (
    <div className="drop-screen">
      <p className={`drop-hint${isNear ? ' near' : ''}`}>
        {isNear ? T[lang].dropNear : T[lang].dropHint}
      </p>

      <div ref={cardRef} className={`drag-card${isDragging ? ' dragging' : ''}`}>
        <div className="dc-photo">
          {photoDataUrl
            ? <img src={photoDataUrl} alt="" />
            : <div className="no-ph">📷</div>
          }
        </div>
        <div className="dc-right">
          <div className="dc-stamp">🇨🇿</div>
          <div className="dc-lines" />
          <div className="dc-addr">{recipientName}</div>
        </div>
      </div>

      <div className={`drop-arrow${isDragging || isNear ? ' hidden' : ''}`} aria-hidden="true">↓</div>

      <div className="mailbox-wrapper">
      <div ref={boxRef} className="drop-box">
        <MailboxSVG flapRef={flapRef} />
        <div ref={slotRef} className="slot-hit" />
      </div>
      </div>
    </div>
  );
}
