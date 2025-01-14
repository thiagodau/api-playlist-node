let playlists = []

module.exports = {
  //GET /playlists
  index: (req, res) => { res.json(playlists) },

  //GET /playlists/:id
  show: (req, res) => {
    const { id } = req.params
    const playlist = playlists.find(item => item.id === +id)
    if (!playlist) return res.status(404).json({
      message: 'playlist not found'
    })
    res.json(playlist)
  },
  //POST /playlists
  save: (req, res) => {
    const { name, tags, musics } = req.body

    if (typeof name !== 'string') {
      return res.status(400).json({ message: 'Name must be a string' })
    }

    if (!Array.isArray(tags)) {
      return res.status(400).json({ message: 'Tags must be an array' })
    }

    const newPlaylist = {
      id: Math.floor(Math.random() * 99999),
      name,
      tags,
      musics: musics || []
    }

    playlists.push(newPlaylist)
    res.status(201).json(newPlaylist)
  },

  //PUT /playlists/:id
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
  //DELETE /playlists/:id 
  delete: (req, res) => {
    const { id } = req.params
    const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)
    if (playlistIndex === -1) {
      return res.status(404).json({ message: 'Playlist not found' })
    }

    const deletedPlaylist = playlists.splice(playlistIndex, 1)  
    res.json({message: 'Deleted playlist' , deletedPlaylist } )
  }
}