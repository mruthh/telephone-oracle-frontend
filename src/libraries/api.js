import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL

export const initGame = (params) => {
  return axios.post('game', params)
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

export const createPlayer = (gameId, params) => {
  return axios.post('player', {
    gameId,
    params
  })
}

export const updatePlayer = (id, params) => {
  return axios.patch('player', {
    id,
    params
  })
}

export const getLastLine = (sheetId) => {
  return axios.get('/line/last', {
    params: { sheetId }
  })
}

export const addLine = (params) => {
  return axios.post('/line', params)
}

export const getLines = (sheetId) => {
  return axios.get('/line', {
    params: { id: sheetId }
  })
}

export const getFullSheets = gameId => {
  return axios.get('/sheet/full', {
    params: { gameId }
  })
}