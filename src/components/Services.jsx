import { useState } from 'react'
import { View } from '@react-three/drei'
import { IconScene } from '../three/IconScene.jsx'
import { Gear } from '../three/Gear.jsx'
import { Tire } from '../three/Tire.jsx'
import { OilCan } from '../three/OilCan.jsx'
import { Battery } from '../three/Battery.jsx'
import { Shock } from '../three/Shock.jsx'
import { Wrench } from '../three/Wrench.jsx'

const SERVICES = [
  {
    id: 'engine',
    title: 'Mühərrik təmiri',
    desc: 'Kapital və cari təmir, qayış və zəncir dəyişimi, kompressiya ölçülməsi.',
    emoji: '⚙️',
    Icon: Gear,
    axis: 'z',
    tilt: [0.55, -0.35, 0],
    scale: 1.05,
  },
  {
    id: 'tire',
    title: 'Təkər və əyləc',
    desc: 'Şin dəyişimi, balans, əyləc diskləri və kolodkaların yenilənməsi.',
    emoji: '🛞',
    Icon: Tire,
    axis: 'z',
    tilt: [0.25, 0.75, 0],
    scale: 0.95,
  },
  {
    id: 'oil',
    title: 'Yağ və filtr dəyişimi',
    desc: 'Mühərrik və sürət qutusu yağı, hava, yağ və salon filtrləri — 20 dəqiqəyə.',
    emoji: '🛢️',
    Icon: OilCan,
    axis: 'y',
    tilt: [0.15, 0, 0],
    scale: 1.1,
  },
  {
    id: 'electric',
    title: 'Elektrik və diaqnostika',
    desc: 'Kompüter diaqnostikası, akkumulyator, generator və starter təmiri.',
    emoji: '🔋',
    Icon: Battery,
    axis: 'y',
    tilt: [0.3, 0, 0],
    scale: 1.05,
  },
  {
    id: 'suspension',
    title: 'Asqı və amortizator',
    desc: 'Amortizator, yastıq, dayaq və rulevoy sisteminin bərpası, sxod-razval.',
    emoji: '🔩',
    Icon: Shock,
    axis: 'y',
    tilt: [0.15, 0, 0.3],
    scale: 0.95,
  },
  {
    id: 'general',
    title: 'Ümumi təmir və baxım',
    desc: 'Planlı texniki baxış, kondisioner servisi və kiçik kuzov işləri.',
    emoji: '🔧',
    Icon: Wrench,
    axis: 'y',
    tilt: [0.2, 0, 0.55],
    scale: 1.0,
  },
]

function ServiceCard({ s, quality }) {
  const [hovered, setHovered] = useState(false)
  const Icon = s.Icon
  return (
    <article className="card" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <div className="card__icon">
        {quality.webgl ? (
          <View className="card__view">
            <IconScene hovered={hovered} reducedMotion={quality.reducedMotion} axis={s.axis} tilt={s.tilt} scale={s.scale}>
              <Icon />
            </IconScene>
          </View>
        ) : (
          <div className="card__fallback" aria-hidden="true">
            {s.emoji}
          </div>
        )}
      </div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
      <a href="#contact" className="card__link">
        Qiymət öyrən →
      </a>
    </article>
  )
}

export default function Services({ quality }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">
            <span className="dot" /> Xidmətlər
          </p>
          <h2>Bir dam altında bütün təmir işləri</h2>
          <p className="section__sub">
            Hər bir xidmət üçün sertifikatlı ustalar və müasir avadanlıq. Kartın üzərinə gəlin — obyekt canlanır.
          </p>
        </div>
        <div className="grid grid--3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} s={s} quality={quality} />
          ))}
        </div>
      </div>
    </section>
  )
}
