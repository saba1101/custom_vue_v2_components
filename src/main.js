import Vue from 'vue'
import App from './App.vue'
import ApexCharts from 'apexcharts'

Vue.config.productionTip = false
Vue.use({
  ApexCharts
})

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.config.errorHandler = function (err, vm, info) {
  if(info ==="nextTick") return
  console.log(info)
  console.log(vm)
  console.log(err)
}

Vue.mixin({
  methods:{
    log: function(target,arg){
      return console.log(`%c${target}`,'color:#fff;padding:0 5px;background:green;border-radius:3px','=>',arg)
    }
  }
})
