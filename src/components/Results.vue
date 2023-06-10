<template>
  <div class="results" v-for="item in music">
    <div class="result">
      <div class="preview-image"><img :src="item.artworkUrl100" alt="Image Cover" /></div>
      <div class="details">
        <p class="track-name">{{ item.artistName }} - {{ item.trackName }}</p>
        <p class="genre">Genre: {{ item.primaryGenreName }}</p>
        <p class="release-date">
          Released on {{ item.releaseDate }} on Album {{ item.collectionName }}
        </p>
        <span class="view-link"
          ><a :href="item.trackViewUrl" target="_blank">view in iTunes</a></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup(_) {
    const store = useStore()

    const music = computed(() => store.getters['music/listOfMusic'])

    return {
      music
    }
  }
})
</script>

<style lang="scss" scoped>
.results {
  margin: 0 auto;
  width: 700px;
  .result {
    display: flex;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    height: 100px;
    width: 700px;
    margin: 35px 35px 35px 0;
    font-size: smaller;

    .preview-image {
      object-fit: cover;
    }

    .track-name {
      font-weight: bold;
    }

    .genre {
      color: #808080;
    }
    .release-date {
      color: #808080;
      margin-bottom: 5px;
    }

    .view-link {
      a {
        text-decoration: none;
        color: #764abc;
      }
    }
  }
}
</style>
