// Log in to the account
function login() {
    const password = document.getElementById("password").value;
    if (password === "123456789") {
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("account-page").classList.remove("hidden");
        
        initializeBalance(); // Load or reset balance
        loadStoredTransactions(); // Load stored transactions
    } else {
        alert("Incorrect password!");
    }
}

let balance = 5000; // Default starting balance

// Initialize balance from localStorage or set to default
function initializeBalance() {
    const storedBalance = localStorage.getItem("balance");
    if (storedBalance) {
        balance = parseFloat(storedBalance); // Load stored balance
    }
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
}

// Deposit function
function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!amount || amount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    balance += amount;
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
    addTransaction("Deposit", amount);
    localStorage.setItem("balance", balance.toString()); // Save updated balance
}

// Withdraw function
function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!amount || amount <= 0) {
        alert("Please enter a valid withdrawal amount.");
        return;
    }

    if (amount > balance) {
        alert("Insufficient funds!");
        return;
    }

    balance -= amount;
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
    addTransaction("Withdrawal", amount);
    localStorage.setItem("balance", balance.toString()); // Save updated balance
}

// Add transaction to history and save to localStorage
function addTransaction(type, amount) {
    const historyList = document.getElementById("history-list");
    const transactionDate = new Date().toLocaleString();
    const transactionItem = document.createElement("li");

    transactionItem.textContent = `${transactionDate} - ${type}: $${amount.toFixed(2)}`;
    historyList.prepend(transactionItem);

    // Store transactions in localStorage
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.unshift({ date: transactionDate, type, amount: amount.toFixed(2) });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Load stored transactions on login
function loadStoredTransactions() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = ""; // Clear existing history

    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    storedTransactions.forEach((tx) => {
        const transactionItem = document.createElement("li");
        transactionItem.textContent = `${tx.date} - ${tx.type}: $${tx.amount}`;
        historyList.appendChild(transactionItem);
    });
}

// Toggle transaction history visibility
function toggleHistory() {
    document.getElementById("history-list").classList.toggle("hidden");
}

// Log out and reset balance if user chooses
function logout() {
    const resetChoice = confirm("Do you want to reset your balance to $5000?");
    if (resetChoice) {
        localStorage.removeItem("balance");
        localStorage.removeItem("transactions");
    }

    document.getElementById("account-page").classList.add("hidden");
    document.getElementById("login-page").classList.remove("hidden");
    document.getElementById("password").value = ""; // Clear password field
}
