import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapaView from '../views/MapaView.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'

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
      path: '/login',
      name: 'login',
  component: LoginView
    },
    {
  path: '/cadastro',
  name: 'cadastro',
  component: CadastroView
    }
    
  ]
})
export default router
