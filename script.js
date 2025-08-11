// Aqui eu selecionei a <ul> que vai receber todos os produtos na tela
const list = document.querySelector("ul");

// Aqui eu selecionei os botões pelo nome da classe pra poder adicionar eventos depois
const buttonShowAll = document.querySelector(".btn-show-all");
const buttonShowMap = document.querySelector(".btn-show-map");
const buttonSumAll = document.querySelector(".btn-sum-all");
const buttonFilter = document.querySelector(".btn-filter");

// Aqui eu criei uma função pra formatar os valores no padrão de moeda brasileira (R$)
// Assim, sempre que for mostrar um preço, ele já aparece formatado certinho
function formatCurrency(value) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(value);
}

// Essa função é responsável por mostrar todos os produtos na tela
// Eu recebo um array de produtos, percorro ele e monto as <li> dinamicamente com forEach
function showAll(productArray) {
  let myLi = "";
  productArray.forEach((product) => {
    myLi += `
          <li>
            <img src="${product.src}" alt="${product.name}" class="img" />
            <p>${product.name}</p>
            <p class="item-price">${formatCurrency(product.price)}</p>
          </li>
        `;
  });

  // No final, eu coloco todo o HTML dentro da minha lista <ul>
  list.innerHTML = myLi;
}

// Essa função usa o map para criar um novo array de produtos
// Aqui eu dou 10% de desconto (multiplicando o preço por 0.9)
// Depois chamo a função showAll pra mostrar esses produtos com desconto
function showMap() {
  const mapProducts = menuOptions.map((product) => ({
      ...product,
      price: (product.price * 0.9),
  }));

  showAll(mapProducts);
}

// Aqui eu uso o reduce pra somar o preço de todos os produtos
// Depois eu mostro apenas o total formatado na tela
function sumAll() {
  myLi = "";
  const totalValue = menuOptions.reduce(
    (acc, product) => acc + product.price,
    0
  );
  myLi += `
  <li>
   <p>O valor total dos itens: ${formatCurrency(totalValue)}</p>
   </li>
   `;
   list.innerHTML = myLi;
}

// Aqui eu uso o filter pra pegar apenas os produtos veganos
// Depois chamo a função showAll pra mostrar só esses itens
function filter() {
  const filterJustVegan = menuOptions.filter((product) => product.vegan);

  showAll(filterJustVegan);
}

// Aqui eu adiciono os eventos de clique nos botões
// Cada um chama a função correspondente
buttonShowAll.addEventListener("click", () => showAll(menuOptions));
buttonShowMap.addEventListener("click", showMap);
buttonSumAll.addEventListener("click", sumAll);
buttonFilter.addEventListener("click", filter);
