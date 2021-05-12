<template>
  <div>
      <v-app-bar
      app
      color="info"
      dark
    >
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <router-link to="/">
          <h2 class="white--text">Todo List</h2>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        v-if="!usuarioAutenticado"
        :to="{ name: 'Login' }"
      >
        <span class="mr-2">Iniciar sesión</span>
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
      <v-btn
        v-if="usuarioAutenticado"
        @click="logout"
      >
        <span class="mr-2">Cerrar sesión</span>
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer class="accent" v-model="drawer" temporary absolute app>
      <v-list>
        <v-list-item-group>
          <v-list-item v-if="usuarioAutenticado" :to=" { name: 'Posts' } ">
          <v-list-item-icon>
            <v-icon class="white--text">
              fas fa-check
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">
            Posts
          </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  name: 'Navbar',
  data: () => ({
    nombre: '',
    drawer: false
  }),

  created() {
    this.cargarUsuario();
  },

  computed: {
    ...mapGetters(['usuarioAutenticado'])
  },

  methods: {
    ...mapActions(['cargarUsuario', 'logout'])
  }
})
</script>