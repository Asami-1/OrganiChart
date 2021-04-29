<template>
  <div id="app">
    <Navbar> </Navbar>
    <EmployeeList></EmployeeList>
    <ServiceList></ServiceList>
    <router-view></router-view>

    <button @click="print"></button>
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

  methods: {
    updateSelectableServices() {
      console.log('hi');
    },

    print() {
      console.log('hi');
    },
  },

  computed: {
    servicesSelectable() {
      return this.services;
    },
  },

  watch: {
    servicesSelectable() {
      this.config.options = [];
      this.services.forEach((service) => {
        this.config.options.push({ value: service.id });
      });
      this.dropdownKey += 1;
    },
  },
  data() {
    return {
      dropdownKey: 0,
      employees: [],
      services: [],
      config: {
        options: [],
        prefix: 'Sélectionner un service',
        backgroundColor: 'green',
        width: 400,
      },
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
