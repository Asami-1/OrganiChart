<template>
  <div id="app">
    <Navbar> </Navbar>
    <EmployeeList></EmployeeList>
    <img alt="Vue logo" src="./assets/logo.png" />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
export default {
  name: 'App',
  components: {
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
