<template>
  <div class="about">
    <h1>This is an about page</h1>
    <br>
    <h3>count is {{count}}</h3>
  </div>
</template>


<script>
export default {
  computed: {
    count() {
      return this.$store.getters.count
    }
  }
};
</script>