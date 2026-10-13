import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <section className="info-section">
      <div className="container">
        <div className="info-card">
          <h1>Sobre nosotros</h1>

          <p>
            Tastefy es una red social de recetas donde cualquiera puede
            compartir sus platos, descubrir ideas nuevas y guardar sus favoritas.
          </p>
          <p>
            Nació como un proyecto personal de desarrollo full-stack, creado con
            React, Node, Express y MongoDB, con la idea de que cocinar y
            compartir sea tan fácil como dar a un botón.
          </p>

          <h2>¿Qué puedes hacer aquí?</h2>
          <ul>
            <li>Explorar recetas en la Despensa, con filtros y orden.</li>
            <li>Subir tus propias recetas desde Mi Cocina.</li>
            <li>Dar me gusta y volver a tus platos favoritos cuando quieras.</li>
          </ul>

          <Link className="btn" to="/recipes">
            Explora recetas
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;