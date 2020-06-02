import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//temporário
require('axios').defaults.headers.common['Authorization'] ='bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik1hdGV1cyBGLiBTYW50b3MiLCJlbWFpbCI6Im1hdGVzYW50b3M4OUBnbWFpbC5jb20iLCJhZG1pbiI6InRydWUiLCJpYXQiOjE1OTEwNDg3NDQsImV4cCI6MTU5MTMwNzk0NH0.mCHc5WXC9WwRVoNmb1HUgLUwgPvzHKVtZl-YttQBsuw'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')