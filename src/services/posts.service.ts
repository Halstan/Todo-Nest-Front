import axios from 'axios';

const url = process.env.VUE_APP_URI + '/posts'

function getPosts() {
    return axios.get(url)
}

export { getPosts }