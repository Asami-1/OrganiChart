<template>
  <div class="post">
    <div :style="{ 'background-color': cardColor }" class="postCard">
      <div class="postCard-top">
        <div @click="deletePost" class="postCard-top-delete">
          <svg
            viewBox="0 0 22 30"
            class="postCard-bot-delete-icon"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.415 10.3963L10.5 13.3113L7.57125 10.3963L5.6325 12.335L8.56125 15.25L5.64625 18.165L7.585 20.1038L10.5 17.1887L13.415 20.1038L15.3538 18.165L12.4388 15.25L15.3538 12.335L13.415 10.3963ZM15.3125 1.5L13.9375 0.125H7.0625L5.6875 1.5H0.875V4.25H20.125V1.5H15.3125ZM2.25 22.125C2.25 23.6375 3.4875 24.875 5 24.875H16C17.5125 24.875 18.75 23.6375 18.75 22.125V5.625H2.25V22.125ZM5 8.375H16V22.125H5V8.375Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="postCard-top-sep"></div>
        <div class="postCard-top-post">
          <p>
            <span>{{ postName }}</span>
          </p>
        </div>
        <div class="postCard-top-sep"></div>

        <div @click="editPost" class="postCard-top-edit">
          <svg
            viewBox="0 0 22 30"
            class="postCard-bot-edit-icon"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              width="100%"
              d="M14.575 8.25L15.75 9.425L4.4 20.75H3.25V19.6L14.575 8.25ZM19.075 0.75C18.7625 0.75 18.4375 0.875 18.2 1.1125L15.9125 3.4L20.6 8.0875L22.8875 5.8C23.375 5.3125 23.375 4.5 22.8875 4.0375L19.9625 1.1125C19.7125 0.8625 19.4 0.75 19.075 0.75ZM14.575 4.7375L0.75 18.5625V23.25H5.4375L19.2625 9.425L14.575 4.7375Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <hr />

      <div class="postCard-bot">
        <div @click="deleteEmployeeFromPost" class="postCard-bot-delete">
          <svg
            viewBox="0 0 22 30"
            class="postCard-bot-delete-icon"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.415 10.3963L10.5 13.3113L7.57125 10.3963L5.6325 12.335L8.56125 15.25L5.64625 18.165L7.585 20.1038L10.5 17.1887L13.415 20.1038L15.3538 18.165L12.4388 15.25L15.3538 12.335L13.415 10.3963ZM15.3125 1.5L13.9375 0.125H7.0625L5.6875 1.5H0.875V4.25H20.125V1.5H15.3125ZM2.25 22.125C2.25 23.6375 3.4875 24.875 5 24.875H16C17.5125 24.875 18.75 23.6375 18.75 22.125V5.625H2.25V22.125ZM5 8.375H16V22.125H5V8.375Z"
              fill="black"
            />
          </svg>
        </div>

        <div class="postCard-bot-sep"></div>
        <div class="postCard-bot-employee">
          <p v-if="employee !== undefined">
            <span>{{ employee.name }}</span
            ><span>{{ employee.surname }}</span>
          </p>
        </div>
        <div class="postCard-bot-sep"></div>

        <div @click="editEmployee" class="postCard-bot-edit">
          <svg
            viewBox="0 0 22 30"
            class="postCard-bot-edit-icon"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              width="100%"
              d="M14.575 8.25L15.75 9.425L4.4 20.75H3.25V19.6L14.575 8.25ZM19.075 0.75C18.7625 0.75 18.4375 0.875 18.2 1.1125L15.9125 3.4L20.6 8.0875L22.8875 5.8C23.375 5.3125 23.375 4.5 22.8875 4.0375L19.9625 1.1125C19.7125 0.8625 19.4 0.75 19.075 0.75ZM14.575 4.7375L0.75 18.5625V23.25H5.4375L19.2625 9.425L14.575 4.7375Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="post-candidate">
      <div class="post-candidate-name">
        <div @click="DelCandidate" class="post-candidate-name-del">
          <svg
            viewBox="0 0 22 30"
            class="postCard-bot-delete-icon"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.415 10.3963L10.5 13.3113L7.57125 10.3963L5.6325 12.335L8.56125 15.25L5.64625 18.165L7.585 20.1038L10.5 17.1887L13.415 20.1038L15.3538 18.165L12.4388 15.25L15.3538 12.335L13.415 10.3963ZM15.3125 1.5L13.9375 0.125H7.0625L5.6875 1.5H0.875V4.25H20.125V1.5H15.3125ZM2.25 22.125C2.25 23.6375 3.4875 24.875 5 24.875H16C17.5125 24.875 18.75 23.6375 18.75 22.125V5.625H2.25V22.125ZM5 8.375H16V22.125H5V8.375Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="post-candidate-name-employee">test</div>
        <div @click="addCandidate" class="post-candidate-add">+</div>
      </div>
    </div>
  </div>
