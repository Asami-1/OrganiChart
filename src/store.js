import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
/**
 * Creates a global store accessible from everywhere in teh
 */
const store = new Vuex.Store({
    state: {
        services: [{
            posts: {},
        }],
        employees: [],
    },
    mutations: {
        updateEmployees(state, newEmployees) {
            state.employees = newEmployees;
        },

        updateServices(state, newServices) {
            state.services = newServices;
        }

    },
    actions: {

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
