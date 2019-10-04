const pizzaOrder = document.querySelector('.mainOrder');

const order = [];
if (localStorage.getItem('orderInfo')) {
    orderInfo = JSON.parse(localStorage.getItem('pizzaOrder'));
}