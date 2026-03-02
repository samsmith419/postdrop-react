// ViewBox 320 × 220 — horizontal wall-mount Česká pošta mailbox
export default function MailboxSVG({ className, flapRef = null }) {
  return (
    <svg className={className} viewBox="0 0 320 220" fill="none">

      {/* ── 1. OUTER METAL FRAME ── */}
      <rect x="0" y="0" width="320" height="220" rx="6" fill="#4a4a4a"/>
      {/* Inner inset body */}
      <rect x="6" y="6" width="308" height="208" rx="4" fill="#3d3d3d"/>

      {/* ── 2. UPPER GRAY SECTION ── */}
      <rect x="6" y="6" width="308" height="89" rx="4" fill="#b8b8b8"/>
      {/* Fill bottom strip to remove lower radius from gray panel */}
      <rect x="6" y="68" width="308" height="27" fill="#b8b8b8"/>

      {/* ── 3. RIGHT INFO PANEL ── */}
      <rect x="210" y="14" width="98" height="74" rx="2" fill="#d0d0d0"/>
      <text
        x="259" y="27"
        textAnchor="middle" fontFamily="Arial, sans-serif"
        fontSize="6.5" fontWeight="bold" fill="#666" letterSpacing="1.2"
      >ČESKÁ POŠTA</text>
      {/* Schedule / info lines */}
      <rect x="218" y="33" width="82" height="5" rx="1" fill="#bbb"/>
      <rect x="218" y="44" width="82" height="5" rx="1" fill="#bbb"/>
      <rect x="218" y="55" width="82" height="5" rx="1" fill="#bbb"/>
      <rect x="218" y="66" width="54" height="5" rx="1" fill="#bbb"/>
      {/* Panel inner shadow */}
      <rect x="210" y="14" width="98" height="2" rx="1" fill="rgba(0,0,0,0.06)"/>

      {/* ── 4. ČP BADGE ── */}
      <circle cx="100" cy="48" r="32" fill="#c8a000" opacity="0.15"/>
      <circle cx="100" cy="48" r="28" fill="none" stroke="#c8a000" strokeWidth="2" opacity="0.6"/>
      <text x="100" y="44" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif"
        fontSize="18" fontWeight="900" fill="#c8a000" letterSpacing="1">Č</text>
      <text x="100" y="62" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif"
        fontSize="18" fontWeight="900" fill="#c8a000" letterSpacing="1">P</text>

      {/* ── 5. SLOT METAL STRIP ── */}
      <rect x="6" y="89" width="308" height="20" fill="#5a5a5a"/>
      {/* Top edge highlight on strip */}
      <rect x="6" y="89" width="308" height="2" fill="rgba(255,255,255,0.1)"/>

      {/* Slot slit — dark background (always visible) */}
      <rect x="30" y="94" width="260" height="10" rx="2" fill="#111"/>
      {/* Bottom shadow inside slot */}
      <rect x="30" y="101" width="260" height="3" rx="1" fill="rgba(0,0,0,0.5)"/>

      {/* Flap — sits on top of slit, lifts when card is near */}
      <rect
        ref={flapRef}
        x="30" y="94" width="260" height="8" rx="2" fill="#686868"
        style={{ transformOrigin: '160px 94px', transition: 'transform 0.2s' }}
      />

      {/* Slot top highlight */}
      <rect x="30" y="94" width="260" height="2" rx="1" fill="rgba(255,255,255,0.15)"/>

      {/* ── 6. ORANGE LOWER BODY ── */}
      <rect x="6" y="109" width="308" height="105" fill="#FF5500"/>
      {/* Top edge highlight */}
      <rect x="6" y="109" width="308" height="4" fill="rgba(255,255,255,0.12)"/>
      {/* Left / right edge shadows */}
      <rect x="6"   y="109" width="5"   height="105" fill="rgba(0,0,0,0.07)"/>
      <rect x="309" y="109" width="5"   height="105" fill="rgba(0,0,0,0.07)"/>

      {/* Bottom darker band */}
      <rect x="6" y="195" width="308" height="19" fill="#cc4400"/>
      {/* Highlight at top of dark band */}
      <rect x="6" y="195" width="308" height="2" fill="rgba(255,255,255,0.08)"/>

      {/* ── 7. "POŠTA" EMBOSSED TEXT ── */}
      {/* Shadow (slightly lower, darker) */}
      <text
        x="160" y="160"
        textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif"
        fontSize="32" fontWeight="900" letterSpacing="8" fill="#bb3200"
      >POŠTA</text>
      {/* Highlight (slightly upper, lighter) */}
      <text
        x="160" y="157"
        textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif"
        fontSize="32" fontWeight="900" letterSpacing="8" fill="rgba(255,120,60,0.3)"
      >POŠTA</text>
      {/* Main */}
      <text
        x="160" y="158"
        textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif"
        fontSize="32" fontWeight="900" letterSpacing="8" fill="#e04400"
      >POŠTA</text>

      {/* ── 8. LOCK HOLE ── */}
      <circle cx="160" cy="190" r="5" fill="#3d3d3d"/>
      <rect x="157" y="190" width="6" height="8" rx="1" fill="#3d3d3d"/>

      {/* ── 9. CORNER MOUNTING SCREWS ── */}
      {[
        [20, 120], [300, 120],
        [20, 200], [300, 200],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="4" fill="#5a5a5a"/>
          <line x1={cx - 3} y1={cy}     x2={cx + 3} y2={cy}     stroke="#444" strokeWidth="1.5"/>
          <line x1={cx}     y1={cy - 3} x2={cx}     y2={cy + 3} stroke="#444" strokeWidth="1.5"/>
        </g>
      ))}

    </svg>
  );
}
