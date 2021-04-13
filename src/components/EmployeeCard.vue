<template>
  <div class="card">
    <div class="card-left">
      <span>{{ this.employeeSurname }}</span>
      <span>{{ this.employeeName }}</span>
      <span>{{ this.employeePost }}</span>
    </div>
    <div class="card-right">
      <button @click="deleteEmployee">Activate it !</button>
    </div>
  </div>
</template>

<script>
// import VueSimpleAlert from 'vue-simple-alert';
import api from '../api';
export default {
  name: 'employeeCard',
  data() {
    return {};
  },
  methods: {
    /**
     * deletes an Employee
     */
    deleteEmployee() {
      console.log(this.employeeId);
      api.deleteEmployee(this.employeeId);
    },
  },
  props: {
    employeeId: {
      type: Number,
    },

    employeeName: {
      type: String,
    },

    employeeSurname: {
      type: String,
    },

    //TODO Ajouter le nom du taf du salarié
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 80%;
  height: 10%;
  padding: 1vw;
  background-color: white;

  display: flex;
  flex-direction: row;

  &-left {
    width: 80%;
  }

  &-right {
    width: 20%;
  }
}
</style>