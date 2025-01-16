const API_URL = 'http://localhost:5000/api'; // Replace with the actual API URL

// Function to get the seedKey value
function getSeedKey() {
    return document.getElementById('seedKey').value; // Assuming you have a field for the seedKey input
}

function login() {
    const seedKey = getSeedKey(); // Get seedKey
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        document.getElementById('login-response').textContent = 'Username and password are required.';
        return;
    }

    const data = { username, password };
    $.ajax({
        url: `${API_URL}/login`,
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'seedKey': seedKey // Add seedKey in headers
        },
        data: JSON.stringify(data),
        success: (response) => {
            document.getElementById('login-response').textContent = response.message;
        },
        error: (xhr) => {
            document.getElementById('login-response').textContent = xhr.responseJSON.error;
        }
    });
}

function createItem() {
    const seedKey = getSeedKey(); // Get seedKey
    const barcode = document.getElementById('barcode').value;
    const itemname = document.getElementById('itemname').value;
    const vatpercentage = document.getElementById('vatpercentage').value;
    const price = document.getElementById('price').value;

    if (!barcode || !itemname || !vatpercentage || !price) {
        document.getElementById('item-response').textContent = 'All fields are required.';
        return;
    }

    const data = { barcode, itemname, vatpercentage, price };
    $.ajax({
        url: `${API_URL}/itemcreation`,
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'seedKey': seedKey // Add seedKey in headers
        },
        data: JSON.stringify(data),
        success: (response) => {
            document.getElementById('item-response').textContent = response.message;
        },
        error: (xhr) => {
            document.getElementById('item-response').textContent = xhr.responseJSON.error;
        }
    });
}

function priceCheck() {
    const seedKey = getSeedKey(); // Get seedKey
    const barcode = document.getElementById('pricecheck-barcode').value;

    if (!barcode) {
        document.getElementById('pricecheck-response').textContent = 'Barcode is required.';
        return;
    }

    const data = { barcode, stock_check: 'false' };
    $.ajax({
        url: `${API_URL}/pricecheck`,
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'seedKey': seedKey // Add seedKey in headers
        },
        data: JSON.stringify(data),
        success: (response) => {
            document.getElementById('pricecheck-response').textContent = `Item: ${response.item_name}, Price: ${response.price}`;
        },
        error: (xhr) => {
            document.getElementById('pricecheck-response').textContent = xhr.responseJSON.error;
        }
    });
}

function getItemsList() {
    const seedKey = getSeedKey(); // Get seedKey
    $.ajax({
        url: `${API_URL}/getitemslist`,
        method: 'GET',
        headers: {
            'seedKey': seedKey // Add seedKey in headers
        },
        success: (response) => {
            const itemsList = document.getElementById('items-list');
            itemsList.innerHTML = ''; // Clear the current list
            response.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.itemDescription} - Price: ${item.price} - Quantity: ${item.quantity}`;
                itemsList.appendChild(li);
            });
        },
        error: (xhr) => {
            document.getElementById('items-list').textContent = xhr.responseJSON.error;
        }
    });
}
