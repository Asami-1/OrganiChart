
<template>
  <div id="app">
    <Navbar> </Navbar>
    <EmployeeList></EmployeeList>
    <ServiceList></ServiceList>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import ServiceList from './components/ServiceList';

export default {
  /**
   * Main component loaded in the #app div in the ./public/index.html by using  the ./main.js script
   */
  name: 'App',
  components: {
    ServiceList,
    Navbar,
    EmployeeList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
