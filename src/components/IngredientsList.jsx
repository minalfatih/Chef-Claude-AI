export default function IngredientsList({ ingredients, getRecipe, ref }) {
  const ingredientListItem = ingredients.map(
    ingredient =>
      <li key={ingredient}>{ingredient}</li>)

  return (
    <section className="ingredients-list-container">
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-label="ingredients list">
        {ingredientListItem}
      </ul>

      {ingredients.length > 3 && <div className="get-recipe-container">
        <div ref={ref}>
          <h3>Ready for recipe?</h3>
          <p>Generate a recipe from your list of ingredient.</p>
        </div>
        <button onClick={getRecipe}>Get a recipe</button>
      </div>}
    </section>
  )
}