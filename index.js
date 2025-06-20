const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


transactionFormEl.addEventListener("submit",addTransaction);

function addTransaction(e) {
    e.preventDefault(); // prevents default refreshing

    // get form values
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push({
        id:Date.now(),
        description,
        amount
    })

    // save to local storage
    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionFormEl.reset();  // resets the form element
}


function updateTransactionList() {
    transactionListEl.innerHTML = "";
    const sortedTransactions = [...transactions].reverse();  // makes shallow copy of transactions and reverses it

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);
    });
}


function createTransactionElement(transaction){
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    // todo :  left to improve the amount formatting
    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>${transaction.amount}
        <button class = "delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>
        </span>
    `;

    return li;
}

function updateSummary()
{
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0); // acc starts with 0 [ call back]

    const income = transactions.filter(transaction => transaction.amount > 0).reduce((acc,transaction) => acc + transaction.amount,0);

    const expense = transactions.filter(transaction => transaction.amount < 0).reduce((acc,transaction) => acc + transaction.amount,0);

}