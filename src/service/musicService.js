import axios from "axios"
import { SONG_API } from "../constants/global"


export const musicService = {
    getAll: (search) => {
        return axios.get(`https://json-server-new.vercel.app/songs?_sort=id&_order=desc${search ? `&q=${search}` : ''}`);
    },
    getSongById: (id) => {
        return axios.get(SONG_API + '/' + id)
    },
    create: (data) => {
        return axios.post(SONG_API, data)
    },
    update: (data) => {
        return axios.put(SONG_API + '/' + data.id, data)
    },
    delete: (id) => {
        return axios.delete(SONG_API + '/' + id)
    }
} 