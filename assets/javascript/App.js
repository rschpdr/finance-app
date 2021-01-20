class App {
  // O constructor não é obrigatório, só precisamos do constructor quando vamos receber argumentos (entradas) na classe, ou quando vamos herdar de outra classe
  constructor(transactionList) {
    // Recebidos de fora
    this.transactionList = transactionList;

    // Informações internas da classe
    this.currentAmount = 0;
    this.inputAmount = document.getElementById("form-input-amount");
    this.inputDescription = document.getElementById("form-input-description");
    this.inputType = document.getElementById("form-input-transaction-type");
    this.transactionItems = document.querySelectorAll("li");
    this.currentBalance = document.getElementById("current-balance");
    // Força o this do método a apontar para o this da classe, mesmo efeito de usar arrow functions como métodos
    // this.addTransaction = this.addTransaction.bind(this);
  }

  // Métodos declarados como arrow functions não criam um novo escopo dentro de classes, tendo o seu objeto this apontando sempre para a própria classe
  addTransaction = () => {
    // 1. Extrair informações dos inputs
    const amount = Number(this.inputAmount.value);
    const desc = this.inputDescription.value;
    const type = this.inputType.value;

    // 2. Configurar a cor do text do valor de acordo com o tipo de transação
    const amountClass = this.setTransactionAmountColor(type);

    // 3. Criar um elemento HTML usando essas informações
    const newTransaction = this.createTransactionMarkup({
      description: desc,
      amount: amount,
      amountColorClass: amountClass,
      type: type,
    });
    // 4. Inserir esse elemento HTML na lista
    this.transactionList.appendChild(newTransaction);
    this.transactionItems = document.querySelectorAll("li");

    // 5. Atualizar o saldo
    this.updateBalance();

    // 6. Registrar eventos de clique nos botões de remoçāo das linhas
    // this.registerRemoveButtons();
  };

  removeTransaction = (event) => {
    const li = event.target.parentElement.parentElement;
    this.transactionList.removeChild(li);

    // Atualizar a lista de transações e também o saldo
    this.transactionItems = document.querySelectorAll("li");
    this.updateBalance();
  };

  updateBalance = () => {
    let sum = 0;

    Array.from(this.transactionItems).map((li) => {
      let amount = parseFloat(
        li.lastElementChild.firstElementChild.firstElementChild.innerText,
        10
      );

      if (this.getType(li.lastElementChild.firstElementChild)) {
        amount = amount * -1;
      }

      const type = (sum += amount);
    });

    this.currentAmount = sum;
    this.currentBalance.innerText = this.currentAmount.toFixed(2);
    this.setBalanceColor(this.currentBalance);
  };

  getType = (amountText) => {
    const isExpense = amountText.innerText.includes("-");
    return isExpense;
  };

  setBalanceColor = (currentBalanceElement) => {
    // Se o numero for negativo, colocamos a classe de texto vermelho nele
    if (parseFloat(currentBalanceElement.innerText, 10) < 0) {
      currentBalanceElement.parentElement.classList.add(
        "transaction-list__item--red"
      );
    } else {
      currentBalanceElement.parentElement.classList.remove(
        "transaction-list__item--red"
      );
    }
  };

  setTransactionAmountColor = (type) => {
    let listItemClass = "transaction-list__item--red";

    // Troca a cor do texto do valor da transação
    if (type === "expense") {
      listItemClass = "transaction-list__item--red";
    } else {
      listItemClass = "transaction-list__item--green";
    }

    return listItemClass;
  };

  // registerRemoveButtons = () => {
  //   const allRemoveButtons = document.querySelectorAll(
  //     ".form-input__button--red"
  //   );

  //   for (let i = 0; i < allRemoveButtons.length; i++) {
  //     allRemoveButtons[i].addEventListener("click", this.removeTransaction);
  //   }
  // };

  createTransactionMarkup = ({
    description,
    amount,
    amountColorClass,
    type,
  }) => {
    const li = document.createElement("li");

    const spanDesc = document.createElement("span");
    spanDesc.innerText = description;

    const div = document.createElement("div");

    const containerSpan = document.createElement("span");

    // Coloca o sinal de '-' antes do valor numérico quando a transação representa um gasto

    // if (type === "expense") {
    //   spanAmount.innerText = "-" + amount.toFixed(2);
    // } else {
    //   spanAmount.innerText = amount.toFixed(2);
    // }

    const minusSign = type === "expense" ? "-" : "";
    containerSpan.innerText = minusSign + "$";
    containerSpan.classList.add(amountColorClass);

    const spanAmount = document.createElement("span");

    spanAmount.innerText = amount.toFixed(2);

    const btn = document.createElement("button");
    btn.innerText = "-";
    btn.classList.add(
      "form-input__button",
      "form-input__button--small",
      "form-input__button--red"
    );
    btn.onclick = this.removeTransaction;

    // Adicionar um elemento dentro de outro
    li.appendChild(spanDesc);
    containerSpan.appendChild(spanAmount);
    div.appendChild(containerSpan);
    div.appendChild(btn);
    li.appendChild(div);

    return li;
  };
}
