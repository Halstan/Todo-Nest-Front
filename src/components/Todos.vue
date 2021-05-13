<template>
  <v-container>
    <v-card class="mt-4" v-for="(post, index) in postsLists" :key="index">
      <v-card-title class="text-center"> {{ post.titulo }} </v-card-title>
      <v-card-text>
        <p>{{ post.description }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="findPosts(post.id)">
          <v-icon>far fa-edit</v-icon>
        </v-btn>
        <v-btn color="error" @click="deletePosts(post.id)">
          <v-icon>fas fa-trash-alt</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapState } from 'vuex';

export default Vue.extend({
  
  computed: {
    ...mapState(['postsLists']),
    ...mapGetters(['getToken'])
  },

  created(): void {
    this.cargarPosts(this.getToken)
  },

  methods: {
    ...mapActions(['findPosts','cargarPosts', 'deletePosts']),
  },
});
</script>

<style>
</style>