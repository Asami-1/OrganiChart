import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
/**
 * Creates a global store accessible from everywhere in the application. 
 * Only the "actions" functions should be called.
 * 
 */
const store = new Vuex.Store({
    state: {
        services: [{
            posts: {},
        }],
        employees: [],
    },
    mutations: {
        /**
         *  Updates the employees of the store.
         * 
         * @param {*} state 
         * @param {*} newEmployees 
         */
        updateEmployees(state, newEmployees) {
            state.employees = newEmployees;
        },

        /**
         * Updates the services and the posts of the store
         * 
         * @param {*} state 
         * @param {*} newServices 
         */
        updateServices(state, newServices) {
            state.services = newServices;
        }

    },
    actions: {
        /**
         * Updates the local store 
         */
        async updateStore({ commit }) {
            const employees = await api.getEmployees();
            commit("updateEmployees", (employees));

            const services = await api.getServices();

            commit('updateServices', services);

        },



    },
});
/* eslint-enable no-param-reassign */

export default store;
