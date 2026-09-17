<script setup>
import { useRoute } from 'vue-router'
import UserApp from '@/components/perfil/UserApp.vue'
import PerfilAvaliacoes from '@/components/perfil/PerfilAvaliacoes.vue'

const route = useRoute()
</script>

<template>
  <div>
    <UserApp :user-id="route.params.id" />
    <PerfilAvaliacoes :user-id="route.params.id" />
  </div>
</template>