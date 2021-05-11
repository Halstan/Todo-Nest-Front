import { UsuarioDTO } from '@/models/usuario.dto'
import { login } from '@/services/auth.service'
import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: UsuarioDTO,
    token: '',
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setToken(state, payload) {
      state.token = payload;
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
      } catch (error) {
        commit('setToken', '')
      }
    },
    cargarUsuario({ commit }) {
      if(localStorage.getItem('usuario') && localStorage.getItem('token')) {
        const usuario = JSON.parse(localStorage.getItem('usuario')!)
        commit('setToken', localStorage.getItem('token'))
        commit('setUsuario', usuario)
      }
    }
  },
  modules: {
  }
})
