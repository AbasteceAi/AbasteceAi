import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/ErrorView.vue'
import MapaView from '../views/MapaView.vue'
import { usuarioAtual } from '@/services/auth.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Mapa',
      name: 'Mapa',
      component: MapaView
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'NotFound',
      component: NotFound 

    }

  ]
})
router.beforeEach(async (to, from, next) => {
  const rotasProtegidas = ['/perfil', '/favoritos']

  if (rotasProtegidas.includes(to.path)) {
    const user = await usuarioAtual()
    if (!user) {
      next('/login')
      return
    }
  }

  next()
})
export default router
