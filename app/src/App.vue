<template lang="pug">
#app
  component(:is="layout") 
    router-view
</template>

<script>
export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || "default"}-layout`;
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
