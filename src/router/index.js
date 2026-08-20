import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapaView from '../views/MapaView.vue'
import SobreView from '../views/SobreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView 
    },
    {
      path: '/mapa',
      name: 'mapa',
      component: MapaView
    },
    {
      path: '/sobre-nos',
      name: 'sobre-nos',
      component: SobreView
    }
  ]
})
export default router