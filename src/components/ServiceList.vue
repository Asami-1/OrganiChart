
<template>
  <div class="services">
    <div class="services-header">
      <!-- TODO : Fix the drop down or use another one -->
      <vue-dropdown
        @setSelectedOption="updateSelectedService($event)"
        :config="config"
        :key="dropdownKey"
      ></vue-dropdown>
    </div>
    <div class="services-body">
      <Service
        v-for="service in services"
        :key="service.serviceId"
        :service-name="service.serviceName"
        :service-id="service.serviceId"
      ></Service>
    </div>
  </div>
</template>

<script>
import VueDropdown from 'vue-dynamic-dropdown';
import Service from './Service';

export default {
  /**
   * Service List component, Contains Services and a dropdown
   *
   */
  name: 'ServiceList',
  data() {
    return {
      // Necessary to fix a key to the dropdown
      dropdownKey: 0,
      // Dropdown option
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
    /**
     * Updates the selected service in the dropdown
     * Triggers whenever an item is selected
     */
    updateSelectedService($event) {
      this.config.prefix = $event.value;
    },
  },

  computed: {
    /**
     * Local store's services
     *
     * @returns a list of object with services
     */
    services() {
      return this.$store.state.services;
    },
    servicesSelectable() {
      return this.services;
    },
  },

  watch: {
    /**
     * Updates the dropdown's options whenever an update occurs in the local store.
     */
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