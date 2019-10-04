const pizzasContainer = document.getElementById('pizzasContainer');
const input = document.getElementById('input');
const modal = document.querySelector('.modal');
const cart = document.querySelector('.cart');

let getNewPizzas = () => {
  let pizzas = JSON.parse(localStorage.getItem('newPizzas'))
  pizzas = pizzas || [];
  pizzaList.push(...pizzas);
}
getNewPizzas();

let productsArr = [];
if (localStorage.getItem('productsArr')) {
  productsArr = JSON.parse(localStorage.getItem('productsArr'));
}

modal.children[0].addEventListener('click', function () {
  modal.classList.toggle('active')
})

cart.addEventListener('click', function () {
  showCart();
})

const removeFromCart = function (customThis) {

  const index = productsArr.indexOf(+this.dataset.id)
  productsArr.splice(index, 1)
  localStorage.setItem('productsArr', JSON.stringify(productsArr))
  const count = productsArr.length;
  let price = 0;
  modal.children[1].innerHTML = "";
  productsArr.forEach(productId => {
    const pizza = pizzaList.find(pizza => pizza.id === productId)
    price += pizza.price;
    modal.children[1].innerHTML += `<div class="pizza">
    <h1>${pizza.name}</h1>
    <p>${pizza.composition.join(', ')}</p>
    <span>${pizza.price} $</span>
    <button onclick="removeFromCart.call(this)" data-id=${pizza.id}>Remove from cart</button>
    </div>`
  })
  modal.children[1].innerHTML += `Count: ${count}, Price; ${price}`
}


// const showCart = () => {
//     const count = productsArr.length;
//     let price = 0;
//     modal.children[1].innerHTML = "";
//   productsArr.forEach(productId => {
//     const pizza = pizzaList.find(pizza => pizza.id === productId)
//     price += pizza.price;
//     modal.children[1].innerHTML += `<div class="pizza">
//     <h1>${pizza.name}</h1>
//     <p>${pizza.composition.join(', ')}</p>
//     <span>${pizza.price} $</span>
//     <button onclick="removeFromCart.call(this)" data-id=${pizza.id}>Remove from cart</button>
//     </div>`
//   })
//   modal.children[1].innerHTML += `Count: ${count}, Price; ${price}`

//   modal.classList.toggle('active');
// }


const showCart = () => {
  window.open('cart.html', '_self');
};


// const showModal = (id) => {
//   const currentPizza = pizzaList.find(pizza => pizza.id === id);
//   modal.children[1].innerHTML = `<div class="pizza">
//                                                   <h1>${currentPizza.name}</h1>
//                                                   <p>${currentPizza.composition.join(', ')}</p>
//                                                   <span>${currentPizza.price} $</span>
//                                                 </div>`
//   modal.classList.toggle('active');
// }





const pizzaElement = document.createElement('div');
pizzaElement.classList.add('pizza');
const h1Element = document.createElement('h1');
pizzaElement.append(h1Element);
const spanElement = document.createElement('span');
pizzaElement.append(spanElement);
const pElement = document.createElement('p');
pizzaElement.append(pElement);

const createPizza = (pizzaObj) => {

  const pizzaElement = document.createElement('div');
  pizzaElement.classList.add('pizza');
  pizzaElement.onclick = function (e) {
    ;
    showModal(pizzaObj.id);
  }
  pizzaElement.id = pizzaObj.id;

  const h1Element = document.createElement('h1');
  h1Element.innerText = pizzaObj.name;
  pizzaElement.append(h1Element);

  const ulElement = document.createElement('ul');
  pizzaObj.composition.forEach(compose => {
    const li = document.createElement('li');
    li.innerText = compose;
    ulElement.append(li);
  })
  pizzaElement.append(ulElement);

  const pElement = document.createElement('p');
  pElement.innerText = pizzaObj.price + ' $';
  pizzaElement.append(pElement);

  const addElement = document.createElement('button');
  addElement.innerText = '+';
  addElement.onclick = function (e) {
    e.stopImmediatePropagation();
    const index = productsArr.findIndex(prod => prod.id == pizzaObj.id)
    if (!productsArr.length || index == -1) {
      productsArr.push({
        id: pizzaObj.id,
        count: 1,
      })
    } else {
      productsArr[index].count += 1;
    }
    localStorage.setItem('productsArr', JSON.stringify(productsArr));
  }
  pizzaElement.append(addElement);

  pizzasContainer.append(pizzaElement)
}

const renderPizzas = arrOfPizzas => {
  pizzasContainer.innerHTML = "";
  arrOfPizzas.forEach(pizza => {
    createPizza(pizza);
  })
}

renderPizzas(pizzaList);