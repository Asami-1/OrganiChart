<template >
  <div class="service">
    <div class="service-type">
      {{ serviceName }}
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
    <div class="service-addPost">
      <button class="service-addPost-button" v-on:click="addPost()">+</button>
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
    async addPost() {
      let data = {};
      data = await VueSimpleAlert.fire({
        title: 'Ajouter un poste',
        text: 'Nom',
        showCancelButton: true,
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Nom du Poste">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Niveau du poste">',

        preConfirm: () => {
          return {
            postName: `${document.getElementById('swal-input1').value}`,
            postLevel: `${document.getElementById('swal-input2').value}`,
          };
        },
      });
      data = data.value;
      console.log(data);
      api.createPost(data.postName, data.postLevel, this.serviceName);
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
/* main */
.service {
  /* Rectangle 1 */
  justify-content: center;
  align-content: center;
  margin: 2vh;
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
  &-addPost {
    height: 7%;
    width: 100%;
    display: flex;
    justify-content: center;
    &-button {
      margin-top: 0.5rem;
      margin-bottom: 2rem;
      padding: 1rem;
      height: 4rem;
      width: 5rem;
      font-size: 2em;
      border-radius: 3em;
      border: 1px solid black;
      background-color: #ffffff;
      cursor: pointer;
      &:focus {
        transform: scale(1.15);
      }
    }
  }
}
</style>

