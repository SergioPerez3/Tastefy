import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo.png" alt="Tastefy" />
          <p>Donde las ideas se llevan a la olla</p>
        </div>

        <div className="footer-col">
          <h4>Explora</h4>
          <Link to="/">Home</Link>
          <Link to="/recipes">Despensa</Link>
          <Link to="/dashboard">Mi Cocina</Link>
          <Link to="/likes">Me gusta</Link>
        </div>

        <div className="footer-col">
          <h4>Tastefy</h4>
          <Link to="/about">Sobre nosotros</Link>
          <Link to="/contact">Contacto</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Tastefy. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;