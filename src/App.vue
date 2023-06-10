<template>
  <div class="container">
    <h2>MusicSearch</h2>
    <Search />
    <Results />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import Search from './components/Search.vue'
import Results from './components/Results.vue'

export default defineComponent({
  components: {
    Search,
    Results
  },
  setup(_) {

    return {}
  }
})
</script>

<style lang="scss" scoped>
.container {
  h2 {
    font-weight: bold;
    font-style: italic;
    display: flex;
    justify-content: center;
  }
}
</style>
