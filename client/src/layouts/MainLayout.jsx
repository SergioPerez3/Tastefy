import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserIcon from "../components/UserIcon";
import Footer from "../components/Footer";

function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
  <div className="app-shell">
    <nav className="main-nav">
      <Link to="/" className="nav-logo">
        <img src="/logo.png" alt="Tastefy" />
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/recipes">Despensa</NavLink>
        <NavLink to="/dashboard">Mi Cocina</NavLink>
        <NavLink to="/likes" className="nav-likes">♥ Me gusta</NavLink>
      </div>

      <div className={`nav-user ${user ? "is-online" : "is-offline"}`}>
        {user ? (
          <>
            <UserIcon />
            <span>Hola, {user.name}</span>
            <button className="nav-logout" onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <Link to="/login"><UserIcon /> ¡Entra ya!</Link>
        )}
      </div>
    </nav>
        <main>
    <Outlet />
    </main>
    <Footer />
  </div>  
);
}

export default MainLayout;
