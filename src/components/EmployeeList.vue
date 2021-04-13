<template>
  <div class="list">
    <div class="list-header">
      <div class="list-header-inside">
        Employés
        <div class="list-header-searchBar">
          <input
            type="text"
            v-model="search"
            placeholder="Recherher un employé ..."
          />
        </div>
      </div>
    </div>

    <div class="list-center">
      <EmployeeCard
        v-for="employee in employees"
        :key="employee.employeeId"
        :employee-id="employee.employeeId"
        :employee-name="employee.name"
        :employee-surname="employee.surname"
      />
    </div>
    <!-- 
    <div class="list-bottom">
      <button class="Add" v-on:click="AddEmployee()">+</button>
    </div> -->
  </div>
</template>


<script>
import { db } from '../firebase';
import 'firebase/firestore';
import EmployeeCard from './EmployeeCard';

//TODO : fix affichage bouton
/* eslint-disable */ function AddEmployee() {}
export default {
  name: 'EmployeeList',

  data() {
    return {
      employees: null,
      services: null,
    };
  },

  firestore() {
    return {
      employees: db.collection('/Employees'),
      services: db.collection('/Services'),
    };
  },
  methods: {},
  components: {
    EmployeeCard,
  },
};
</script>
<style lang="scss" scoped>
.list {
  width: 20%;
  height: 100%;
  position: fixed;
  right: 0px;
  top: 0px;
  background-color: rgb(102, 231, 231);
  z-index: 1000;
  border-radius: 4% 0% 0% 4%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &-header {
    width: 100%;
    height: 10%;
    top: 0px;
    display: inline-flex;
    position: absolute;
    justify-content: center;

    &-inside {
      width: 80%;
      height: 80%;
      background-color: #ffffff;
      display: inline-flex;
      top: 10px;
      position: absolute;
      border-radius: 15%;
      justify-content: center;
      font-weight: bold;
      padding: 3%;
      border: 1px solid black;
      overflow: hidden;
    }
    &-searchBar {
      position: absolute;
      height: 50%;
      width: 100%;
      bottom: 0px;
    }
  }

  &-center {
    overflow: hidden;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20%;
    height: 75%;
    width: 100%;
  }
  &-bottom {
    height: 20%;
    width: 100%;
    position: fixed;
    bottom: 10px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 1px solid black;
    font-size: 120%;
    &:focus {
      transform: scale(1.05);
    }
  }

  input {
    height: 30px;
    width: 180px;
    &:focus {
      transform: scale(1.05);
    }
  }

  span {
    width: 12rem;
  }
  span:after {
    content: '';
    position: absolute;
    top: 3px;
    bottom: 0;
    left: 85%;
    width: 20px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill-rule='evenodd'%3E%3Cpath d='M16.036 18.455l2.404-2.405 5.586 5.587-2.404 2.404zM8.5 2C12.1 2 15 4.9 15 8.5S12.1 15 8.5 15 2 12.1 2 8.5 4.9 2 8.5 2zm0-2C3.8 0 0 3.8 0 8.5S3.8 17 8.5 17 17 13.2 17 8.5 13.2 0 8.5 0zM15 16a1 1 0 1 1 2 0 1 1 0 1 1-2 0'%3E%3C/path%3E%3C/svg%3E")
      center / contain no-repeat;
  }
}
</style>