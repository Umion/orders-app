<template lang="pug">
.header
  .header__company
    transition
      span( v-show="nav_squeeze") Company Name
  .header__tools 
    .header__tools-date {{timestamp}}
    .header__tools-language
      CustomSelect(:options="languageOptions" @selected="changeLanguage")
    .header__tools-session
      img(:src="icons.sessionIcon")
      span 0
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import sessionIcon from "@/assets/images/user.png";
import CustomSelect from "@/components/CustomSelect.vue";

export default {
  components: {
    CustomSelect,
  },
  created() {
    this.getNow();
    setInterval(this.getNow, 1000);
  },
  data() {
    return {
      timestamp: "",
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
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    changeLanguage({ value }) {
      this.$i18n.locale = value;
      this.SET_LANGUAGE(value);
      localStorage.setItem("ordersLang", value);
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
  height: 40px;

  &__tools {
    display: flex;
    align-items: center;
    font-size: 14px;

    & div:not(:last-child) {
      margin-right: 10px;
    }

    // &-date {
    //   margin-right: 10px;
    // }

    &-language {
      width: 70px;
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
