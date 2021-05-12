import { UsuarioDTO } from '@/models/usuario.dto'
import { login } from '@/services/auth.service'
import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index'
import { addPosts, deletePosts, findMyPosts, findPosts, updatePosts } from '@/services/posts.service'
import { PostsModel } from '../models/posts.model';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: new UsuarioDTO,
    token: null,
    isEditable: false,
    postsLists: new Array<PostsModel>(),
    posts: new PostsModel
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setPostsLists(state, payload) {
      state.postsLists = payload
    },
    setPosts(state, payload) {
      state.posts = payload
    },
    updatePosts(state, payload) {
      const index = state.postsLists.findIndex(post => post.id == payload.id)
      state.postsLists[index].titulo = payload.titulo
      state.postsLists[index].description = payload.description
      state.posts = new PostsModel
      state.isEditable = false
    },
    deletePosts(state, payload: number) {
      const index = state.postsLists.findIndex(post => post.id == payload)
      state.postsLists.splice(index, 1)
      console.log(state.postsLists);
      
    },
    setEditable(state, payload) {
      state.isEditable = payload
    }
  },
  actions: {
    async ingresar({ commit }, payload) {
      try {
        const res = await login(payload);
        
        const usuario = decode(res.data.access_token) as UsuarioDTO;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        commit('setUsuario', usuario)
        
        localStorage.setItem('token', res.data.access_token);
        commit('setToken', res.data.access_token);
        router.push( { name: 'Posts' } )
      } catch (error) {
        commit('setToken', '')
      }
    },

    async cargarPosts({ commit }, payload) {
      try {
        const res = await findMyPosts(payload)
        commit('setPostsLists', res.data)
      } catch (error) {
        console.log(error);
        
      }
    },

    async addPosts({ state }, payload) {
      try {
        const res = await addPosts(payload.posts, payload.token)
        state.postsLists.push(res.data)
      } catch (error) {
        console.log(error);
        
      }
    },

    async findPosts({ commit }, payload: number) {
      try {
        const res = await findPosts(payload) 
        commit('setPosts', res.data);
        commit('setEditable', true);
      } catch (error) {
        console.log(error);
      }

    },

    async updatePosts({ commit }, payload: PostsModel) {
      try {
        const res = await updatePosts(payload.id, payload)
        commit('updatePosts', res.data)
      } catch (error) {
        console.log(error);
      }
    },

    async deletePosts({ commit }, payload: number) {
      try {
        await deletePosts(payload)
        commit('deletePosts',)
      } catch (error) {
        console.log(error);
        
      }
    },

    setEditable({ commit }, payload: boolean) {
      commit('setEditable', payload)
      commit('setPosts', new PostsModel)
    },

    cargarUsuario({ commit }) {
      if(localStorage.getItem('usuario') && localStorage.getItem('token')) {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
        commit('setToken', localStorage.getItem('token'))
        commit('setUsuario', usuario)
      }
    },
    logout({ commit }) {
      localStorage.removeItem('usuario')
      localStorage.removeItem('token')
      commit('setToken', null)
      commit('setUsuario', null)
      router.push( { name: 'Login'} )
    }
  },
  getters: {
    usuarioAutenticado: (state) => {
      return state.token !== null
    },
    getToken(state) {
      return state.token
    }
  },
  modules: {
  }
})
