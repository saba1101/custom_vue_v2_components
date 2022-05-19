import Vue from 'vue'
import App from './App.vue'
import ApexCharts from 'apexcharts'
import axios from 'axios'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.config.productionTip = false
Vue.use({
  ApexCharts,
  axios,
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
      return console.log(`%c${target}`,`color:#fff;padding:0 5px;background:#fff;border-radius:3px`,'=>',arg)
    }
  }
})
