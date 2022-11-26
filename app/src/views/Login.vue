<template lang="pug">
.auth(:style="backgroundImage")
  .panel__static
    .panel__content.left
      h2.panel__content-title {{ $t('login.sign_up_title') }}
      p.panel__content-desc {{ $t('login.sign_up_desc') }}
      Button(
        :disabled="inProgress"
        :label="$t('login.sign_up')"
        @click="changeMethod(false)"
      )
    .panel__content.right
      h2.panel__content-title {{ $t('login.log_in_title') }}
      p.panel__content-desc {{ $t('login.log_in_desc') }}
      Button(
        :disabled="inProgress"
        :label="$t('login.log_in')"
        transparent
        @click="changeMethod(true)"
      )
    .panel__sliding(:class="{active: loginView}")
      transition( name="slide-fade")
        .form(v-if="loginView")
          h1.form__title {{ $t('login.log_in') }}
          CustomInput(
            placeholder="Email"
            :value="login.email"
            @update="updateLoginForm({email: $event})"
          )
          CustomInput(
            placeholder="Password"
            :value="login.password"
            type="password"
            @update="updateLoginForm({password: $event})"
            :inputStyle="{marginBottom: '30px'}"
          )
          Button(
            :label="$t('login.log_in')"
            @click="authLogin"
          )
        .form(v-else)
          h1.form__title {{ $t('login.sign_up') }}
          CustomInput(
            placeholder="Name"
            :value="registration.name"
            @update="updateRegistrationForm({name: $event})"
          )
          CustomInput(
            placeholder="Email"
            :value="registration.email"
            @update="updateRegistrationForm({email: $event})"
          )
          CustomInput(
            placeholder="Password"
            :value="registration.password"
            type="password"
            @update="updateRegistrationForm({password: $event})"
            :inputStyle="{marginBottom: '30px'}"
          )
          Button(
            :label="$t('login.sign_up')"
            @click="authRegistry"
          )
  transition
    Toast(
      :title="alert.title"
      :type="alert.type"
      :show="alert.visible"
    )
</template>

<script>
import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import Toast from "@/components/Toast";
import userApi from "@/api/UserApi";
import SessionService from "@/services/SessionService";

export default {
  components: {
    Button,
    CustomInput,
    Toast,
  },
  data() {
    return {
      inProgress: false,
      loginView: true,
      login: {
        email: "",
        password: "",
      },
      registration: {
        name: "",
        email: "",
        password: "",
      },
      alert: {
        visible: false,
        type: "success",
        title: "",
      },
    };
  },
  computed: {
    backgroundImage() {
      return {
        backgroundImage: `url(${require("@/assets/images/login_bg.jpg")})`,
      };
    },
  },
  methods: {
    changeMethod(val) {
      this.loginView = val;
    },

    updateLoginForm(val) {
      this.login = { ...this.login, ...val };
    },

    updateRegistrationForm(val) {
      this.registration = { ...this.registration, ...val };
    },

    authRegistry() {
      this.inProgress = true;
      userApi
        .registration(this.registration)
        .then(({ data }) => {
          this.showMessage("success", data.message);
          this.loginView = true;
          this.inProgress = false;
        })
        .catch((e) => {
          this.showMessage(
            "info",
            e.response.data.message || "Registration Error"
          );
          this.inProgress = false;
        });
    },

    authLogin() {
      this.inProgress = true;
      userApi
        .login(this.login)
        .then(({ data }) => {
          SessionService.setSession(data.token);
          this.$router.push({
            path: "/",
          });
          this.inProgress = false;
        })
        .catch((e) => {
          console.log(e);
          this.showMessage(
            "info",
            e.response.data.message || "Registration Error"
          );
          this.inProgress = false;
        });
    },

    showMessage(type, title) {
      this.alert = {
        visible: true,
        type,
        title,
      };
      setTimeout(() => {
        this.alert = {
          visible: false,
          type: "success",
          title: "",
        };
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
.auth {
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 100px;

  .v-enter-active,
  .v-leave-active {
    transform: translateX(0);
    transition: 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    transform: translateX(400px);
    opacity: 0;
  }

  .panel {
    &__static {
      position: relative;
      height: 60%;
      min-height: 300px;
      width: 100%;
      max-width: 900px;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    &__content {
      flex-grow: 1;
      padding: 50px 10px;
      color: #fefefe;
      padding: 0 30px;

      &-title {
        font-size: 20px;
        margin-bottom: 10px;
      }

      &-desc {
        font-size: 12px;
        margin-bottom: 20px;
      }
    }

    &__sliding {
      position: absolute;
      top: -5%;
      bottom: -5%;
      left: 3%;
      width: 45%;
      background: #fefefe;
      box-shadow: 3px -2px 6px 0px rgb(0 0 0 / 40%);
      transition: ease 0.8s;

      &.active {
        left: 53%;
      }

      .slide-fade-enter-active {
        transition: all 0.5s ease-out;
      }

      .slide-fade-enter-from,
      .slide-fade-leave-to {
        transform: translateY(120px);
        opacity: 0;
      }
    }
  }

  .form {
    position: absolute;
    left: 50px;
    right: 50px;
    top: 60px;

    &__title {
      font-size: 20px;
      color: #e26a6a;
      text-transform: uppercase;
      margin-bottom: 25px;
    }

    &__error {
      height: 20px;
      color: #e26a6a;
    }
  }
}
</style>
