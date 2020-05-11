Vue.component('errors', {
    props: ['error'],
    data() {
        return {
        }
    },
    template: `
    <div class="errorBlock" v-show="error"> Произошла ошибка сервера. </div>
    `
});