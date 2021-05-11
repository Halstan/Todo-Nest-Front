<template>
    <v-container class="mt-3">
      <v-row>
        <v-col>
          <h2 class="text-center">Registrarme</h2>
        </v-col>
        <v-col>
        <h2 class="text-center">Iniciar Sesión</h2>
          <v-form>
            <v-text-field label="Nombre de usuario" type="text" v-model="login.username"></v-text-field>
            <v-text-field label="Contraseña" type="password" v-model="login.password"></v-text-field>
            
            <v-btn block type="submit" @click.prevent="loguear">Ingresar</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import Vue from 'vue'
import { LoginDTO } from '../models/login.dto';

export default Vue.extend({
  data() {
    return new class {
      login: LoginDTO = new LoginDTO();
    }
  },

  methods: {
    ...mapActions(['ingresar']),
    loguear(): void {
      this.ingresar(this.login)
    }
  }
})
</script>