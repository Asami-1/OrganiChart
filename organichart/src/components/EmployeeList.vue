<template>
  <div class="List">
    <div class="employees">Employés</div>
    <span class="form">
      <input type="text" v-model="search" placeholder="Search title.." />
    </span>
  </div>
</template>
<script>
export default {
  name: 'EmployeeList',
};
</script>
<style lang="scss" scoped>
.List {
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
  overflow-y: scroll;
}
.employees {
  width: 50%;
  background-color: #ffffff;
  display: inline-flex;
  top: 10px;
  border-radius: 15%;
  position: absolute;
  justify-content: center;
  font-weight: bold;
  padding: 3%;
  border: 1px solid black;
}
input {
  height: 30px;
  width: 180px;
}
.form {
  height: 30px;
  position: absolute;
  top: 80px;
}
span {
  position: relative;
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
</style>