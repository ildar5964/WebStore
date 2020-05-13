const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150'
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addToBasket(id) {
            let toBasket;
            this.goods.forEach(function(item) {
                if(id == item.id) {
                    toBasket = {
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        img: item.img
                    }
                }
            });
            this.basketGoods.push(toBasket);
            this.calcAllGoods();
        },
        deleteFromBasket(id) {
            let getIdElemen;
            this.basketGoods.forEach(function(item, i) {
                let thisId = item.id;
                if(id == thisId) {
                    getIdElemen = i;
                }
                
            });
            this.basketGoods.splice(getIdElemen, 1);
            this.calcAllGoods();
        },
        viewCart() {
            switch(this.isVisibleCart) {
                case(false): {
                    this.isVisibleCart = true;
                    break;
                }
                case(true): {
                    this.isVisibleCart = false;
                    break;
                }
            }
        },
        calcAllGoods() {
            let totalPrice = 0;
            this.basketGoods.forEach((good) => {
                if (good.price !== undefined) {
                    totalPrice += good.price;
                }
            });
            this.totalPriceMessage = 'Cумма товаров в корзине: ' + totalPrice;
            this.totalPriceCoin = totalPrice;
        },
        filterGoods() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
        }
    },
    async created() {
        try {
            this.goods = await this.makeGETRequest('response.json');
            this.filteredGoods = this.goods;
        } catch(err) {
            console.error(err);
        }
    },


    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    }
});


function addBasket(event) {
    app.addToBasket(event.target.id);
  }
  function deleteItem(event) {
    app.deleteFromBasket(event.target.id);
  }
  
  