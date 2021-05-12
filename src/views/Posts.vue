<template>
  <v-container>
    <h2>Agregar tarea</h2>
    <v-form>
      <v-text-field label="Titulo" v-model="posts.titulo" counter="40"></v-text-field>
      <v-text-field label="Descripción" v-model="posts.description" counter="150"></v-text-field>

      <v-btn block type="submit" v-if="!isEditable" @click.prevent="addPost">Guardar</v-btn>
      <v-btn
        block 
        class="mt-2"
        type="submit"
        v-if="isEditable"
        color="primary"
        @click.prevent="updatePosts(posts)">
        Guardar
        </v-btn>
      <v-btn
        block
        class="mt-2"
        v-if="isEditable"
        color="warning"
        @click="setEditable(false)"
        >Cancelar</v-btn>
    </v-form>
    <h2 class="mt-3">Tareas</h2>
    <todos></todos>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Todos from '../components/Todos.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default Vue.extend ({

  components: {
    Todos
  },

  computed: {
    ...mapGetters(['getToken']),
    ...mapState(['posts', 'isEditable'])
  },

  methods: {
    ...mapActions(['addPosts', 'setEditable', 'updatePosts']),
    addPost() {
      this.addPosts({posts: this.posts, token: this.getToken})
    }
  }

})
</script>
