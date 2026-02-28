import { useRef, useEffect, useState } from 'react';
import './Drop.css';
import T from '../i18n';
import { useApp } from '../context';

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
        card.style.transition = 'all .45s cubic-bezier(.4,0,.8,.6)';
        card.style.left = (s.left + s.width / 2 - card.offsetWidth / 2) + 'px';
        card.style.top = (s.top - card.offsetHeight / 2) + 'px';
        card.style.transform = 'scale(0.1) rotate(-4deg)';
        card.style.opacity = '0';
        if (flap) flap.style.transform = 'scaleY(1)';
        if (navigator.vibrate) navigator.vibrate([25, 15, 50]);

        // Mailbox shake
        setTimeout(() => {
          [0, 1, 2, 3].forEach((i) => {
            setTimeout(() => {
              box.style.transform = `translateX(${i % 2 ? 3 : -3}px)`;
            }, i * 55);
          });
          setTimeout(() => { box.style.transform = ''; }, 220);
        }, 380);

        setTimeout(() => {
          card.style.display = 'none';
          setScreen('done');
        }, 870);
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

      <div ref={boxRef} className="drop-box">
        <svg viewBox="0 0 200 260" fill="none">
          <rect x="88" y="200" width="24" height="56" rx="4" fill="#cc4400" />
          <rect x="20" y="80" width="160" height="130" rx="14" fill="#FF6600" />
          <ellipse cx="100" cy="80" rx="80" ry="20" fill="#e55500" />
          <rect x="35" y="100" width="130" height="90" rx="8" fill="#e55500" />
          <rect x="50" y="125" width="100" height="12" rx="6" fill="#1a1a1a" />
          <rect x="45" y="150" width="110" height="24" rx="4" fill="#fff" opacity=".15" />
          <text x="100" y="166" textAnchor="middle" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#fff" letterSpacing="1">ČESKÁ POŠTA</text>
          <circle cx="45" cy="110" r="4" fill="#cc4400" />
          <circle cx="155" cy="110" r="4" fill="#cc4400" />
          <rect x="88" y="185" width="24" height="14" rx="4" fill="#cc4400" />
          <circle cx="100" cy="185" r="5" fill="#e55500" />
          <rect
            ref={flapRef}
            x="50" y="118" width="100" height="10" rx="5" fill="#cc4400"
            style={{ transformOrigin: '100px 118px', transition: 'transform 0.2s' }}
          />
          <ellipse cx="70" cy="95" rx="20" ry="6" fill="#fff" opacity=".1" transform="rotate(-20 70 95)" />
        </svg>
        <div ref={slotRef} className="slot-hit" />
      </div>
    </div>
  );
}
