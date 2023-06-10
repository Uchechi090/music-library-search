import { createStore } from 'vuex'

import { music } from '@/store/music/module'

const store = createStore({
  modules: {
    music
  }
})

export default store
