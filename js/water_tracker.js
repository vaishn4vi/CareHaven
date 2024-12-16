document.addEventListener('DOMContentLoaded', () => {
    // Set the goal
    const goalLiters = 2; // 2 liters goal
    document.getElementById('goal').innerText = `Goal: ${goalLiters} Liters`;

    // Water intake research data (base)
    const baseResearchInfo = `
        Water is essential for all bodily functions, including digestion, absorption, and transportation of nutrients.
        It also helps regulate body temperature and maintain hydration. Drinking adequate water ensures that your skin,
        organs, and muscles function efficiently. For healthy adults, the general recommendation is around 2 liters of
        water per day, though it may vary depending on climate, activity level, and individual health conditions.
    `;

    // Add initial research information to the page
    document.getElementById('researchInfo').innerText = baseResearchInfo;

    // Variables
    const cups = document.querySelectorAll('.cup');
    const litersText = document.getElementById('liters');
    const percentageText = document.getElementById('percentage');
    const personalizedAdvice = document.getElementById('personalizedAdvice');
    const calculateBtn = document.getElementById('calculate');
    const requirementSelect = document.getElementById('requirement');

    // Add event listener to cups
    cups.forEach((cup, index) => {
        cup.addEventListener('click', () => {
            addWater(index + 1);
        });
    });

    // Function to add water
    function addWater(numCups) {
        const totalLiters = numCups * 0.25; // Each cup is 250ml
        const remainingLiters = goalLiters - totalLiters;
        const percentage = (totalLiters / goalLiters) * 100;

        litersText.innerText = `${remainingLiters.toFixed(2)} Liters`;
        percentageText.innerText = `${percentage.toFixed(0)}%`;

        // Change the class of cups based on the filled amount
        cups.forEach((cup, index) => {
            cup.classList.toggle('full', index < numCups);
        });
    }

    // Calculate personalized water intake based on input
    calculateBtn.addEventListener('click', () => {
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const requirement = requirementSelect.value;

        if (age && gender && height && weight && requirement) {
            let waterIntake = 0;

            // Basic calculation based on gender and weight
            if (gender === 'male') {
                waterIntake = (weight * 35) / 1000; // Male formula for water intake (in liters)
            } else {
                waterIntake = (weight * 31) / 1000; // Female formula for water intake (in liters)
            }

            // Update personalized advice based on the selected requirement
            personalizedAdvice.innerText = `You should drink approximately ${waterIntake.toFixed(2)} liters of water per day for ${requirement}.`;
            updateResearchInfo(requirement, age, gender, weight);
        } else {
            personalizedAdvice.innerText = 'Please fill all fields.';
        }
    });

    // Function to update research information based on the selected requirement, age, gender, and weight
    function updateResearchInfo(requirement, age, gender, weight) {
        let info = '';

        switch (requirement) {
            case 'healthy skin':
                info = "Staying hydrated is essential for maintaining healthy skin. Water helps to keep your skin moisturized, reduces the appearance of wrinkles, and can improve overall skin tone.";
                if (age < 30) {
                    info += " Younger individuals may notice quicker improvements in skin health due to better elasticity.";
                } else {
                    info += " Older individuals might require more hydration to counteract natural dryness.";
                }
                info += `
                    <br><strong>Healthcare Tips:</strong><br>
                    - Use moisturizers with hyaluronic acid to retain moisture.<br>
                    - Avoid excessive sun exposure and use sunscreen.<br>
                    - Include foods rich in antioxidants like berries and green tea in your diet.<br>
                `;
                break;
            case 'slim body':
                info = "Drinking enough water can significantly aid in weight management by boosting metabolism and reducing appetite.";
                if (weight > 80) {
                    info += " Increased water intake can help in reducing excess weight more effectively.";
                } else {
                    info += " Staying hydrated aids in maintaining a healthy weight and supports a balanced diet.";
                }
                info += `
                    <br><strong>Healthcare Tips:</strong><br>
                    - Drink a glass of water before meals to reduce hunger.<br>
                    - Incorporate more fiber-rich foods like fruits, vegetables, and whole grains.<br>
                    - Engage in regular physical activity to boost metabolism.<br>
                `;
                break;
            case 'healthy hair':
                info = "Hydration is crucial for maintaining healthy hair. Water helps transport nutrients to your hair follicles.";
                if (gender === 'female') {
                    info += " Women generally find that proper hydration contributes to shinier and stronger hair.";
                } else {
                    info += " Men might experience improved hair health as well, particularly if they are active.";
                }
                info += `
                    <br><strong>Healthcare Tips:</strong><br>
                    - Use hair products with natural oils for added moisture.<br>
                    - Limit heat styling and chemical treatments that can damage hair.<br>
                    - Consume omega-3 fatty acids found in fish and flaxseeds for hair nourishment.<br>
                `;
                break;
            case 'fitness':
                info = "Proper hydration enhances athletic performance and is vital for overall fitness. Water helps regulate body temperature and lubricates joints.";
                if (age > 40) {
                    info += " Older adults should pay special attention to hydration to avoid heat-related illnesses during exercise.";
                }
                info += `
                    <br><strong>Healthcare Tips:</strong><br>
                    - Drink water before, during, and after workouts to stay hydrated.<br>
                    - Include electrolyte-rich beverages if exercising for extended periods.<br>
                    - Monitor urine color to gauge hydration levels.<br>
                `;
                break;
            case 'increase height':
                info = "While hydration alone won't increase height, adequate water intake supports growth during developmental years.";
                if (age < 18) {
                    info += " Ensuring proper hydration is essential for maximizing growth potential.";
                } else {
                    info += " For adults, maintaining hydration contributes to joint health and mobility.";
                }
                info += `
                    <br><strong>Healthcare Tips:</strong><br>
                    - Maintain a balanced diet rich in vitamins and minerals, particularly calcium and vitamin D.<br>
                    - Engage in regular physical activity, especially stretching and strength exercises.<br>
                    - Get sufficient sleep to support overall growth and recovery.<br>
                `;
                break;
            default:
                info = "Select a requirement to see relevant research information.";
        }

        // Update the research information section
        document.getElementById('researchInfo').innerHTML = info;
    }

    // Event listener for requirement selection change
    requirementSelect.addEventListener('change', () => {
        const selectedRequirement = requirementSelect.value;
        updateResearchInfo(selectedRequirement);
    });
});
