import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // Demo only: there is no backend yet. Hook this up to your API or a form service.
    setSent(true)
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div>
          <p className="eyebrow">
            <span className="dot" /> Əlaqə
          </p>
          <h2>Növbə götürün</h2>
          <p className="section__sub">Formu doldurun, 15 dəqiqə ərzində sizinlə əlaqə saxlayaq.</p>
          <ul className="contact__info">
            <li>
              <span>Ünvan</span>
              <strong>Bakı ş., Nərimanov r., Ə. Rəcəbli küç. 1</strong>
            </li>
            <li>
              <span>Telefon</span>
              <strong>
                <a href="tel:+994500000000">+994 50 000 00 00</a>
              </strong>
            </li>
            <li>
              <span>İş saatları</span>
              <strong>B.e – Şənbə, 09:00 – 19:00</strong>
            </li>
            <li>
              <span>WhatsApp</span>
              <strong>
                <a href="https://wa.me/994500000000" target="_blank" rel="noreferrer">
                  Yazın →
                </a>
              </strong>
            </li>
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit}>
          {sent ? (
            <div className="form__done" role="status">
              <strong>Təşəkkürlər!</strong>
              <p>Müraciətiniz qəbul olundu. Tezliklə sizinlə əlaqə saxlayacağıq.</p>
            </div>
          ) : (
            <>
              <label>
                Adınız
                <input name="name" type="text" placeholder="Məs: Orxan" required />
              </label>
              <label>
                Telefon
                <input name="phone" type="tel" placeholder="+994 50 ..." required />
              </label>
              <label>
                Avtomobil və problem
                <textarea name="message" rows="4" placeholder="Məs: Toyota Camry 2018, mühərrikdə səs var" />
              </label>
              <button className="btn btn--primary" type="submit">
                Göndər
              </button>
              <p className="form__note">Formu göndərməklə sizinlə əlaqə saxlamağımıza razılıq verirsiniz.</p>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
