<template>
  <div class="services">
    <div class="services-header">
      <vue-dropdown
        @setSelectedOption="updateSelectedService($event)"
        :config="config"
        :key="dropdownKey"
      ></vue-dropdown>
    </div>
    <div class="services-body">
      <Service
        v-for="service in services"
        :key="service.serviceName"
        :service-name="service.serviceName"
      ></Service>
    </div>
  </div>
</template>

<script>
//TODO: Add possibility to add a service on the header
import VueDropdown from 'vue-dynamic-dropdown';
import Service from './Service';

export default {
  name: 'ServiceList',
  data() {
    return {
      // Necessary to fix a key to the dropdown
      dropdownKey: 0,
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

  methods: {
    updateSelectedService($event) {
      this.config.prefix = $event.value;
    },
  },

  computed: {
    // this is temporary for debugging purpose
    services() {
      return this.$store.state.services;
    },
    servicesSelectable() {
      return this.services;
    },
  },

  watch: {
    services() {
      this.config.options = [];
      this.services.forEach((service) => {
        this.config.options.push({ value: service.serviceName });
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