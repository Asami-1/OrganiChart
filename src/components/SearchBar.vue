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
      await this.$emit('update', this.search);
    },
  },
};
</script>

<style lang="scss" scoped>
.searchBar {
  // height: 100px;
  // width: 100px;
  // display: flex;
  // flex-direction: row;
  &-input {
    // font-weight: 550;
    opacity: 0.5;
    color: black;
    font-size: 0.85em;
    width: 80%;
    &:focus {
      transform: scale(1.1);
    }
    // height: 100%;
    // padding-left: 20px;
  }
}
</style>
