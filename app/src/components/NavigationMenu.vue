<template lang="pug">
.sidebar(:class="{ active: nav_squeeze }")
  img.sidebar__arrow(
    :src="icons.arrowIcon"
    :class="{ active: nav_squeeze }"
    @click="toggleMenu"
  )
  .sidebar__content
    .sidebar__top
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
    .sidebar__footer
      .sidebar__menu-link
        NavLink(
          icon="logout.svg"
          :label="$t('menu.logout')"
          @click="endSession"
        )

</template>

<script>
import logoIcon from "@/assets/images/logo.svg";
import arrowIcon from "@/assets/images/arrow.svg";
import NavLink from "@/components/NavLink";
import SessionService from "@/services/SessionService";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    NavLink,
  },

  computed: {
    ...mapGetters(["nav_squeeze"]),

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
      const val = !this.nav_squeeze;
      this.SET_NAV_SQUEEZE(val);
      localStorage.setItem("is_squeeze", JSON.stringify(val));
    },

    endSession() {
      SessionService.removeSession();
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 220px;
  background: #242625;
  padding: 15px;
  color: white;
  transition: width ease-out 0.3s;
  z-index: 101;

  &.active {
    width: 70px;
  }

  &__content {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding-bottom: 50px;
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
