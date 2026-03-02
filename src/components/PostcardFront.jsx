import { useRef } from 'react';
import T from '../i18n';
import { useApp } from '../context';

export default function PostcardFront({ onFlipOut, animClass }) {
  const { lang, photoDataUrl, setPhotoDataUrl } = useApp();
  const fileInputRef = useRef(null);

  function handlePhotoClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoDataUrl(ev.target.result);
      setTimeout(() => onFlipOut && onFlipOut(), 350);
    };
    reader.readAsDataURL(f);
  }

  return (
    <>
      <div
        className={`pc-face pc-front ${animClass}`}
        onClick={handlePhotoClick}
      >
        {/* feTurbulence paper noise overlay */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 1, opacity: 0.055,
          }}
        >
          <filter id="paper-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-noise)" />
        </svg>

        {/* Photo corner marks (remaining two via JSX) */}
        <span className="pc-corner-tr" aria-hidden="true" />
        <span className="pc-corner-bl" aria-hidden="true" />

        {photoDataUrl ? (
          <img className="photo" src={photoDataUrl} alt="" />
        ) : (
          <div className="pc-photo-hint">
            <div className="cam-frame">
              {/* SVG camera icon */}
              <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
                <rect x="1" y="5" width="24" height="16" rx="2.5" stroke="rgba(80,55,25,0.7)" strokeWidth="1.5" />
                <circle cx="13" cy="13" r="4" stroke="rgba(80,55,25,0.7)" strokeWidth="1.5" />
                <path d="M9 5 L10.5 2 H15.5 L17 5" stroke="rgba(80,55,25,0.7)" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="21" cy="9" r="1" fill="rgba(80,55,25,0.5)" />
              </svg>
            </div>
            <span className="lbl">{T[lang].photoLabel}</span>
          </div>
        )}

        {photoDataUrl && (
          <button
            className="pc-retake"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
          >
            {T[lang].retake}
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}
