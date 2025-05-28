import axios from 'axios'

const instance = axios.create({ baseURL: 'https://483r123.e2.mars-hosting.com/cookbook/api/' })
//const instance = axios.create({ baseURL: 'http://473a123.e2.mars-hosting.com/cookbook/api/' }) // MARS - Praksa novembar 2024

export default instance
