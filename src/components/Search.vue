<template>
  <div>
    <div class="search-bar">
      <span class="icon">
        <fa-icon icon="fa-solid fa-magnifying-glass" />
      </span>
      <input
        type="text"
        v-model="searchTerm"
        @input="handleChange()"
        @keyup="searchLibrary()"
        @keyup.enter="searchLibrary()"
        class="search-input"
        name="search"
      />
      <span :class="isLoading ? 'spinner' : 'spinner--hidden'"></span>
    </div>
    <div
      class="suggestions"
      v-if="artistMatches.length || songMatches.length || albumMatches.length"
    >
      <div class="types">
        <span class="type">ARTIST</span>
        <span class="list" v-for="item in artistMatches" @click="setSearchTerm(item.artistName)">{{
          item.artistName
        }}</span>
      </div>
      <div class="types">
        <span class="type">SONG</span>
        <span class="list" v-for="item in songMatches" @click="setSearchTerm(item.trackName)">{{
          item.trackName
        }}</span>
      </div>
      <div class="types">
        <span class="type">ALBUM</span>
        <span
          class="list"
          v-for="item in albumMatches"
          @click="setSearchTerm(item.collectionName)"
          >{{ item.collectionName }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup(_) {
    const store = useStore()

    const searchTerm = ref('')
    const isLoading = ref(false)
    const errors = ref('')

    const music = computed(() => store.getters['music/listOfMusic'])

    const artistMatches = ref([])
    const albumMatches = ref([])
    const songMatches = ref([])

    const setSearchTerm = (text) => {
      searchTerm.value = text
    }

    const handleChange = () => {
      if (searchTerm.value.length > 0) {
        artistMatches.value = music.value
          .filter((item) => {
            const regex = new RegExp(`${searchTerm}`, 'gi')
            console.log(item.artistName.match(regex))
            return item.artistName.match(regex)
          })
          .slice(0, 3)
        albumMatches.value = music.value
          .filter((item) => {
            const regex = new RegExp(`${searchTerm}`, 'gi')
            return item.collectionName.match(regex)
          })
          .slice(0, 3)
        songMatches.value = music.value
          .filter((item) => {
            const regex = new RegExp(`${searchTerm}`, 'gi')
            return item.trackName.match(regex)
          })
          .slice(0, 3)
      }
    }

    const searchLibrary = async () => {
      try {
        isLoading.value = true
        await store.dispatch('music/doSearch', { searchTerm })
        isLoading.value = false
      } catch (err) {
        errors.value = err.message || 'An error occurred, please try again later.'
        isLoading.value = false
        return errors
      }
    }

    return {
      searchTerm,
      isLoading,
      artistMatches,
      albumMatches,
      songMatches,
      setSearchTerm,
      handleChange,
      searchLibrary
    }
  }
})
</script>

<style lang="scss" scoped>
.search-bar {
  border: none;
  border-radius: 10px;
  width: 700px;
  height: 40px;
  padding: 0 12px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 auto;

  .search-input {
    height: 38px;
    width: 614px;
    margin-left: 15px;
    border: none;
    outline: none;
  }

  .spinner {
    position: fixed;
    top: 5rem;
    left: 65rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.75s, visibility 0.75s;
  }

  .spinner--hidden {
    opacity: 0;
    visibility: hidden;
  }

  .spinner::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #dddddd;
    border-top-color: #33adff;
    border-radius: 50%;
    animation: loading 0.75s ease infinite;
  }

  @keyframes loading {
    from {
      transform: rotate(0turn);
    }
    to {
      transform: rotate(1turn);
    }
  }
}

.suggestions {
  margin: 0 auto;
  width: 700px;
  border: none;
  font-size: 14px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  .types {
    display: flex;
    flex-direction: column;

    .type {
      color: #808080;
      font-size: smaller;
      padding-left: 3px;
    }

    .list {
      padding-left: 6px;
      cursor: pointer;
    }
    .list:hover {
      background-color: #e9f1fb;
    }
  }
}
</style>
