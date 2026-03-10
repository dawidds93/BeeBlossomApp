export default function AnnouncementBar() {
  return (
    <div
      className="py-2 text-center text-xs font-medium tracking-widest uppercase"
      style={{ backgroundColor: 'var(--brown)', color: '#ffffff' }}
      role="banner"
    >
      <p className="text-white" style={{ color: '#ffffff' }}>
        🐝 Darmowa dostawa od 150 zł&nbsp;&nbsp;·&nbsp;&nbsp;Ręcznie robione z naturalnego wosku
        pszczelego
      </p>
    </div>
  )
}
