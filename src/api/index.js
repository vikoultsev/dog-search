import axios from 'axios'

export const fetchSearchResults = (query) =>
  axios.get(`api/search?query=${query}`)
    .then(res => res.data)
    .catch(err => err)

export const fetchImageData = (imageId) =>
  axios.get(`api/image?imageId=${imageId}`)
    .then(res => res.data)
    .catch(err => err)
  
