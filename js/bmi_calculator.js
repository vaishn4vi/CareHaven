document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bmiForm');
    const weightInput = document.getElementById('weight');
    const weightUnit = document.getElementById('weight-unit');
    const heightInput = document.getElementById('height');
    const heightUnit = document.getElementById('height-unit');
    const bmiNumber = document.getElementById('bmiNumber');
    const bmiCategoryText = document.getElementById('bmiCategoryText');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const weightType = weightUnit.value;
        const heightType = heightUnit.value;
        
        if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
            alert('Please enter valid positive numbers for weight and height.');
            return;
        }

        let bmi = 0;
        
        if (weightType === 'lb') {
            weight *= 0.453592; // convert pounds to kilograms
        }
        
        if (heightType === 'ft') {
            height *= 30.48; // convert feet to centimeters
        }
        
        height /= 100; // convert height in centimeters to meters
        
        bmi = weight / (height * height);
        
        bmiNumber.textContent = bmi.toFixed(2);
        
        if (bmi < 18.5) {
            bmiCategoryText.textContent = 'Underweight';
            bmiCategoryText.style.color = 'blue';
        } else if (bmi < 24.9) {
            bmiCategoryText.textContent = 'Normal weight';
            bmiCategoryText.style.color = 'green';
        } else if (bmi < 29.9) {
            bmiCategoryText.textContent = 'Overweight';
            bmiCategoryText.style.color = 'orange';
        } else {
            bmiCategoryText.textContent = 'Obesity';
            bmiCategoryText.style.color = 'red';
        }
    });
});
