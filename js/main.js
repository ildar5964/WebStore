const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
];

const renderProducts = (products) => {
  return products.map((product) => {
    return `<div class="product-item">
            <h3>${product.title}</h3>
            <img class="image" src="http://placehold.it/250"/>
            <p> Цена: ${product.price} рублей </p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`
  }).join('') /// ЗАПЯТЫЕ УБРАЛ ИСПОЛЬЗУЯ МЕТОД jOIN()
}

// const renderProduct = (title, price) => {
//   return `<div class="product-item">
//             <h3>${title}</h3>
//             <img class="image" src="http://placehold.it/250"/>
//             <p> Цена: ${price} рублей </p>
//             <button class="by-btn">Добавить в корзину</button>
//           </div>`;
// };
//
// const renderProducts = (list) => {
//   // const productList = list.map((good) => {
//   //   return renderProduct(good.title, good.price);
//   // });
//   const productList = [];
//   list.forEach(good => {
//     productList.push(renderProduct(good.title, good.price));
//   });
//   console.log(productList);
//   document.querySelector('.products').innerHTML = productList.join(' ');
// };

//console.log(renderProducts(products));

document.querySelector('.products').innerHTML = renderProducts(products)
