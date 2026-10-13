import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipeService";
import RecipeCarousel from "../components/RecipeCarousel";
import { useAuth } from "../hooks/useAuth";

function HomePage() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const mostLiked = [...recipes]
    .filter((recipe) => recipe.likes.length > 0)
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 12);

  return (
    <section className="home">
      <div className="container">
        {loading && <p>Cargando recetas...</p>}
        {error && <p className="auth-error">{error}</p>}
        {!loading && !error && recipes.length === 0 && (
          <p>Todavía no hay recetas.</p>
        )}
        <section className="hero">
  <img className="hero-logo" src="/logo.png" alt="Tastefy" />
  <p className="hero-tagline">Donde las ideas se llevan a la olla</p>

  <div className="hero-actions">
    <Link to="/recipes" className="btn-tastefy">Explora recetas</Link>
    <Link to={user ? "/dashboard" : "/login"} className="btn-tastefy">Sube tu receta</Link>
  </div>
</section>

        <RecipeCarousel title="Nuevas recetas" recipes={recipes.slice(0, 12)} />
        <RecipeCarousel title="Los más gustados" recipes={mostLiked} />

        <Link to="/recipes">Ver toda la despensa</Link>
      </div>
    </section>
  );
}

export default HomePage;