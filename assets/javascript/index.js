// Document Object Model

// Selecionar um elemento HTML

const button = document.getElementById("form-input-button");
const transactionList = document.getElementById("transaction-list");

// Instanciar nossa classe

const app = new App(transactionList);

// "Escutar" um evento específico, e quando ele acontecer, executar um função callback

button.addEventListener("click", app.addTransaction);
