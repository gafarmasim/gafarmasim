const STEPS = [
  {
    n: '01',
    title: 'Diaqnostika',
    desc: 'Kompüter diaqnostikası və ustanın baxışı ilə nasazlığı dəqiq müəyyən edirik.',
  },
  {
    n: '02',
    title: 'Şəffaf qiymət',
    desc: 'İşə başlamazdan əvvəl ehtiyat hissələri və işin qiymətini sizinlə razılaşdırırıq.',
  },
  {
    n: '03',
    title: 'Təmir və test',
    desc: 'Təmirdən sonra test sürüşü keçirib avtomobili zəmanətlə təhvil veririk.',
  },
]

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">
            <span className="dot" /> Necə işləyirik
          </p>
          <h2>Üç addımda yola qayıdın</h2>
        </div>
        <ol className="steps">
          {STEPS.map((s) => (
            <li className="step" key={s.n}>
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
