
<template>
  <div class="statistiques">
    <h1>This is Stats page</h1>
    <router-link to="Home"> Home page</router-link>
  </div>
</template>

<script>
export default {
  /**
   * Stats page
   */

  //TODO: whole page

  name: 'Statistiques',
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
