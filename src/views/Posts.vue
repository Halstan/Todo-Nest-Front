<template>
  <v-container>
    <h2>Agregar tarea</h2>
    <v-form>
      <v-text-field label="Titulo" v-model="posts.titulo"></v-text-field>
      <v-text-field label="Descripción" v-model="posts.description"></v-text-field>

      <v-btn type="submit" @click.prevent="addPost">Guardar</v-btn>
    </v-form>
    {{posts}}
    <h2 class="mt-3">Tareas</h2>
    <todos :posts="postsList"></todos>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Todos from '../components/Todos.vue';
import { PostsModel } from '@/models/posts.model';
import { getPosts } from '../services/posts.service'

export default Vue.extend ({

  components: {
    Todos
  },

  data() {
    return new class {
      postsList: PostsModel[] = [];
      posts: PostsModel = new PostsModel()
    }();
  },

  created(): void {
    this.listsPosts();
  },

  methods: {
    listsPosts(): void {
      getPosts()
        .then(res => {
        this.postsList = res.data
        
      })
      .catch(err => {
          console.log(err);
      })
    }, 

    addPost(): void {
      console.log(this.posts);
      
    }
  }

})
</script>
