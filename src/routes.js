const express = require('express')
const playlistsController = require('./controllers/playlists-controller')

const router = express.Router()

router.post('/playlists', playlistsController.save), 

router.get('/playlists', playlistsController.index),

router.get('/playlists/:id', playlistsController.show),

module.exports = router