export const state = {
  recipe: {},
};

export const getRecipe = async function (url) {
  try {
    // Fetch recipes based on url function parameter
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${url}`);
    const data = await res.json();
    // Check for valid url
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    // Destructure for recipe object
    const { recipe } = await data.data;
    // Create new object with new keys
    state.myrecipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    };
    return state.myrecipe;
  } catch (err) {
    throw err;
  }
};
