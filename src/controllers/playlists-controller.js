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
  }

  //PUT /playlists/:id

  //DELETE /playlists/:id 

}