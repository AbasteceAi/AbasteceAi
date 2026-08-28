import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import NotFound from '../views/ErrorView.vue'
import MapaView from '../views/MapaView.vue'
import SobreView from '../views/SobreView.vue'
import AuthView from '@/views/AuthView.vue'
import PostosView from '../views/PostosView.vue'
import PostoIndView from '@/views/PostoIndView.vue'
import PerfilView from '@/views/PerfilView.vue'
import PerfilEditView from '@/views/PerfilEditView.vue'
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
      path: '/auth',
      name: 'auth',
  component: AuthView, meta:{semHeader:true}
    },

    {
      path: '/postos',
      name: 'postos',
      component: PostosView
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
    },{
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('@/views/FavoritosView.vue')},
      {
      path: '/posto/:id',
      name:'PostoIndividual',
      component:PostoIndView
    },
      {
      path: '/perfil',
      name:'Perfil',
      component:PerfilView
    },
     {
      path: '/perfil/editar',
      name:'PerfilEdit',
      component:PerfilEditView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound, meta:{semHeader:true}

    }

  ]
})


router.beforeEach(async (to, from, next) => {
  const rotasProtegidas = ['/perfil', '/favoritos']

  if (rotasProtegidas.includes(to.path)) {
    const user = await usuarioAtual()
    if (!user) {
      next('/auth?mode=login')
      return
    }
  }

  next()
})
export default router

