<template lang="pug">
.sidebar(:class="{ active: is_squeeze }")
  img.sidebar__arrow(
    :src="icons.arrowIcon"
    :class="{ active: is_squeeze }"
    @click="toggleMenu"
  )
  .sidebar__content
    .sidebar__company
      img.sidebar__company-logo(:src="icons.logoIcon")
      span.sidebar__company-name MyCompany
    .sidebar__menu
      router-link(
        v-for="link in navItems"
        :key="`${link.id}`"
        :label="link.label"
        :to="link.url"
        class="sidebar__menu-link"
      )
        NavLink(
          :icon="link.icon"
          :label="link.label"
        )

</template>

<script>
import logoIcon from "@/assets/images/logo.svg";
import arrowIcon from "@/assets/images/arrow.svg";
import NavLink from "@/components/NavLink";
import { mapMutations } from "vuex";

export default {
  components: {
    NavLink,
  },
  mounted() {
    const is_squeeze = JSON.parse(localStorage.getItem("is_squeeze")) || false;
    this.is_squeeze = is_squeeze;
  },
  data() {
    return {
      is_squeeze: false,
    };
  },
  computed: {
    navItems() {
      return [
        {
          id: "orders",
          url: "/",
          label: this.$t("menu.orders"),
          icon: "orders.svg",
        },
        {
          id: "product",
          url: "/product",
          label: this.$t("menu.product"),
          icon: "products.svg",
        },
      ];
    },

    icons() {
      return {
        logoIcon,
        arrowIcon,
      };
    },
  },
  methods: {
    ...mapMutations(["SET_NAV_SQUEEZE"]),

    toggleMenu() {
      this.is_squeeze = !this.is_squeeze;
      this.SET_NAV_SQUEEZE(this.is_squeeze);
      localStorage.setItem("is_squeeze", JSON.stringify(this.is_squeeze));
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  position: relative;
  left: 0;
  top: 0;
  bottom: 0;
  width: 220px;
  background: #242625;
  padding: 15px;
  color: white;
  transition: width ease-out 0.3s;

  &.active {
    width: 70px;
  }

  &__content {
    overflow: hidden;
  }

  &__arrow {
    position: absolute;
    top: 22px;
    right: -12px;
    cursor: pointer;

    &.active {
      transform: rotate(180deg);
    }
  }

  &__company {
    display: flex;
    align-items: center;
    width: 220px;
    margin-bottom: 70px;

    &-logo {
      width: 40px;
      margin-right: 25px;
    }
  }

  &__menu {
    &-link {
      display: block;
      text-decoration: none;
      padding: 5px 0;
      border: 1px solid transparent;

      &:hover {
        border-bottom: 1px solid rgb(78, 73, 73);
      }
    }
  }
}
</style>
