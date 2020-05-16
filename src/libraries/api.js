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

export const getPlayers = (gameId) => {
  return axios.get('/game', {
    params: {
      gameId
    }
  })
}

export const getSheet = (sheetId) => {
  // TODO: make a real API call!
  return { data: {} }
}

export const addLine = (sheetId, opts) => {
  // TODO: make a real API call!
}