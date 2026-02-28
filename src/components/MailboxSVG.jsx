export default function MailboxSVG({ className, showFlap = false, flapRef = null }) {
  return (
    <svg className={className} viewBox="0 0 200 260" fill="none">
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
  );
}
