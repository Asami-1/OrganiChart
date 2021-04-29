<template >
  <div class="service">
    <PostCard></PostCard>
  </div>
</template>
<script>
import PostCard from './PostCard';
export default {
  components: {
    PostCard,
  },
};
</script>
<style lang="scss" scoped>
/* main */
.service {
  /* Rectangle 1 */
  display: flex;
  justify-content: center;
  align-content: center;

  &-name {
  }
}
</style>

