<template lang="pug">
.wrapper(:class="{squeeze: nav_squeeze}")
  TopMenu
  NavigationMenu
  slot
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import TopMenu from "@/components/TopMenu.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    NavigationMenu,
    TopMenu,
  },
  computed: {
    ...mapGetters(["nav_squeeze"]),
  },
};
</script>

<style lang="scss">
.wrapper {
  position: relative;
  min-height: 100vh;
  background: #f7f2fa;
  padding: 100px 30px 50px 250px;
  transition: padding ease-out 0.3s;

  &.squeeze {
    padding: 100px 30px 50px 100px;
  }
}
</style>
