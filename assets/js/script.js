let balance = 5000; // Starting balance

function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!amount || amount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    balance += amount;
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
    addTransaction("Deposit", amount);
}

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
}

function addTransaction(type, amount) {
    const historyList = document.getElementById('history-list');
    const transactionDate = new Date().toLocaleString();
    const transactionItem = document.createElement('li');
    transactionItem.textContent = `${transactionDate} - ${type}: $${amount.toFixed(2)}`;
    historyList.prepend(transactionItem); // Latest transactions appear at the top
}

function toggleHistory() {
    const history = document.getElementById('history-list');
    history.classList.toggle('hidden');
}