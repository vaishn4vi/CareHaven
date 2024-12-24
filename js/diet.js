// State variables to track user input
let selectedDiet = 'vegetarian';
let allergyList = [];

// Function to update selected diet
function selectDiet(diet) {
  selectedDiet = diet;

  // Update UI for selected diet
  document.querySelectorAll('.diet-option').forEach(option => {
    option.classList.remove('selected');
  });
  document.querySelector(`[data-diet="${diet}"]`).classList.add('selected');
}

// Function to capture selected allergies
function getAllergies() {
  allergyList = [];
  document.querySelectorAll('.allergy-options input[type="checkbox"]:checked').forEach(checkbox => {
    allergyList.push(checkbox.value);
  });
}

// Function to generate meal plan dynamically
function generateDietPlan() {
  const calorieInput = parseInt(document.getElementById('calories').value) || 1800; // Default 1800
  const mealCount = parseInt(document.getElementById('meals').value) || 3; // Default 3 meals

  getAllergies(); // Capture allergy input

  const mealPlanContainer = document.getElementById('meal-plan');
  mealPlanContainer.innerHTML = ""; // Clear previous results

  const mealOptions = getMealOptions(selectedDiet, allergyList);
  const caloriesPerMeal = Math.floor(calorieInput / mealCount);

  // Shuffle meal options to ensure randomness
  const shuffledMeals = shuffleArray(mealOptions);

  // Generate unique meals dynamically
  const selectedMeals = [];
  for (let i = 0; i < mealCount; i++) {
    const meal = getClosestUniqueMeal(shuffledMeals, caloriesPerMeal, selectedMeals);
    selectedMeals.push(meal); // Add meal to selected list

    const mealDiv = document.createElement('div');
    mealDiv.className = 'meal-item';
    mealDiv.innerHTML = `
      <h3>Meal ${i + 1}</h3>
      <p>${meal.name} - <strong>${meal.calories} kcal</strong></p>
      <p>Ingredients: ${meal.ingredients.join(', ')}</p>
    `;
    mealPlanContainer.appendChild(mealDiv);
  }
}

// Function to filter meal options based on diet and allergies
function getMealOptions(diet, allergies) {
  const meals = {
    vegetarian: [
      { name: "Grilled Veggie Salad", ingredients: ["lettuce", "tomato", "cucumber"], calories: 300 },
      { name: "Paneer Tikka", ingredients: ["paneer", "spices"], calories: 400 },
      { name: "Lentil Soup", ingredients: ["lentils", "carrots", "onions"], calories: 250 },
      { name: "Vegetable Biryani", ingredients: ["rice", "vegetables", "spices"], calories: 350 },
      { name: "Stir-Fried Broccoli", ingredients: ["broccoli", "garlic", "spices"], calories: 200 }
    ],
    "non-vegetarian": [
      { name: "Grilled Chicken Breast", ingredients: ["chicken", "broccoli"], calories: 400 },
      { name: "Fish Curry", ingredients: ["fish", "coconut milk"], calories: 350 },
      { name: "Egg Omelette", ingredients: ["eggs", "spinach"], calories: 200 },
      { name: "Beef Stir-Fry", ingredients: ["beef", "onions", "capsicum"], calories: 450 }
    ],
    jain: [
      { name: "Vegetable Biryani", ingredients: ["rice", "vegetables", "spices"], calories: 350 },
      { name: "Lentil Curry", ingredients: ["lentils", "spices"], calories: 300 },
      { name: "Mixed Vegetable Salad", ingredients: ["lettuce", "cucumber", "tomato"], calories: 200 },
      { name: "Stir-Fried Veggies", ingredients: ["capsicum", "tomato", "carrots"], calories: 250 }
    ]
  };

  // Filter out meals containing allergens
  return meals[diet].filter(meal =>
    !allergies.some(allergen => meal.ingredients.includes(allergen))
  );
}

// Function to get a unique meal closest to the calorie target
function getClosestUniqueMeal(mealOptions, targetCalories, selectedMeals) {
  let closestMeal = null;
  let smallestDiff = Infinity;

  for (let meal of mealOptions) {
    if (!selectedMeals.includes(meal)) { // Check for uniqueness
      const diff = Math.abs(meal.calories - targetCalories);
      if (diff < smallestDiff) {
        closestMeal = meal;
        smallestDiff = diff;
      }
    }
  }
  return closestMeal || mealOptions[0]; // Fallback if not enough meals
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap
  }
  return array;
}
