<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from './stores/auth' 
  import { useDisplay } from 'vuetify'

  const auth = useAuthStore()
  const { mdAndUp } = useDisplay()

  const drawer = ref(false)
</script>

<template>
  <v-card
    elevation="3"
    max-width="1200"
    class="mx-auto"

  >
    <v-layout>
      <v-app-bar
        color="teal"
        v-if="mdAndUp"
      >
        <template v-slot:prepend>
          <v-btn
            :to="{name: 'home'}"
          >
            Bienes Raices - VueFire
          </v-btn>
        </template>
        <template v-slot:append>
          <div v-if="auth.isAuth">
            <v-btn
              :to="{name: 'admin-propiedades'}"
            >
              Admin
            </v-btn>
            <v-btn
              @click="auth.logout"
            >
              Cerrar Sesión
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              :to="{name: 'home'}"
            >
              Inicio
            </v-btn>
            <v-btn
              :to="{name: 'login'}"
            >
              Iniciar Sesión
            </v-btn>
          </div>
        </template>
      </v-app-bar>
      <v-app-bar
        color="teal"
        v-else
      >
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>
        <v-btn
          :to="{name: 'home'}"
        >
            Bienes Raices - VueFire
        </v-btn>
      </v-app-bar-title>

      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'left' : undefined"
        temporary
      >
      <v-list v-if="auth.isAuth">
        <v-list-item
          :to="{ name: 'admin-propiedades' }"
        >
          <v-list-item-content>Admin</v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="auth.logout"
        >
          <v-list-item-content>Cerrar Sesión</v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item
          :to="{ name: 'login' }"
        >
          <v-list-item-content>Iniciar Sesión</v-list-item-content>
        </v-list-item>
      </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <RouterView/>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
  
</style>
