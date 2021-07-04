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
      <div @click="editService" class="service-type-edit">
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

      <button @click="showStore()"></button>
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

export default {
  /**
   *
   * Service component
   * Contains PostCards associated to the service
   */
  name: 'Service',

  data() {
    return {};
  },
  components: {
    PostCard,
  },

  methods: {
    /**
     * Handler for post addition
     */
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
      api.createPost(data.postName, data.postLevel, this.serviceName);
      this.$store.dispatch('updateStore');
    },

    /**
     * Handler for service deletion
     */
    async deleteService() {
      await VueSimpleAlert.confirm(
        'Êtes-vous sûr de vouloir supprimer ce service ?'
      ).then(() => {
        api.deleteService(this.serviceId);
      });
    },

    /**
     * Handler for post service
     */
    async editService() {
      let data = {};
      data = await VueSimpleAlert.fire({
        title: 'Modifier le nom du service',
        text: 'Service',
        showCancelButton: true,
        html: '<input id="swal-input1" class="swal2-input" placeholder="Service">',
        preConfirm: () => {
          return {
            service: `${document.getElementById('swal-input1').value}`,
          };
        },
      });
      data = data.value;
      api.editService(this.serviceId, data.service);
      this.serviceName = data.service;
    },

    /**
     * Gets the current employee occupying the post.
     *
     * @param {String} postId
     * @returns an object with the employee
     */
    getCurrentEmployee(postId) {
      return this.$store.state.employees.filter((employee) => {
        return employee.postId == postId;
      })[0];
    },
  },

  computed: {
    /**
     * Employees from the local store
     */
    employees() {
      return this.$store.state.employees;
    },

    /**
     * Data associated to the service
     *
     * @returns an object with a list of posts and a name associated to the service
     */
    serviceData() {
      return this.$store.state.services.filter((service) => {
        return service.serviceId == this.serviceId;
      })[0];
    },

    /**
     * Posts associated with their employee
     *
     * @returns a list of objects, where each object has a post and its employee as attributes
     */
    posts: {
      get: function () {
        let res = [];
        this.serviceData.posts.forEach((post) => {
          let employee = this.getCurrentEmployee(post.postId);
          post.serviceId = this.serviceData.serviceId;
          res.push({ employee: employee, post: post });
        });
        return res;
      },
      // setter needed for the getter to work
      set: function () {},
    },
  },

  props: {
    serviceName: {
      Type: String,
    },
    serviceId: {
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
      font-size: fit-content;
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
#icon {
  display: inline;
  margin: auto;
  justify-content: center;
  position: relative;
  height: 3%;
  width: 3%;
}
</style>

