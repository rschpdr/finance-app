// Document Object Model

// Selecionar um elemento HTML

const inputAmount = document.getElementById("form-input-amount");
const inputDescription = document.getElementById("form-input-description");
const inputType = document.getElementById("form-input-transaction-type");

const button = document.getElementById("form-input-button");

const transactionList = document.getElementById("transaction-list");

const currentBalance = document.getElementById("current-balance");

let transactionItemCounter = 0;

// "Escutar" um evento específico, e quando ele acontecer, executar um função callback

button.addEventListener("click", () => {
  let currentAmount = 0;

  const amount = Number(inputAmount.value);
  const desc = inputDescription.value;
  const type = inputType.value;

  console.log(amount);
  console.log(desc);
  console.log(type);

  let listItemClass = "transaction-list__item--red";

  // Troca a cor do texto do valor da transação
  if (type === "expense") {
    listItemClass = "transaction-list__item--red";
  } else {
    listItemClass = "transaction-list__item--green";
  }

  transactionList.innerHTML += `
  <li>
    <span>${desc}</span>
    <div>
      <span class="${listItemClass}">$
        <span id="transaction-list-item-amount-${transactionItemCounter}">${
    type === "expense" ? "-" : ""
  }${amount.toFixed(2)}
        </span>
      </span>
      <button
          class="form-input__button form-input__button--small form-input__button--red"
        >
          -
      </button>
    </div>
</li>
  `;

  transactionItemCounter++;

  getCurrentAmountSum(transactionList.children, currentAmount);

  console.log(currentAmount);
  // const li = document.createElement("li");

  // const spanDesc = document.createElement("span");
  // spanDesc.innerText = desc;

  // const spanAmount = document.createElement("span");
  // spanAmount.innerText = amount;

  // const btn = document.createElement("button");
  // btn.innerText = "-";
  // btn.classList.add(
  //   "form-input__button",
  //   "form-input__button--small",
  //   "form-input__button--red"
  // );

  // // Adicionar um elemento dentro de outro
  // li.appendChild(spanDesc);
  // li.appendChild(spanAmount);
  // li.appendChild(btn);

  // transactionList.appendChild(li);
});

// Função para extrair o amount de cada item da lista e somar tudo no final
function getCurrentAmountSum(transactionList, currentAmount) {
  // HTMLCollection não é uma array, logo, só podemos iterar sobre seus itens usando o for ou transformando-a em uma array

  // for (let i = 0; i < transactionList.length; i++) {
  //   console.log(transactionList[i]);
  // }

  // Transformar a HTMLCollection em uma Array
  Array.from(transactionList).map((li, index) => {
    // Navegar a árvore de elementos do HTML até chegar no elemento que queremos
    // const amount =
    //   li.children[1].firstElementChild.firstElementChild.innerText; // O item da lista (li) // A div que contem o valor e o "$"" // o span que contém o "$" e o outro span // o span interno que contém o valor numérico
    // console.log(amount);

    console.log("LI => ", index);

    // Pesquisando pelo ID
    const amount = li.children[1].firstElementChild.firstElementChild.innerText;

    console.log(amount);

    currentAmount = currentAmount + parseFloat(amount, 10);

    if (currentAmount < 0) {
      currentBalance.classList.add("transaction-list__item--red");
      currentBalance.parentElement.classList.add("transaction-list__item--red");
    } else {
      currentBalance.classList.remove("transaction-list__item--red");
      currentBalance.parentElement.classList.remove(
        "transaction-list__item--red"
      );
    }

    currentBalance.innerText = currentAmount.toFixed(2);

    removeTransaction(li, currentAmount);
  });
}

// Remover o item da lista quando o usuário clica no botão "-"

function removeTransaction(listItem, currentAmount) {
  const removeBtn = listItem.children[1].lastElementChild;

  removeBtn.addEventListener("click", () => {
    // Atualizando o currentAmount pois, ao remover uma transação, queremos subtrair o valor dela do saldo
    const amount =
      listItem.children[1].firstElementChild.firstElementChild.innerText;

    console.log("VALOR SENDO RETIRADO", amount);
    console.log("SALDO ANTES DA OPERACAO", currentAmount);

    currentAmount = currentAmount - parseFloat(amount, 10);

    console.log("SALDO APOS ATUALIZADO", currentAmount);
    currentBalance.innerText = currentAmount.toFixed(2);

    transactionList.removeChild(listItem);
  });
}
