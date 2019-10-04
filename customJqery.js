class JQery {
  constructor(arrOfElems) {
    this.items = Array.from(arrOfElems);
  }
  css(cssObject) {
    this.items = [...this.items].map(item => {
      for (let key in cssObject) {
        item.style[key] = cssObject[key];
      }
      return item;
    })
    return this;
  }

  innerText(textObj) {
    this.items = [...this.items].map(item => {
      item.innerText = textObj;
      return item;
    })
    return this;
  }
  toggle(className) {
    this.items = [...this.items].map(item => {
      item.classList.toggle(className);
    })
    return this;
  }
  slideToggle() {
    this.items.forEach(el => {
      if (el.style.display === 'block') {
        el.style.display = 'none';
      } else {
        el.style.display = 'block';
      }
    })
  }
  click(collBackFunc) {
    this.items.forEach(item => {
      item.addEventListener('click', function (e) {
        collBackFunc(e);
      })
    })
    return this;
  }
  on(event, collBackFunc) {
    this.items.map(item => {
      item.addEventListener(event, function (e) {
        collBackFunc(e)
      })
    })
    return this;
  }
  class(className) {
    this.items.forEach(item => {
      item.classList.add(className)
    })
    return this;
  }
  removeClass(className) {
    this.items.forEach(item => {
      item.classlist.remove(className)
    })
    return this;
  }
  htmlInn(text) {
    this.items.forEach(item => {
      item.innerHTML = text
    })
    return this;
  }
}








window.$ = (selector, isLiveCollection = false) => {
  const identify = selector[0];
  if (selector instanceof HTMLCollection) {
    if (selector instanceof JQery) {
      return selector;
    }
    return new JQery(selector);
  }
  if (isLiveCollection) {
    return document.querySelectorAll(selector);
  }
  switch (identify) {
    case '.':
      return new JQery(document.getElementsByClassName(selector.slice(1)));
    case '#':
      return document.getElementById(selector.slice(1));
    default:
      return new JQery(document.getElementsByTagName(selector.slice(1)));
  }
}


// document.getElementById('btnMenu').addEventListener('click', function() {
//   $('.drop').slideToggle()
// })

$('.btn').click((e) => $('.drop').slideToggle());