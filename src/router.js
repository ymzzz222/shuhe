import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerList = [];
function importAll(r){
  r.keys().forEach(key  => {
    routerList.push(...r(key).default)
  });
}
importAll(require.context('./routers',true,/\.js/))
export default new Router({
  routes: [
    ...routerList,
  ]
})
