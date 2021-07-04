import { db } from './firebase';
import firebase from 'firebase/app';

export default {
    /**
     * Employees getter
     * 
     * @returns a list of objects with the employees data
     */
    async getEmployees() {
        let res = [];
        await db.collection('/Employees').get().then(employees => {
            employees.forEach(employee => {
                res.push(employee.data());

            });
        });
        return res
    },

    /**
     * Employee getter
     * 
     * @param {String} employeeId 
     * @returns an object with the data
     */
    async getEmployee(employeeId) {
        var employeeData;
        await db.doc('/Employees/' + employeeId).get().then((employee) => {
            employeeData = employee.data();
        })
        return Promise.resolve(employeeData);


    },

    /**
     * Creates an employee 
     * 
     * @param {boolean} isCandidate 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} postName 
     * @param {Number} status 
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
     * Creates a post 
     * 
     * @param {String} postName 
     * @param {String} postLevel 
     * @param {String} serviceName 
     */
    createPost(postName, postLevel, serviceName) {
        const postId = Date.now().toString();
        db.collection('Services/' + serviceName + '/Posts').doc(postId).set({
            isOccupied: false,
            postCandidates: [],
            postId: postId,
            postLevel: postLevel,
            postName: postName,

        })
    },

    /**
     * Deletes an employee
     * 
     * @param {String} employeeID 
     */
    deleteEmployee(employeeID) {
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

    /**
     * Deletes a post
     * 
     * @param {String} postId 
     * @param {String} serviceId 
     */
    deletePost(postId, serviceId) {
        db.doc('Services/' + serviceId + '/Posts/' + postId).delete().then(() => {
            console.log('Post successfully deleted!');
        })
            .catch((error) => {
                console.error('Error removing document: ', error);
            });

    },

    /**
     * Edits a service
     * 
     * @param {String} serviceId 
     * @param {String} newService 
     */
    editService(serviceId, newService) {
        db.collection('Services').doc(serviceId).get()
            .then((service) => {
                service.ref.update({ serviceName: newService })
            })
    },

    /**
     * Deletes a services
     * 
     * @param {String} serviceId 
     */
    deleteService(serviceId) {
        db.collection('/Services/')
            .doc(serviceId)
            .delete(serviceId)
            .then(() => {
                console.log('Service successfully deleted!');
            })
            .catch((error) => {
                console.error('Error removing document: ', error);
            });
    },

    /**
     * Take out an employee from the given post.
     * 
     * @param {String} employeeId 
     * @param {String} postId 
     * @param {String} serviceId 
     */
    deleteEmployeeFromPost(employeeId, postId, serviceId) {
        var employeeRef = db.doc('/Employees/' + employeeId);
        employeeRef.update(
            {
                postId: 'NA',
                status: 0
            }
        )
        var postRef = db.doc('Services/' + serviceId + '/Posts/' + postId);
        postRef.update(
            {
                isOccupied: false,

            }
        )
    },

    /**
     * Employee update
     * 
     * @param {String} employeeId 
     * @param {*} data 
     */
    async updateEmployee(employeeId, data) {
        let userRef = db.doc('/Employees/' + employeeId);
        await userRef.update(data);
    },

    /**
     * Post update
     * 
     * @param {String} postId 
     * @param {String} serviceId 
     * @param {*} data 
     */
    async updatePost(postId, serviceId, data) {
        var postRef = db.doc('Services/' + serviceId + '/Posts/' + postId);
        await postRef.update(data);
    },

    /**
     * Creates a service
     * 
     * @param {Number} serviceLevel 
     * @param {String} serviceName 
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



    async addCandidate(postId, serviceId, employeeId) {
        this.updateEmployee(employeeId, { isCandidate: true });
        var employeeData = await this.getEmployee(employeeId);
        var postRef = db.doc('Services/' + serviceId + '/Posts/' + postId);
        postRef.update({
            postCandidates: firebase.firestore.FieldValue.arrayUnion(employeeData)
        })

    },

    /**
    * Service getter
    * Gets the posts of a given service
    * 
    * @param {String} serviceId 
    * @returns a list of objects
    */
    async getServicePosts(serviceId) {
        let res = [];
        await db.doc('/Services/' + serviceId).collection('Posts')
            .get()
            .then((posts) => {
                posts.forEach(post => {
                    res.push(post.data());
                });
            })
        return res;
    },

    /**
     * Services getter
     * 
     * @returns a list of objects
     */
    async getServices() {
        let res = [];
        await db.collection("/Services").get().then(
            (services) => {
                services.forEach(async (service) => {
                    let currentService = service.data();
                    let servicePosts = await this.getServicePosts(service.id);
                    res.push({ serviceName: currentService.serviceName, posts: servicePosts, serviceId: service.id });
                });
            }
        )
        return res;
    },

    //-------------------------------------------------------------------------- DEBBUGING PURPOSES -----------------------------------------------------------------------------//

    /**
     * Shows the back-end database info in the console
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