<template lang="pug">
modal(
  :show="show"
  :title="title"
  @close="close"
  @confirm="confirm"
)
</template>

<script>
import Modal from "@/components/Modal";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      show: false,
      title: "",
      id: null,
    };
  },
  methods: {
    open(title, id) {
      this.show = true;
      this.title = title;
      this.id = id;
    },

    close() {
      this.show = false;
    },

    confirm() {
      // query to remove from server

      this.$emit("wasRemoved", this.id);
      this.close();
    },
  },
};
</script>

<style lang="scss"></style>