</template>



<script>
import VueSimpleAlert from 'vue-simple-alert';
import api from '../api';
export default {
  name: 'PostCard',

  data() {
    return {};
  },

  methods: {
    editPost() {},
    async deletePost() {
      await VueSimpleAlert.confirm(
        'Êtes-vous sûr de vouloir supprimer ce poste ?'
      ).then(() => {
        // api.deletePost(this.post);
      });
    },

    /**
     * Edits the employee affected to the current post.
     */
    async editEmployee() {
      let data = {};
      data = await VueSimpleAlert.fire({
        title: 'Affecter un employé',
        text: 'Nom',
        showCancelButton: true,
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Nom">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Prénom">',

        preConfirm: () => {
          return {
            name: `${document.getElementById('swal-input1').value}`,
            surname: `${document.getElementById('swal-input2').value}`,
          };
        },
      });
      data = data.value;
      const newEmployeeName = data.name.toLowerCase();
      const newEmployeeSurname = data.surname.toLowerCase();

      // Retrieve arrays of name and surname
      const employeeNames = this.$store.state.employees.map((employee) => {
        return employee.name.toLowerCase();
      });
      const employeeSurnames = this.$store.state.employees.map((employee) => {
        return employee.surname.toLowerCase();
      });

      // Check user input
      if (
        employeeSurnames.includes(newEmployeeSurname) &&
        employeeNames.includes(newEmployeeName)
      ) {
        //Retrieve corresponding employee's data
        let employeeData = this.$store.state.employees[
          employeeSurnames.indexOf(newEmployeeSurname)
        ];

        if (this.employee !== undefined) {
          data = { postId: 'NA' };
          await api.updateEmployee(this.employee.employeeId, data);
          data = { isOccupied: false };
          await api.updatePost(this.postId, this.serviceId, data);
        }

        // Change Service if affected to a new one
        if (employeeData.serviceId != this.serviceId) {
          employeeData.serviceId = this.serviceId;
        }

        // modify data and update
        employeeData.postName = this.postName;
        employeeData.postId = this.postId;
        employeeData.status = 1;
        await api.updateEmployee(employeeData.employeeId, employeeData);
        await api.updatePost(this.postId, this.serviceId, {
          isOccupied: true,
        });
        this.$store.dispatch('updateStore');
      } else {
        await VueSimpleAlert.confirm("Erreur : L'employé n'existe pas");
      }
    },

    // faire en plus propre si temps il y a
    async deleteEmployeeFromPost() {
      await VueSimpleAlert.confirm(
        "Êtes-vous sûr de vouloir retirer l'employé de ce poste ?"
      ).then(() => {
        api.deleteEmployeeFromPost(
          this.employee.employeeId,
          this.postId,
          this.serviceId
        );
      });
      this.$store.dispatch('updateStore');
    },

    async delCandidate() {
      await VueSimpleAlert.confirm(
        'Êtes-vous sûr de vouloir supprimer ce candidat ?'
      ).then(() => {
        // api.deleteEmployee(this.employeeId);
      });
    },

    async addCandidate() {
      const { value: employeeId } = await VueSimpleAlert.fire({
        title: 'Ajouter un candidat',
        input: 'select',
        inputOptions: this.employeesOption,
        inputPlaceholder: 'Selectionner un employé',
        showCancelButton: true,
      });
      api.addCandidate(this.postId, this.serviceId, employeeId);
    },
  },

  computed: {
    employees() {
      return this.$store.state.employees;
    },

    employeesOption() {
      let res = {};
      this.employees.forEach((employee) => {
        res[employee.employeeId] = employee.surname + ' ' + employee.name;
      });
      return res;
    },

    cardColor() {
      var color = '';
      if (!this.isOccupied) {
        color = '#FFFAF0';
      } else if (this.employee !== undefined) {
        if (this.employee.employeeStatus == '1') {
          color = '#7FFF00';
        } else if (this.employee.employeeStatus == '2') {
          color = '#FF8C00';
        } else if (this.employee.employeeStatus == '3') {
          color = '#F08080';
        }
      }

      return color;
    },
  },

  props: {
    employee: {
      type: Object,
    },
    serviceId: {
      type: String,
      default: 'DEFAULT NAME',
    },
    postLevel: {
      type: String,
    },
    postName: {
      type: String,
      default: 'DEFAULT NAME',
    },
    postId: {
      type: String,
    },
    postCandidates: {
      type: Array,
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
  },
};
</script>


<style lang="scss" scoped>
p span {
  display: block;
}

hr {
  border: none;
  color: black;
  background-color: black;
  height: 2%;
  width: 100%;
  margin-block-start: 0%;
  margin-block-end: 0%;
}
svg {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.postCard {
  /* Rectangle 1 */

  height: 20vh;
  width: 22vh;
  /* Orange */
  border: 2px solid #000000;
  box-sizing: border-box;
  border-radius: 35px;
  &-top {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    &-sep {
      position: relative;
      width: 1%;
      height: 100%;
      background-color: black;
    }
    &-delete {
      display: flex;
      left: 0px;
      width: 18%;
      height: 100%;
      cursor: pointer;

      &-icon {
        margin: auto;
        margin-bottom: 40%;
        position: relative;
        height: 70%;
        width: 70%;
      }
    }
    &-post {
      width: 63%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 1.5vh;
    }
    &-edit {
      display: flex;
      right: 0px;
      width: 18%;
      height: 100%;

      &-icon {
        margin: auto;
        position: relative;
        margin-bottom: 40%;
        height: 70%;
        width: 70%;
      }
    }
  }
  &-bot {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    &-sep {
      position: relative;
      width: 1%;
      height: 98%;
      background-color: black;
    }
    &-delete {
      display: flex;
      left: 0px;
      width: 18%;
      height: 100%;
      cursor: pointer;

      &-icon {
        margin: auto;
        margin-top: 15%;
        position: relative;
        height: 70%;
        width: 70%;
      }
    }
    &-employee {
      width: 63%;
      font-size: 2vh;
      font-weight: bold;
    }
    &-edit {
      display: flex;
      right: 0px;
      width: 18%;
      height: 100%;
      cursor: pointer;

      &-icon {
        margin: auto;
        position: relative;
        margin-top: 15%;
        height: 70%;
        width: 70%;
      }
    }
  }
}
.post {
  &-candidate {
    height: 3vh;
    width: 22vh;
    display: flex;
    font-size: 2.3vh;

    &-name {
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: left;
      &-del {
        width: 20%;
        cursor: pointer;
      }
      &-employee {
        width: 80%;
      }
    }
    &-add {
      width: 15%;
      top: 0px;
      font-size: 2.5vh;
      cursor: pointer;
    }
  }
}
</style>