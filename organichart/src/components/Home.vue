
<template>
  <div id="home">
    <h2>Firebase data :</h2>
    <h1>{{ firebaseData }}</h1>
    <router-link to="Statistiques"> Statistiques</router-link>
  </div>
</template>

<script>
import { db } from '../firebase';

export default {
  name: 'Home',

  data() {
    return {
      firebaseData: null,
    };
  },

  firestore() {
    return {
      firebaseData: db.collection('salaries'),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
