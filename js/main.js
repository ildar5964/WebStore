const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
  {id: 4, title: 'Monitor'},
];

class ProductsRender {

  static renderProducts(products){
    return products.map((product) => {
      return `<div class="product-item">
            <h3>${product.title}</h3>
            <img class="image" src="http://placehold.it/250"/>
            <p> Цена: ${product.price  || 'уточняется'} </p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`
    }).join('') /// ЗАПЯТЫЕ УБРАЛ ИСПОЛЬЗУЯ МЕТОД jOIN()
  }

  static viewProducts(selector, html){
    document.querySelector(selector).innerHTML = html
  }
}

const html = ProductsRender.renderProducts(products)
ProductsRender.viewProducts('.products', html)
