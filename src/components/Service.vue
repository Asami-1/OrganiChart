<template >
  <div class="service">
    <div class="service-type">
      <div @click="deleteService" class="service-type-del">
        <svg
          id="icon"
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
      <div class="service-type-name">
        {{ serviceName }}
      </div>
      <div class="service-type-edit">
        <svg
          id="icon"
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
    <div class="service-card">
      <PostCard
        class="service-card-post"
        v-for="post in posts"
        :key="post.post.postId"
        :employee="post.employee"
        :serviceId="post.post.serviceId"
        :postLevel="post.post.postLevel"
        :postName="post.post.postName"
        :postId="post.post.postId"
        :postCandidates="post.post.postCandidates"
        :isOccupied="post.post.isOccupied"
      ></PostCard>
      <!-- Debbugging purposes -->
      <!-- <button @click="activate()"></button>
    <button @click="clear()"></button>
    <button @click="showStore()"></button> -->
    </div>
    <div class="service-separator"></div>
  </div>
</template>


<script>
import PostCard from './PostCard';
import VueSimpleAlert from 'vue-simple-alert';
import api from '../api';
// import { db } from '../firebase';
// import 'firebase/firestore';
export default {
  name: 'Service',

  data() {
    return {};
  },
  components: {
    PostCard,
  },

  methods: {
    async deleteService() {
      await VueSimpleAlert.confirm(
        'Êtes-vous sûr de vouloir supprimer ce service ?'
      ).then(() => {
        api.deleteService(this.serviceName);
      });
    },
    showStore() {
      console.log(this.$store.state.services);
    },

    // Debugging Stuff //
    // clear() {
    //   db.collection('/Employees')
    //     .get()
    //     .then((employees) => {
    //       employees.forEach((employee) => {
    //         employee.ref.update({
    //           status: 0,
    //         });
    //       });
    //     });
    //   db.collection('/Services')
    //     .get()
    //     .then((services) => {
    //       services.forEach((service) => {
    //         service.ref
    //           .collection('/Posts')
    //           .get()
    //           .then((posts) => {
    //             posts.forEach((post) => {
    //               console.log(post.ref.postName);
    //               post.ref.update({
    //                 test: true,
    //                 isOccupied: false,
    //               });
    //             });
    //           });
    //       });
    //     });
    // },

    // activate() {
    //   var lockedId = [];
    //   this.employees.forEach(async (employee) => {
    //     await db
    //       .doc(employee.service)
    //       .get()
    //       .then(async (service) => {
    //         service.ref
    //           .collection('/Posts')
    //           .get()
    //           .then(async (postes) => {
    //             var found = false;
    //             postes.forEach(async (poste) => {
    //               if (
    //                 !lockedId.includes(poste.data().postId) &&
    //                 !poste.data().isOccupied &&
    //                 poste.data().postName == employee.postName &&
    //                 !found
    //               ) {
    //                 found = true;
    //                 lockedId.push(poste.data().postId);
    //                 await poste.ref.update({
    //                   isOccupied: true,
    //                 });
    //                 let userRef = db.doc('/Employees/' + employee.employeeId);
    //                 userRef.update({
    //                   status: 1,
    //                   postId: poste.data().postId,
    //                 });
    //               }
    //             });
    //           });
    //       });
    //   });
    //   db.collection('Employees')
    //     .where('serviceId', '==', 'CONTROLE QUALITE')
    //     .get()
    //     .then(async (employees) => {
    //       employees.forEach(async (employee) => {
    //         console.log(
    //           "Recherche du poste de l'employé ",
    //           employee.data().surname,
    //           '...\n'
    //         );
    //         console.log();
    //         // await db
    //         //   .doc(employee.data().service)
    //         //   .get()
    //         //   .then(async (service) => {
    //         //     var found = false;
    //         //     await service.ref
    //         //       .collection('Posts')
    //         //       .get()
    //         //       .then(async (postes) => {
    //         //         postes.forEach(async (poste) => {
    //         //           if (
    //         //             !this.usedId.includes(poste.id) &&
    //         //             !found &&
    //         //             !poste.data().isOccupied &&
    //         //             poste.data().postName == employee.data().postName &&
    //         //             employee.data().status == 0
    //         //           ) {
    //         //             found = true;
    //         //             await poste.ref.update({
    //         //               isOccupied: true,
    //         //             });
    //         //             await employee.ref.update({
    //         //               status: 1,
    //         //               postId: poste.id,
    //         //             });
    //         //             console.log(this.usedId);
    //         //             this.usedId.push(poste.id);
    //         //             console.log(
    //         //               "L'employé",
    //         //               employee.data().surname,
    //         //               'a le statut ',
    //         //               employee.data().status,
    //         //               'a été attribué au poste : ',
    //         //               poste.data().postName,
    //         //               'du service : ',
    //         //               service.data().serviceName,
    //         //               '\n'
    //         //             );
    //         //           }
    //         //         });
    //         //       });
    //         //   });
    //       });
    //     });
    // },

    getCurrentEmployee(postId) {
      return this.$store.state.employees.filter((employee) => {
        return employee.postId == postId;
      })[0];
    },
  },

  computed: {
    employees() {
      return this.$store.state.employees;
    },
    serviceData() {
      return this.$store.state.services.filter((service) => {
        return service.serviceName == this.serviceName;
      })[0];
    },
    posts: {
      get: function () {
        let res = [];
        this.serviceData.posts.forEach((post) => {
          let employee = this.getCurrentEmployee(post.postId);
          post.serviceId = this.serviceData.serviceName;
          res.push({ employee: employee, post: post });
        });
        return res;
      },
      // setter
      set: function () {},
    },
  },

  props: {
    serviceName: {
      Type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
.service {
  margin: 2vh;
  &-type {
    &-name {
      justify-content: center;
      display: inline-flex;
      width: 85%;
      height: 100%;
      font-size: 2.5vh;
      font-weight: bold;
    }
    &-del {
      display: inline;
      cursor: pointer;
    }
    &-edit {
      display: inline;
      cursor: pointer;
    }
  }
  &-card {
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
    flex-wrap: wrap;
    &-post {
      width: 17vh;
      margin: 3vh;
      padding: 2vh;
    }
  }
  &-type {
    display: inline-block;
    justify-content: center;
    width: 60%;
    border: 3px solid black;
    font-size: 120%;
    position: relative;
    padding: 0.3em;
    border-radius: 10px;
    margin-bottom: 2em;
  }
  &-separator {
    position: relative;
    display: block;
    width: 90%;
    margin: 3em;
    border-bottom: 3px solid black;
  }
}
#icon {
  display: inline;
  margin: auto;
  justify-content: center;
  position: relative;
  height: 3%;
  width: 3%;
}
</style>

