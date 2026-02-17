import React from "react"
import IngredientsList from './IngredientsList'
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"
import RecipeNote from "./RecipeNote"
import Loading from "./Loading"

export default function Main(props) {
  // const [ingredients, setIngredients] = React.useState(['tomato', 'cheese', 'basil', 'olive oil'])
  const [ingredients, setIngredients] = React.useState([])

  function addIngredient(formData) {
    const newIngredient = formData.get('ingredient')
    setIngredients(prevIngredient => [...prevIngredient, newIngredient])
  }

  const [recipe, setRecipe] = React.useState('')

  const [isLoading, setIsLoading] = React.useState(false)

  const recipeSection = React.useRef(null)
  // console.log(recipeSection);

  React.useEffect(() => {
    if (recipe !== '' && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView()
    }
  }, [recipe])

  async function getRecipe() {
    setIsLoading(prevLoading => !prevLoading)

    // setRecipe(prevShown => !prevShown)
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    // console.log(recipeMarkdown);
    setRecipe(recipeMarkdown)

    setIsLoading(prevLoading => !prevLoading)
  }

  return (
    <main ref={props.mainRef}>
      <div style={{ textAlign: "center", margin: "15px 0 25px" }}>
        <h1 style={{ margin: 0, fontSize: "2rem", color: "#141413" }}>Cook Smarter</h1>
        <p style={{ margin: '5px 0', color: '#475467' }}>Turn a few simple ingredients into a delicious, satisfying meal with Chef Claude.</p>
      </div>

      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 &&
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe} />}

      {ingredients.length < 4 && <RecipeNote />}

      {isLoading && <Loading />}
      {!isLoading && recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
