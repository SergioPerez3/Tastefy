import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Por ahora no se envía a ningún sitio
    setMessage("¡Gracias! Hemos recibido tu mensaje.");
    setForm(initialForm);
  };

  return (
    <section className="auth-section">
      <div className="container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Contacto</h1>

          {message && <p className="auth-message">{message}</p>}

          <div className="form-group">
            <label htmlFor="name">Nombre: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje: </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;