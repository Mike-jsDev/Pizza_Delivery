const pizzasContainer = document.querySelector('.main');
const infoContainer = document.querySelector('.info');
const deliverySelect = document.getElementById('deliverySelect');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const createOrder = document.getElementById('createOrder');


const productsArr = JSON.parse(localStorage.getItem('productsArr')) ?
    JSON.parse(localStorage.getItem('productsArr')) : [];





const orderInfo = {
    productsArr,
    fullName: '',
    email: '',
    typeOfDelivery: 'Новая Почта'
};

const createPizza = (pizzaObj) => {

    const pizzaElement = document.createElement('div');
    pizzaElement.classList.add('pizza');
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
        const index = productsArr.findIndex(product => product.id === pizzaObj.id)
        productsArr[index].count += 1;
        localStorage.setItem('productsArr', JSON.stringify(productsArr));
        renderPizzas();
    }
    pizzaElement.append(addElement)
    const removeElement = document.createElement('button');
    removeElement.innerText = '-';
    removeElement.onclick = function (e) {
        const index = productsArr.findIndex(product => product.id === pizzaObj.id)
        productsArr[index].count = productsArr[index].count == 0 ? 0 : --productsArr[index].count;
        localStorage.setItem('productArr', JSON.stringify(productsArr));
        renderPizzas();
    }
    pizzaElement.append(removeElement);

    const countElement = document.createElement('p');
    countElement.innerText = `Count: ${pizzaObj.count} pts. , Price: ${pizzaObj.price * pizzaObj.count} ₴`;
    pizzaElement.append(countElement);

    pizzasContainer.append(pizzaElement)
}

const renderPizzas = () => {
    pizzasContainer.innerHTML = "";
    let modifyPizzaArr = productsArr.map(product => {
        let pizza = pizzaList.find(pizza => pizza.id === product.id);
        return {
            ...pizza,
            count: product.count
        }
    })
    modifyPizzaArr.forEach(pizza => {
        createPizza(pizza);
    })
    let totalCount = 0;
    let totalPrice = 0;


    modifyPizzaArr.forEach(pizza => {
        totalCount += pizza.count;
        totalPrice += pizza.count * pizza.price;
    })

    infoContainer.innerHTML = `<h1>Total count: ${totalCount} pts.</h1>
                               <h1>Total price: ${totalPrice} ₴</h1>`
}


renderPizzas()


deliverySelect.addEventListener('change', (e) => {
    orderInfo.typeOfDelivery = e.target.value;
});

fullName.addEventListener('change', (e) => {
    orderInfo.fullName = e.target.value;
});

email.addEventListener('change', (e) => {
    orderInfo.email = e.target.value;
});

createOrder.addEventListener('click', (e) => {
    let order = ({
        id: `${new Date()}${orderInfo.fullName.slice(2,5)}`,
        ...orderInfo
    })
    window.open()
});