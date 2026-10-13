import { useRef, useState } from 'react'
import { View } from '@react-three/drei'
import { HeroScene } from '../three/HeroScene.jsx'

function StaticCar() {
  // Fallback illustration when WebGL is unavailable.
  return (
    <svg className="stage__fallback" viewBox="0 0 320 180" role="img" aria-label="Avtomobil illüstrasiyası">
      <ellipse cx="160" cy="150" rx="120" ry="12" fill="rgba(255,122,26,0.25)" />
      <path d="M60 120h200l-12-32H98l-18 20z" fill="#ff7a1a" />
      <path d="M105 88l20-26h70l24 26z" fill="#18283a" />
      <rect x="50" y="118" width="220" height="18" rx="6" fill="#2a2f37" />
      <circle cx="105" cy="138" r="18" fill="#15171a" />
      <circle cx="105" cy="138" r="9" fill="#d3d8df" />
      <circle cx="215" cy="138" r="18" fill="#15171a" />
      <circle cx="215" cy="138" r="9" fill="#d3d8df" />
    </svg>
  )
}

export default function Hero({ quality, glReady }) {
  const control = useRef({ dragging: false, lastX: 0, rotation: 0, velocity: 0, px: 0, py: 0 })
  const [dragging, setDragging] = useState(false)

  const onPointerDown = (e) => {
    const c = control.current
    c.dragging = true
    c.lastX = e.clientX
    c.velocity = 0
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setDragging(true)
  }

  const onPointerMove = (e) => {
    const c = control.current
    const r = e.currentTarget.getBoundingClientRect()
    c.px = ((e.clientX - r.left) / r.width) * 2 - 1
    c.py = ((e.clientY - r.top) / r.height) * 2 - 1
    if (c.dragging) {
      const dx = e.clientX - c.lastX
      c.lastX = e.clientX
      c.rotation += dx * 0.008
      c.velocity = dx * 0.008
    }
  }

  const endDrag = () => {
    const c = control.current
    if (c.dragging) {
      c.dragging = false
      setDragging(false)
    }
  }

  const onPointerLeave = () => {
    endDrag()
    control.current.px = 0
    control.current.py = 0
  }

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">
            <span className="dot" /> Peşəkar avtoservis · Bakı
          </p>
          <h1>
            Maşınınız <span className="accent">etibarlı</span> əllərdədir
          </h1>
          <p className="lead">
            Mühərrikdən əyləcə qədər — müasir kompüter diaqnostikası və 12 illik təcrübə ilə avtomobilinizi
            eyni gün yola qaytarırıq.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#contact">
              Növbə götür
            </a>
            <a className="btn btn--ghost" href="#services">
              Xidmətlərə bax
            </a>
          </div>
          <ul className="hero__trust">
            <li>Zəmanətli təmir</li>
            <li>Orijinal ehtiyat hissələri</li>
            <li>Eyni gün diaqnostika</li>
          </ul>
        </div>

        <div
          className={`stage ${dragging ? 'is-dragging' : ''}`}
          onPointerDown={quality.webgl ? onPointerDown : undefined}
          onPointerMove={quality.webgl ? onPointerMove : undefined}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={onPointerLeave}
        >
          {quality.webgl ? (
            <View className="stage__view">
              <HeroScene control={control} quality={quality} />
            </View>
          ) : (
            <StaticCar />
          )}

          {quality.webgl && !glReady && (
            <div className="stage__loader" role="status">
              <span className="spinner" aria-hidden="true" />
              3D səhnə yüklənir…
            </div>
          )}

          {quality.webgl && (
            <div className="stage__hint" aria-hidden="true">
              <span>⟲</span> Sürüşdürərək fırladın
            </div>
          )}
          <div className="stage__badge">
            <strong>12+</strong> il təcrübə
          </div>
        </div>
      </div>
    </section>
  )
}
