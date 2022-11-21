<template lang="pug">
.wrapper
  SideBar
  .content
    Header
    slot
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";

export default {
  components: {
    SideBar,
    Header,
  },
  methods: {},
};
</script>

<style lang="scss">
.wrapper {
  position: relative;
  display: flex;
  height: 100vh;

  .content {
    flex-grow: 1;
    background: #e5e5e5;
  }
}
</style>
