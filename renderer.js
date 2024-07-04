document.addEventListener('DOMContentLoaded', () => {
  showHome();
  setupSlider();
});

function showHome() {
  document.body.className = 'home-theme';
  const recipesSection = document.getElementById('recipesSection');
  recipesSection.innerHTML = '<p>Welcome to Tastebite! Search or browse for recipes.</p>';
}

function showCategories() {
  const recipesSection = document.getElementById('recipesSection');
  recipesSection.innerHTML = '';
}

function showSavedRecipes() {
  const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
  displayRecipes(savedRecipes);
}

function searchRecipes() {
  const query = document.getElementById('searchInput').value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(response => response.json())
    .then(data => displayRecipes(data.meals));
}

function filterByCategory(category) {
  let themeClass = '';
  switch(category) {
    case 'Seafood':
      themeClass = 'seafood-theme';
      break;
    case 'Vegetarian':
      themeClass = 'vegetarian-theme';
      break;
    case 'Dessert':
      themeClass = 'dessert-theme';
      break;
    case 'Beef':
      themeClass = 'beef-theme';
      break;
  }
  document.body.className = themeClass;

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => displayRecipes(data.meals));
}

function displayRecipes(recipes) {
  const recipesSection = document.getElementById('recipesSection');
  recipesSection.innerHTML = '';
  
  if (recipes && recipes.length > 0) {
    recipesSection.innerHTML = recipes.map(recipe => `
      <div class="recipe" onclick="selectRecipe('${recipe.idMeal}')">
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <p class="recipe-title">${recipe.strMeal}</p>
      </div>
    `).join('');
  } else {
    recipesSection.innerHTML = '<p>No recipes found.</p>';
  }
}

function selectRecipe(idMeal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then(response => response.json())
    .then(data => {
      const recipe = data.meals[0];
      localStorage.setItem('selectedRecipe', JSON.stringify(recipe));
      window.location.href = 'recipe.html';
    });
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

function setupSlider() {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slider .slides img');
  setInterval(() => {
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
  }, 3000);
}
