<template>
  <div>
    <div class="search-bar">
      <span class="icon">
        <fa-icon icon="fa-solid fa-magnifying-glass" />
      </span>
      <input
        type="text"
        v-model="searchTerm"
        @keyup="searchLibrary()"
        class="search-input"
        name="search"
      />
      <span :class="isLoading ? 'spinner' : 'spinner--hidden'"></span>
      <!-- <span class="spinner"></span> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup(_) {
    const store = useStore()

    const searchTerm = ref('')
    const isLoading = ref(false)
    const errors = ref('')

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
</style>
