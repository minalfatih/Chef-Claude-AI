import Markdown from 'react-markdown'

export default function ClaudeRecipe(props) {
  // console.log(props.recipe);
  return (
    <section className="suggested-recipe-container">
      <h2>Chef Claude Recommends:</h2>
      <Markdown>
        {props.recipe}
      </Markdown>
    </section>
  )
}