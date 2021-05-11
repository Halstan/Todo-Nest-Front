<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h2>Todo List</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        :to="{ name: 'Login' }"
      >
        <span class="mr-2">Iniciar sesión</span>
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),

  created() {
    this.cargarUsuario();
  },

  methods: {
    ...mapActions(['cargarUsuario'])
  }
});
</script>
