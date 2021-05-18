<template>
  <div id="app">
    <Navbar> </Navbar>
    <EmployeeList></EmployeeList>
    <ServiceList></ServiceList>
    <router-view></router-view>
  </div>
</template>

<script>
import { db } from './firebase';
import 'firebase/firestore';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import ServiceList from './components/ServiceList';

export default {
  name: 'App',
  components: {
    ServiceList,
    Navbar,
    EmployeeList,
  },

  firestore() {
    return {
      employees: db.collection('/Employees'),
      services: db.collection('/Services'),
    };
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
