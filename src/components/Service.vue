<template >
  <div class="service">
    <div class="service-type">
    {{ serviceName }}
    </div>
    <div class="service-card">
    <PostCard class="service-card-post"
      v-for="post in posts"
      :key="post.post.postId"
      :employee="post.employee"
      :serviceId="post.post.postName"
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
// import api from '../api';
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
  margin:2em;
  background:green;
  &-card { 
    display:flex;
    justify-content: center;
    width:100%;
    position:relative;
    flex-wrap: wrap;
    &-post{
      width:15%;
      margin:1em;
      background:white;
    }

  }
  &-type{
    display: inline-block;
    justify-content: center;
    width:60%;
    border: 3px solid black;
    font-size:120%;
    position:relative;
    padding:0.3em;
    border-radius: 10px;
    margin-bottom:2em;
  }
&-separator{
   position: relative;
    display: block;
    width: 90%;
    margin:3em;
    border-bottom: 3px solid black;
  
}
}
</style>

