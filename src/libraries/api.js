import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL

export const initGame = () => {
  return axios.post('/game')
}

export const startGame = (id) => {
  return axios.post('/game/start', {
    id
  })
}

export const getGame = (id) => {
  return axios({
    method: 'get',
    url: 'game',
    params: { id }
  })
}
export const getPlayers = (gameId) => {
  return axios.get('/player', {
    params: { id: gameId }
  })
}

export const createPlayer = (gameId) => {
  return axios.post('player', {
    gameId
  })
}

export const updatePlayer = (id, params) => {
  return axios.patch('player', {
    id,
    params
  })
}

export const getLastLine = (sheetId) => {
  return axios.get('/line/last', { sheetId })
}

export const addLine = (params) => {
  return axios.post('/line', params)
}