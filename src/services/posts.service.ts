import { PostsModel } from '@/models/posts.model';
import axios, { AxiosResponse } from 'axios';

const url = process.env.VUE_APP_URI + '/posts'

function getPosts(): Promise<AxiosResponse<PostsModel[]>> {
  return axios.get(url)
}

function addPosts(post: PostsModel, token: string): Promise<AxiosResponse<PostsModel>> {
  return axios.post(url, post, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

function findPosts(id: number): Promise<AxiosResponse<PostsModel>> {
  return axios.get(url + `/${id}`)
}

function updatePosts(id: number, posts: PostsModel): Promise<AxiosResponse<PostsModel>> {
  return axios.put(`${url}/${id}`, posts)
}

function deletePosts(id: number): Promise<AxiosResponse<void>> {
  return axios.delete(`${url}/${id}`)
}

function findMyPosts(token: string): Promise<AxiosResponse<PostsModel[]>> {
  return axios.get(url + '/usuario/my', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export { getPosts, addPosts, findPosts, updatePosts, deletePosts, findMyPosts }