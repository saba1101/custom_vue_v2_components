import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.config.errorHandler = function (err, vm, info) {
  if(info ==="nextTick") return
  console.log(info)
  console.log(vm)
  console.log(err)
}