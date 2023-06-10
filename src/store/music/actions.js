import axios from 'axios'

export const actions = {
  async doSearch(ctx, searchTerm) {

    try {
      await axios
        .get(`https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=20`)
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
