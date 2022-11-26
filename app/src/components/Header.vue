<template lang="pug">
.header
  .header__company
    transition
      span( v-show="nav_squeeze") MyCompany
  .header__tools 
    .header__tools-date {{timestamp}}
    .header__tools-language
      CustomSelect(:selected="selected" :options="languageOptions" @selected="changeLanguage")
    .header__tools-session
      img(:src="icons.sessionIcon")
      span {{ users_count }}
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import sessionIcon from "@/assets/images/user.png";
import CustomSelect from "@/components/CustomSelect.vue";
import { io } from "socket.io-client";

export default {
  components: {
    CustomSelect,
  },
  mounted() {
    this.selected = {
      text: this.$i18n.locale.toUpperCase(),
      value: this.$i18n.locale,
    };
  },
  created() {
    this.getNow();
    setInterval(this.getNow, 1000);

    const socket = io("http://localhost:5000");
    socket.on("user_connection", (data) => {
      this.users_count = data;
    });
  },
  data() {
    return {
      users_count: 0,
      timestamp: "",
      selected: {},
    };
  },
  computed: {
    ...mapGetters(["nav_squeeze"]),
    icons() {
      return {
        sessionIcon,
      };
    },

    languageOptions() {
      return this.$i18n.availableLocales.map((l) => {
        return { text: l.toUpperCase(), value: l };
      });
    },
  },
  methods: {
    ...mapMutations(["SET_LANGUAGE"]),

    getNow() {
      this.timestamp = new Date().toLocaleString(this.$i18n.locale, {
        weekday: "long",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    changeLanguage(newVal) {
      this.selected = newVal;
      this.$i18n.locale = newVal.value;
      this.SET_LANGUAGE(newVal.value);
      localStorage.setItem("ordersLang", newVal.value);
      this.getNow();
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #fff;
  box-shadow: 0 0px 15px -4px rgb(0 0 0 / 15%);

  &__tools {
    display: flex;
    align-items: center;
    font-size: 14px;

    & div:not(:last-child) {
      margin-right: 10px;
    }

    &-language {
      width: 65px;
    }

    &-session {
      display: flex;
      align-items: center;
      min-width: 40px;

      & img {
        width: 15px;
        margin-right: 5px;
      }
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
