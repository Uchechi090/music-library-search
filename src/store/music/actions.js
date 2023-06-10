import axios from 'axios'

export const actions = {
  async doSearch(ctx, searchTerm) {
    const url = `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=musicArtist&entity=album&entity=song&limit=20`

    try {
      await axios
        .get(url)
        .then((res) => {
            console.log(res)
            if (res.data.results.length > 0) {
              ctx.commit('setMusic', res.data.results)
              console.log('success!')
            }
        })
    } catch (error) {
      console.log(error)
    }
  }
}
