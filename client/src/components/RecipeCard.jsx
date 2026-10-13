import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

function RecipeCard({ recipe, onLikeChange }) {
  const ingredients = (recipe.ingredients || "")
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean);
  const visible = ingredients.slice(0, 3);
  const extra = ingredients.length - visible.length;

  return (
    <article className="recipe-card">
      {recipe.image ? (
        <img className="rc-img" src={recipe.image} alt={recipe.title} />
      ) : (
        <div className="rc-img rc-placeholder">🍽️</div>
      )}

      <Link
        to={`/recipes/${recipe._id}`}
        className="rc-link"
        aria-label={`Ver ${recipe.title}`}
      />

      <span className="rc-badge">{recipe.category}</span>

      <div className="rc-like">
        <LikeButton
          recipeId={recipe._id}
          initialLikes={recipe.likes}
          onChange={(likes) => onLikeChange?.(recipe._id, likes)}
        />
      </div>

      <div className="rc-panel">
        <h3 className="rc-title">{recipe.title}</h3>
        <p className="rc-desc">{recipe.description}</p>
        <ul className="rc-chips">
          {visible.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
          {extra > 0 && <li className="rc-more">+{extra}</li>}
        </ul>

        <div className="rc-meta">
          <span>⏱ {recipe.cookingTime} min</span>
          <span>👨‍🍳 {recipe.difficulty}</span>
          {recipe.author?.name && (
            <Link to={`/users/${recipe.author._id}`} className="rc-author">
              Por {recipe.author.name}
            </Link>
          )}
        </div>

        <span className="rc-go">→</span>
      </div>
    </article>
  );
}

export default RecipeCard;
