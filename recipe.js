document.addEventListener('DOMContentLoaded', () => {
  const recipe = JSON.parse(localStorage.getItem('selectedRecipe'));
  displayRecipe(recipe);
});

function displayRecipe(recipe) {
  const recipeDetailsDiv = document.getElementById('recipeDetails');
  recipeDetailsDiv.innerHTML = `
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-image">
    <div class="recipe-info">
      <h2>${recipe.strMeal}</h2>
      <p><strong>Origin:</strong> ${recipe.strArea}</p>
      <p><strong>Category:</strong> ${recipe.strCategory}</p>
      <p><strong>Description:</strong> <span id="recipeDescription">${recipe.strInstructions}</span></p>
      <a href="${recipe.strSource}" target="_blank">More Info</a>
      <button onclick="saveRecipe('${recipe.idMeal}')">Save</button>
      <button onclick="deleteRecipe('${recipe.idMeal}')">Delete</button>
      <button onclick="removeSavedRecipe('${recipe.idMeal}')">Remove Saved Recipe</button>
    </div>
  `;
}

function editRecipe() {
  const description = document.getElementById('recipeDescription').innerText;
  const editDescription = document.getElementById('editDescription');
  const editButton = document.getElementById('editButton');
  const saveButton = document.getElementById('saveButton');
  const removeButton = document.getElementById('removeButton');

  editDescription.value = description;
  editDescription.classList.remove('hidden');
  saveButton.classList.remove('hidden');
  removeButton.classList.remove('hidden');
  editButton.classList.add('hidden');
}

function saveDescription() {
  const editDescription = document.getElementById('editDescription').value;
  const recipeDescription = document.getElementById('recipeDescription');
  const editButton = document.getElementById('editButton');
  const saveButton = document.getElementById('saveButton');
  const removeButton = document.getElementById('removeButton');

  recipeDescription.innerText = editDescription;
  editDescription.classList.add('hidden');
  saveButton.classList.add('hidden');
  removeButton.classList.add('hidden');
  editButton.classList.remove('hidden');

  // Update the recipe in localStorage
  const recipe = JSON.parse(localStorage.getItem('selectedRecipe'));
  recipe.strInstructions = editDescription;
  localStorage.setItem('selectedRecipe', JSON.stringify(recipe));

  // Update the recipe in saved recipes if it exists
  let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  const index = savedRecipes.findIndex(r => r.idMeal === recipe.idMeal);
  if (index !== -1) {
    savedRecipes[index].strInstructions = editDescription;
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }
}
function saveRecipe(idMeal) {
  const recipe = JSON.parse(localStorage.getItem('selectedRecipe'));
  let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  const existingRecipe = savedRecipes.find(r => r.idMeal === idMeal);

  if (!existingRecipe) {
    savedRecipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    alert('Recipe saved!');
  } else {
    alert('Recipe already saved.');
  }
}

function deleteRecipe(idMeal) {
  let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  savedRecipes = savedRecipes.filter(r => r.idMeal !== idMeal);
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  alert('Recipe deleted.');
  goBack();
}

function removeSavedRecipe(idMeal) {
  let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  savedRecipes = savedRecipes.filter(r => r.idMeal !== idMeal);
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  alert('Saved recipe removed.');
  goBack();
}

function goBack() {
  window.history.back();
}
