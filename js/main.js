
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url) => {
  return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.log(error);
      });
};

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts().then(data => {
      this.goods = [...data];
      this._render();
    })
  }

  _fetchProducts() {
    return getRequest(`${API}/catalogData.json`)
  }

  calcSum() {
    return this.goods.reduce((sum, good) => sum + good.price, 0);
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }

    document.querySelectorAll('#addToCart').forEach(item =>
        item.addEventListener('click', event => {
          const btn = event.target
          cart.addToCart(btn.dataset.id)
        }))
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img class="image" src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button id = "addToCart" class="buy-btn" data-id="${this.id}">Купить</button>
                </div>
            </div>`;
  }
}

new ProductList()

class Cart{
  constructor() {
    this.cartItems = this.getBacket()
  }

  fetch() {
    return getRequest(`${API}/getBasket.json`)
  }

  getBacket(){
    this.fetch().then(data => {
      if(data.contents){
        this.cartItems = data.contents.map((item) => new CartItem(item))
      }
    })
  }

  addToCart(productId){
    console.log(productId)
    const el = this.cartItems.find(it => it.id == productId)

    console.log(el)

    if(el){
      el.quantity = el.quantity++
    }else {
      //this.cartItems.push(new CartItem(item, 1))
    }

    console.log(this.cartItems)
    this.render()
  }

  removeFromCart(item){ // Метод для удаления товара из корзины
    const index =  this.cartItems.findIndex(it => it.id === item.id)
    if(index !== -1){
      this.cartItems.splice(index, 1)
    }
  }

  removeAll(){ // Метод для удаления всех товаров из корзины
    this.cartItems.splice(0, this.cartItems.length)
  }
  calcTotalSum(){ // Метод для вычисления общей суммы товаров в корзине
    return this.cartItems.reduce( (sum, item) => {
      return sum += item.getSum()
    }, 0)
  }

  render(){

    const block = document.getElementById('cart-block');
    // while (block.firstChild) {
    //   block.removeChild(block.firstChild);
    // }

    block.innerHTML = this.cartItems.map((item) => {
      return item.render()
    }).join('')

    // this.cartItems.forEach((item) => {
    //   block.insertAdjacentHTML('beforeend', item.render());
    // })

  }
}

class CartItem {
  constructor(product) {
    this.id = product.id_product;
    this.title = product.product_name;
    this.price = product.price;
    this.quantity = product.quantity
  }

  render (){
    return `<div class="product-item" data-id="${this.id}">
                <img class="image" src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <p>Количество: ${this.quantity} шт. </p>
                    <p>Сумма ....</p>
                    <button class="buy-btn">Удалить из корзины</button>
                </div>
            </div>`;
  }

  getSum(){
    return this.price * this.quantity
  }
}

let cart = new Cart()

window.addEventListener('load', () => {
  document.getElementById('allCart').addEventListener('click', () => {
    document.querySelector('.products').style.display = 'none';
    cart.render();
  });
});




