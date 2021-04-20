import { db } from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {


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

    /**
     * create an employee
     */
    createEmployee(
        isCandidate = false,
        name,
        surname,
        postName = null,
        status = 0
    ) {
        db.collection('/Employees')
            .add({
                isCandidate: isCandidate,
                name: name,
                postId: null,
                postName: postName,
                service: null,
                serviceId: null,
                status: status,
                surname: surname,
            })
            .then((employee) => {
                console.log(employee.id, employee.path);
                db.doc(employee.path).update({
                    employeeId: employee.id,
                });
                console.log('Employee successfully added!');
            })
            .catch((error) => {
                console.error('Error saving employee: ', error);
            });
    },
    /**
     * deletes an Employee
     */
    deleteEmployee(employeeID) {
        console.log(employeeID);
        db.collection('/Employees')
            .doc(employeeID)
            .delete()
            .then(() => {
                console.log('Employee successfully deleted!');
            })
            .catch((error) => {
                console.error('Error removing document: ', error);
            });
    },

    updateEmployee(employeeId, data) {
        let userRef = db.doc('/Employees/' + employeeId);
        userRef.update(data);
    },
    //TODO Retrieve the lowest service level and set the created one's to retrievedLevel + 1
    /**
     * creates a service
     */
    createService(serviceLevel = 1, serviceName) {
        db.collection('/Services')
            .doc(serviceName)
            .set({
                serviceLevel: serviceLevel,
                serviceName: serviceName,
            })
            .then(() => {
                console.log('Service successfully added!');
            })
            .catch((error) => {
                console.error('Error saving Service: ', error);
            });
    },

    //TODO implement it
    /**
     * create an employee
     */
    // createPost(postLevel = 1, postName) {
    //   db.collection('/Posts')
    //     .add({
    //       isCandidate: isCandidate,
    //       name: name,
    //       postId: undefined,
    //       postName: postName,
    //       service: undefined,
    //       serviceId: undefined,
    //       status: status,
    //       surname: surname,
    //     })
    //     .then(() => {
    //       console.log('Employee successfully added!');
    //     })
    //     .catch((error) => {
    //       console.error('Error saving employee: ', error);
    //     });
    // },

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
};
