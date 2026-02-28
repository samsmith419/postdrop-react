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
      // Auto-flip to back after photo selected
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
        {photoDataUrl ? (
          <img className="photo" src={photoDataUrl} alt="" />
        ) : (
          <div className="pc-photo-hint">
            <span className="cam">📷</span>
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
