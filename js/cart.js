class Cart{ // создаём корзину товаров
    constructor() {
        this.cartItems = [] // в корзине пустой массив
    }

    addToCart(item){ // метод для добавлени ятовара в корзину
        const el = this.cartItems.find(it => it.id === item.id)
        if(el){
            el.quantity++ // увеличиваем количество
        }else {
            this.cartItems.push(new CartItem(item, 1))
        }
    }
    removeFromCart(item){ // Метод для удаления товара из корзины
        const index = this.cartItems.findIndex(it => it.id === item.id)
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

    }
}

class CartItem { // Создаём класс для элемента корзины
    constructor(product, quantity) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.quantity = quantity
    }

    getSum(){ // считаем сумму товаров
        return this.price * this.quantity
    }
}