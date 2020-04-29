
class Hamburger {
    constructor(size, stuffing){
        this.size = size
        this.stuffings = new Array(stuffing)
        this.toppings = []
    }
    addTopping(topping){
        this.toppings.push(topping)
    }
    removeTopping(topping){
        let index = this.toppings.findIndex(it => it.name ===topping.name)
        if(index !== -1)
            this.toppings.splice(index, 1)

    }
    getToppings(){
        return this.toppings

    }
    getSize(){
        return this.size
    }
    addStuffing(stuffing){
        this.stuffings.push(stuffing)
    }
    getStuffings(){
        return this.stuffings

    }
    calculatePrice(){
        const sum1 = this.size === 'small' ? 50 : 100
        const sum2 = this.stuffings.reduce((sum, item) => {
            return sum += item.getPrice()
        }, 0)
        const sum3 = this.toppings.reduce((sum, item) => {
            return sum += item.getPrice()
        }, 0)

        return sum1 + sum2 + sum3
    }
    calculateCalories(){
        const cal1 = this.size === 'small' ? 20 : 40
        const cal2 = this.stuffings.reduce((sum, item) => {
            return sum += item.getCalories()
        }, 0)
        const cal3 = this.toppings.reduce((sum, item) => {
            return sum += item.getCalories()
        }, 0)

        return cal1 + cal2 + cal3

    }
}

class ProductOption {
    constructor(price, calories) {
        this.price = price
        this.calories = calories
        this.name = ''
    }
    getPrice(){
        return this.price
    }
    getCalories(){
        return this.calories
    }
    getName(){
        return this.name
    }
}

class Stuffing extends ProductOption{
}

class CheeseStuffing extends Stuffing{
    constructor() {
        super(10, 20);
        this.name = 'С сыром'
    }
}
class SaladStuffing extends Stuffing{
    constructor() {
        super(20, 5);
        this.name = 'С салатом'
    }
}
class PotatoStuffing extends Stuffing{
    constructor() {
        super(15, 10);
        this.name = 'С картофелем'
    }
}

class Topping extends ProductOption{

}

class Spice extends Topping{
    constructor() {
        super(15, 0);
        this.name = 'С приправой'
    }
}

class Majonez extends Topping{
    constructor() {
        super(20, 5);
        this.name = 'С майонезом'
    }
}


const cheeseStuffing =  new CheeseStuffing()
const newBurger = new Hamburger('big', cheeseStuffing);

newBurger.addStuffing(new SaladStuffing())

newBurger.addTopping(new Majonez())


console.log(newBurger.getStuffings())
console.log(newBurger.getToppings())

console.log(newBurger.calculatePrice())
console.log(newBurger.calculateCalories())