export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} AvtoUsta. Bütün hüquqlar qorunur.</p>
        <nav aria-label="Footer naviqasiyası">
          <a href="#services">Xidmətlər</a>
          <a href="#process">Necə işləyirik</a>
          <a href="#contact">Əlaqə</a>
        </nav>
      </div>
    </footer>
  )
}
