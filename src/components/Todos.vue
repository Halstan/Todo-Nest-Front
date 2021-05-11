<template>
    <v-container>
        <v-card
            class="mt-4"
            v-for="(post, index) in posts"
            :key="index">
            <v-card-title class="text-center"></v-card-title>
            <v-card-text>
                <p>{{ post.text }}</p>
            </v-card-text>
            <v-divider></v-divider>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { PostsModel } from '../models/posts.model';

@Component
export default class Todos extends Vue{
  @Prop({required: true})
  readonly posts!: PostsModel[];
}
</script>

<style>

</style>