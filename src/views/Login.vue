<template>
  <v-container class="mt-3">
    <h2 class="text-center">Iniciar Sesión</h2>
    <v-form>
      <v-text-field
        label="Nombre de usuario"
        type="text"
        v-model="login.username"
      ></v-text-field>
      <v-text-field
        label="Contraseña"
        type="password"
        v-model="login.password"
      ></v-text-field>

      <v-btn block type="submit" @click.prevent="loguear">Ingresar</v-btn>
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mt-2"
            color="primary"
            block
            dark
            v-bind="attrs"
            v-on="on"
          >
            Registrarme</v-btn
          >
        </template>
        <v-card>
          <v-card-title>Registrarme</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Nombre"
                    type="text"
                    v-model="usuario.nombre"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Apellidos"
                    type="text"
                    v-model="usuario.apellidos"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-menu
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Fecha de nacimiento"
                    v-model="usuario.fechaNacimiento"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="usuario.fechaNacimiento"
                  :max="max"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                label="Nombre de usuario"
                v-model="usuario.nombreDeUsuario"
                type="text"
              ></v-text-field>
              <v-text-field
                label="Contraseña"
                type="password"
                v-model="usuario.contrasenha"
              ></v-text-field>
              <v-btn
                type="submit"
                block
                color="success"
                @click.prevent="register"
                >Registrarme</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import Vue from "vue";
import { LoginDTO } from "../models/login.dto";
import { UsuarioModel } from "@/models/usuario.model";
import registerUser from "../services/usuario.service";

export default Vue.extend({
  data() {
    return new (class {
      login: LoginDTO = new LoginDTO();
      dialog = false;
      max = new Date().toISOString().substr(0, 10);
      usuario = new UsuarioModel();
    })();
  },

  methods: {
    ...mapActions(["ingresar"]),
    loguear(): void {
      this.ingresar(this.login);
    },
    async register(): Promise<void> {
      try {
        await registerUser(this.usuario);
        this.usuario = new UsuarioModel();
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>