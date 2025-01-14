const express = require('express')
const playlistsController = require('./controllers/playlists-controller')

const playlistsRouter = express.Router()

//Playlists
playlistsRouter.post('/', playlistsController.save), 

playlistsRouter.get('/', playlistsController.index),

playlistsRouter.get('/:id', playlistsController.show),

playlistsRouter.put('/:id', playlistsController.update),

playlistsRouter.delete('/:id', playlistsController.delete)

//Musics on playlists
playlistsRouter.post('/:id/musics', playlistsController.addMusic)

playlistsRouter.delete('/:playlistId/musics/:musicId', playlistsController.removeMusic)

module.exports = playlistsRouter