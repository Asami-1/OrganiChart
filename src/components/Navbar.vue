<template>
  <div class="nav">
    <router-link to="/"
      ><div class="Links">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 460.3 460.3"
        >
          <path
            d="M230.1 120.9L66 256.3c0 0.2 0 0.5-0.1 0.9 -0.1 0.4-0.1 0.7-0.1 0.9v137c0 4.9 1.8 9.2 5.4 12.8 3.6 3.6 7.9 5.4 12.8 5.4h109.6V303.7h73.1v109.6h109.6c4.9 0 9.2-1.8 12.8-5.4 3.6-3.6 5.4-7.9 5.4-12.8V258c0-0.8-0.1-1.3-0.3-1.7L230.1 120.9z"
          />
          <path
            d="M457.1 225.4L394.6 173.5V57c0-2.7-0.9-4.9-2.6-6.6 -1.7-1.7-3.9-2.6-6.6-2.6h-54.8c-2.7 0-4.9 0.9-6.6 2.6 -1.7 1.7-2.6 3.9-2.6 6.6v55.7l-69.7-58.2c-6.1-4.9-13.3-7.4-21.7-7.4 -8.4 0-15.6 2.5-21.7 7.4L3.2 225.4c-1.9 1.5-2.9 3.6-3.1 6.1 -0.2 2.6 0.5 4.8 2 6.7l17.7 21.1c1.5 1.7 3.5 2.8 6 3.1 2.3 0.2 4.6-0.5 6.9-2L230.1 95.8l197.6 164.7c1.5 1.3 3.5 2 6 2h0.9c2.5-0.4 4.5-1.4 6-3.1l17.7-21.1c1.5-1.9 2.2-4.1 2-6.7C460.1 229 459 227 457.1 225.4z"
          />
        </svg>
      </div>
    </router-link>
    <router-link to="/Statistiques"
      ><div class="Links">
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          width="100%"
          height="100%"
        >
          <path
            d="M32 448h80c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8H32c-4.4 0-8 3.6-8 8v144C24 444.4 27.6 448 32 448zM40 304h64v128H40V304z"
          />
          <path
            d="M256 448h80c4.4 0 8-3.6 8-8V200c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v240C248 444.4 251.6 448 256 448zM264 208h64v224h-64V208z"
          />
          <path
            d="M144 448h80c4.4 0 8-3.6 8-8V104c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v336C136 444.4 139.6 448 144 448zM152 112h64v320h-64V112z"
          />
          <path
            d="M368 448h80c4.4 0 8-3.6 8-8V8c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v432C360 444.4 363.6 448 368 448zM376 16h64v416h-64V16z"
          />
        </svg></div
    ></router-link>
  </div>
</template>
<script>
export default {
  /**
   * Navbar component
   * Only has visual elements
   */
  name: 'Navbar',
};
</script>
<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 7vh;
  position: absolute;
  top: 0px;
  background-color: #abb2b9;
  display: flex;
  border: 1px solid black;
}
.Links {
  display: flex;
  border: 1px solid black;
  width: 80px;
  height: 100%;
  background-color: #ffffff;
}
.Links:hover {
  opacity: 0.6;
}
</style>