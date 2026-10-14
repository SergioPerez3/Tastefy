import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
} from "../services/recipeService";
import { CATEGORIES, DIFFICULTIES } from "../constants/recipe";

import { uploadImage } from "../services/imageService";

const initialForm = {
  title: "",
  description: "",
  image: "",
  ingredients: "",
  steps: "",
  category: "otros",
  difficulty: "fácil",
  cookingTime: "",
};

function RecipeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const recipe = await getRecipeById(id);

        setForm({
          title: recipe.title,
          description: recipe.description,
          image: recipe.image,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          category: recipe.category,
          difficulty: recipe.difficulty,
          cookingTime: String(recipe.cookingTime),
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede pesar más de 5 MB");
      return;
    }

    try {
      setError(null);
      setUploading(true);
      const url = await uploadImage(file);
      setForm((current) => ({ ...current, image: url }));
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError(null);

      const recipeData = {
        title: form.title.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
        ingredients: form.ingredients.trim(),
        steps: form.steps.trim(),
        category: form.category,
        difficulty: form.difficulty,
        cookingTime: Number(form.cookingTime) || 0,
      };

      if (id) {
        await updateRecipe(id, recipeData);
      } else {
        await createRecipe(recipeData);
      }

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="recipe-form-section">
      <div className="container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>{id ? "Editar receta" : "Nueva receta"}</h1>

          {error && <p className="auth-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="title">Título: </label>
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción: </label>
            <input
              type="text"
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Foto de la receta: </label>

            {form.image && (
              <img
                className="image-preview"
                src={form.image}
                alt="Vista previa"
              />
            )}

            <input
              type="file"
              id="image"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              disabled={uploading}
            />
            {uploading && <p>Subiendo imagen...</p>}
          </div>


          <div className="form-group">
            <label htmlFor="ingredients">Ingredientes (uno por línea): </label>
            <textarea
              name="ingredients"
              id="ingredients"
              rows="6"
              value={form.ingredients}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="steps">Pasos (uno por línea): </label>
            <textarea
              name="steps"
              id="steps"
              rows="6"
              value={form.steps}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría: </label>
            <select
              name="category"
              id="category"
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Dificultad: </label>
            <select
              name="difficulty"
              id="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              {DIFFICULTIES.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cookingTime">Tiempo (minutos): </label>
            <input
              type="number"
              min="0"
              name="cookingTime"
              id="cookingTime"
              value={form.cookingTime}
              onChange={handleChange}
            />
          </div>

          <button className="btn" type="submit" disabled={uploading}>
            {id ? "Guardar cambios" : "Publicar receta"}
          </button>

          <Link to="/dashboard">Cancelar</Link>
        </form>
      </div>
    </section>
  );
}

export default RecipeFormPage;
