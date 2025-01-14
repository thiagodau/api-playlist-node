let playlists = []
const randomId = require('../utils')

module.exports = {
  //GET /playlists
  index: (req, res) => { res.json(playlists) },

  //GET /api/playlists/:id
  show: (req, res) => {
    const { id } = req.params
    const playlist = playlists.find(item => item.id === +id)
    if (!playlist) return res.status(404).json({
      message: 'playlist not found'
    })
    res.json(playlist)
  },
  //POST /api/playlists
  save: (req, res) => {
    const { name, tags, musics } = req.body

    if (typeof name !== 'string') {
      return res.status(400).json({ message: 'Name must be a string' })
    }

    if (!Array.isArray(tags)) {
      return res.status(400).json({ message: 'Tags must be an array' })
    }

    if (musics && !Array.isArray(musics)) {
      return res.status(400).json({ message: 'Musics must be an array' })
    }

    const newPlaylist = {
      id: randomId(),
      name,
      tags,
      musics: musics || []
    }

    playlists.push(newPlaylist)
    res.status(201).json(newPlaylist)
  },

  //PUT /api/playlists/:id
  update: (req, res) => {
    const { id } = req.params
    const { name, tags, musics } = req.body

    const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

    if (playlistIndex === -1) {
      return res.status(404).json({ message: 'Playlist not found' })
    }

    if (typeof name === 'string') {
      playlists[playlistIndex].name = name
    }

    if (tags && Array.isArray(tags)) {
      playlists[playlistIndex].tags = tags
    }

    if (musics && Array.isArray(musics)) {
      playlists[playlistIndex].musics = musics
    }

    res.json(playlists[playlistIndex])
  },
  //DELETE /api/playlists/:id 
  delete: (req, res) => {
    const { id } = req.params
    const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)
    if (playlistIndex === -1) {
      return res.status(404).json({ message: 'Playlist not found' })
    }

    const deletedPlaylist = playlists.splice(playlistIndex, 1)
    res.json({ message: 'Deleted playlist', deletedPlaylist })
  },

  //POST /api/playlists/:id/musics
  addMusic: (req, res) => {
    const { id } = req.params
    const { title, year, artist, album } = req.body

    const playlist = playlists.find(playlist => playlist.id === +id)
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' })
    }

    if (
      typeof title !== 'string' ||
      typeof year !== 'number' ||
      typeof artist !== 'string' ||
      typeof album !== 'string'
    ) {
      res.status(400).json({ message: 'invalid fields' })
    }

    const newMusic = {
      id: randomId(),
      title,
      year,
      artist,
      album
    }

    playlist.musics.push(newMusic)
    res.status(201).json({ message: 'Added a new music.', newMusic })

  },
  //DELETE /api/playlists/:playlistId/musics/:musicId

}