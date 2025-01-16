// Populate dropdowns
const stores = ["Store 1", "Store 2", "Store 3"]; // Example store list
const times = ["Morning", "Afternoon", "Evening"]; // Example time list
const donuts = ["Vanilla Glazed", "Cinnamon", "Creme Brulee", "Vanilla"]; // Example donut list

const storeDropdown = document.getElementById('storeDropdown');
const additionalFlavors = ["Strawberry", "Blueberry", "Maple", "Cinnamon", "Lemon"];
donuts.push(...additionalFlavors);
const timeDropdown = document.getElementById('timeDropdown');
const donutListDiv = document.getElementById('donutList');

function populateDropdown(dropdown, options) {
    options.forEach(option => {
        const optElement = document.createElement('option');
        optElement.value = option;
        optElement.textContent = option;
        dropdown.appendChild(optElement);
    });
}

// Populate dropdowns with provided values
populateDropdown(storeDropdown, stores);
populateDropdown(timeDropdown, times);

// Create input fields for donuts
function createDonutInputs(donuts) {
    donuts.forEach(donut => {
        const label = document.createElement('label');
        label.textContent = ` ${donut}:`;

        const input = document.createElement('input');
        input.type = 'number';
        input.min = 0;
        input.placeholder = `0`;
        input.name = donut;

        donutListDiv.appendChild(label);
        donutListDiv.appendChild(input);
    });
}

createDonutInputs(donuts);

// Change background color based on selected store
storeDropdown.addEventListener('change', () => {
    const selectedStore = storeDropdown.value;
    const body = document.body;

    switch (selectedStore) {
        case "Store 1":
            body.style.backgroundColor = "#FFC0CB"; // Light pink for Store 1
            break;
        case "Store 2":
            body.style.backgroundColor = "#ADD8E6"; // Light blue for Store 2
            break;
        case "Store 3":
            body.style.backgroundColor = "#98FB98"; // Pale green for Store 3
            break;
        default:
            body.style.backgroundColor = "#f8f8f8"; // Default background color
    }
});

// Handle form submission
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    const selectedStore = storeDropdown.value;
    const selectedTime = timeDropdown.value;
    const userName = document.getElementById('userName').value.trim();

    const donutData = {};
    document.querySelectorAll('#donutList input').forEach(input => {
        donutData[input.name] = input.value ? parseInt(input.value) : 0;
    });

    if (!userName) {
        alert('Please enter your name.');
        return;
    }

    const payload = {
        store: selectedStore,
        time: selectedTime,
        userName: userName,
        donuts: donutData,
    };

    // Send to Google Apps Script endpoint
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=1E0-05xe8cOqTKbMT6QYZaAg-mqWGfcUpNwWDrL2oaV6clf27lWl1WI9HNmFbHib0HYSWMLeWsQjuMH3SfPjwOZop4nOHpedm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAirmmhNyo6pJFynEaz7R4l_L-misxQpaerqEnNiWO-GbAOeLsCin7Ucif00torLjysw_Q9tMcb8GQLJ3ZlaPC25FnDf3-AbVQ&lib=MzKO87ON7f518N0qiTfvr8_ZBGI2UAf_X', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        alert('Data submitted successfully!');
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Submission failed. Please try again.');
    });
});