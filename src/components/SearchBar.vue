<template>
  <div class="searchBar">
    <input
      @keyup="filter"
      class="searchBar-input"
      type="text"
      v-model="search"
      placeholder="Rechercher un employé ..."
    />
  </div>
</template>
<script>
export default {
  /**
   * Search bar component.
   */
  name: 'SearchBar',
  data() {
    return {
      search: '',
    };
  },

  methods: {
    /**
     * Sends the filtering text to the parent component
     */
    async filter() {
      this.$emit('update', this.search);
    },
  },
};
</script>

<style lang="scss" scoped>
.searchBar {
  &-input {
    // font-weight: 550;
    opacity: 0.5;
    color: black;
    font-size: 0.85em;
    width: 80%;
    &:focus {
      transform: scale(1.1);
    }
  }
}
</style>
