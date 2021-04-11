
<template>
  <div id="home">
    <h2>Firebase data :</h2>
    <h1>{{ firebaseData }}</h1>
    <h1>{{ tempNbPosts }}</h1>

    <router-link to="Statistiques"> Statistiques</router-link>
    <button @click="getStoreInfo"></button>
  </div>
</template>

<script>
import { db } from '../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  name: 'Home',

  data() {
    return {
      firebaseData: null,
      tempNbPosts: 0,
    };
  },

  firestore() {
    return {
      firebaseData: db.collection('salaries'),
    };
  },

  methods: {
    /**
     * Shows store info on the console
     */
    getStoreInfo() {
      db.collection('/Employees')
        .get()
        .then((employees) => {
          console.log("Nombre d'employées : ", employees.size);
        });
      db.collection('/Services')
        .get()
        .then((services) => {
          console.log('\nnombre de services :', services.size);
          services.forEach((service) => {
            service.ref
              .collection('Posts')
              .get()
              .then((postes) => {
                console.log(
                  '\n',
                  service.data().serviceName,
                  ' : ',
                  postes.size,
                  ' postes'
                );
                this.tempNbPosts = this.tempNbPosts + postes.size;
              });
          });
        });
    },

    /**
     * Old function used to set up the database adequately
     */
    updateStore() {
      var array = [];
      array.push(true);
      db.collection('/Employees')
        .get()
        .then((employees) => {
          console.log("nb d'employés : ", employees.size);
          employees.forEach(async (employee) => {
            // employee.ref.update({
            //   status: 0,
            // });
            console.log('pass');
            const serviceRef = db.doc(employee.data().service);

            await db
              .collection('Services')
              .doc(serviceRef.path.split('/')[1])
              .get()
              .then((service) => {
                service.ref
                  .collection('Posts')
                  .get()
                  .then(async (postes) => {
                    var found = false;
                    postes.forEach(async (poste) => {
                      // poste.ref.update({
                      //   isOccupied: false,
                      // });
                      if (
                        !found &&
                        employee.data().postName === poste.data().postName &&
                        !poste.data().isOccupied &&
                        employee.data().status === 0
                      ) {
                        found = true;
                        await employee.ref.update({
                          serviceRef: firebase.firestore.FieldValue.delete(),
                          postRef: firebase.firestore.FieldValue.delete(),
                          status: 1,
                          postId: poste.id,
                          serviceId: service.id,
                        });
                        console.log(employee.data().postName);
                        console.log('found it!!');
                        poste.ref.update({
                          isOccupied: true,
                        });
                      } else {
                        console.log('nothing found');
                      }
                    });
                  });
              });

            //update des employées

            employee.ref
              .update({
                serviceRef: db.doc(employee.data().service),
                status: 0,
                postRef: null,
                isCandidate: false,
              })
              .then(() => {
                console.log('done');
              });

            let servicesRef = db.collection('Services');
            console.log(servicesRef.data);
            // doc.data().service = db.doc('/Services/' + doc.data().service),
          });
        });

      db.collection('/Services')
        .get()
        .then((services) => {
          console.log('nombre de service :', services.size);

          services.forEach((service) => {
            service.ref
              .update({
                serviceName: service.id,
              })
              .then(() => {
                console.log('service updated');
              });

            service.ref
              .collection('Posts')
              .get()
              .then((postes) => {
                console.log(postes.size, 'postes dans le service', service.id);
                postes.forEach((poste) => {
                  poste.ref
                    .update({
                      postCandidates: [],
                      isOccupied: false,
                    })
                    .then(() => {
                      console.log('post updated');
                    });
                });
              });
          });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
