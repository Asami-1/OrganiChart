<template>
  <div class="services">
    <div class="services-header">
      <vue-dropdown
        @click="updateSelectableServices"
        @setSelectedOption="updateSelectedService($event)"
        :config="config"
        :key="dropdownKey"
      ></vue-dropdown>
    </div>
    <div class="services-body">
      <Service></Service>
    </div>
  </div>
</template>

<script>
import VueDropdown from 'vue-dynamic-dropdown';
import Service from './Service';

import { db } from '../firebase';
import 'firebase/firestore';
export default {
  name: 'ServiceList',
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
  components: {
    VueDropdown,
    Service,
  },

  firestore() {
    return {
      employees: db.collection('/Employees'),
      services: db.collection('/Services'),
    };
  },

  methods: {
    updateSelectedService($event) {
      this.config.prefix = $event.value;
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
};
</script>

<style lang="scss" scoped>
.services {
  bottom: 0%;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  &-header {
    margin-top: 10vh;
  }
  &-body {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
    height: 80%;
  }
}
</style>