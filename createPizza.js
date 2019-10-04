const addTitle = document.getElementById('addTitle');
const comspositionsContainer = document.querySelector('.comspositions');
const infoContainer = document.querySelector('.info');
const btnCreate = document.getElementById('btnCreate');
const addImg = document.getElementById('addImg');
const imageView = document.getElementById('imageView');

class createPizzaModel {
  constructor({
    img,
    name,
    composition,
    price,
    caloricity
  }) {
    this.id = pizzaList.length + 1;
    this.img = img;
    this.name = '';
    this.composition = [];
    this.price = price;
    this.caloricity = caloricity;
    this.isNew = true;
    this.getName(name);
    this.getCompositionsAsName(composition);
  }

  getName(name) {
    name = name.toLowerCase().split('');
    name[0] = name[0].toUpperCase();
    this.name = name.join('');
  }
  getCompositionsAsName(compositions) {
    this.composition = compositionList.filter(el => {
      return compositions.includes(el.id)
    }).map(el => el.name);
  }
}

const pizzaModel = {
  img: '',
  name: '',
  composition: [],
  price: 0,
  caloricity: 0,
}

const renderInfo = (caloricity, price) => {
  infoContainer.innerHTML = `<h1>Price: ${price || 0} $</h1>
                              <p>Caloricity: ${caloricity || 0} pts.</p>`
}
renderInfo()

compositionList.forEach(item => {
  const labelElem = document.createElement('label');
  labelElem.innerText = item.name;
  labelElem.htmlFor = 'composition' + item.id;
  const compositionElem = document.createElement('input');
  compositionElem.id = 'composition' + item.id;
  compositionElem.type = 'checkbox';
  compositionElem.addEventListener('change', function () {
    let composition = pizzaModel.composition;

    if (this.checked) {
      composition.push(item.id)
    } else {
      pizzaModel.composition = composition.filter(composId => composId !== item.id);
    }

    pizzaModel.price = pizzaModel.composition.length ? 100 : 0;
    pizzaModel.caloricity = pizzaModel.composition.length ? 1000 : 0;

    pizzaModel.composition.forEach(composId => {
      pizzaModel.price += compositionList.find(el => el.id === composId).price;
    })
    pizzaModel.composition.forEach(composId => {
      pizzaModel.caloricity += compositionList.find(el => el.id === composId).caloricity;
    })
    renderInfo(pizzaModel.caloricity, pizzaModel.price);
  })
  comspositionsContainer.append(labelElem)
  comspositionsContainer.append(compositionElem)
})


addTitle.addEventListener('input', (e) => {
  pizzaModel.name = e.target.value;
})

addImg.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    imageView.src = fileReader.result;
    pizzaModel.img = fileReader.result;
  };
  fileReader.readAsDataURL(file);
})

btnCreate.addEventListener('click', () => {
  let pizza = new createPizzaModel(pizzaModel)
  let pizzasFromStorage = JSON.parse(localStorage.getItem('newPizzas'));
  pizzasFromStorage = pizzasFromStorage ? pizzasFromStorage : [];
  pizzasFromStorage.push(pizza);
  localStorage.setItem('newPizzas', JSON.stringify(pizzasFromStorage));
})

