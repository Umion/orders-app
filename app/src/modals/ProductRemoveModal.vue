<template lang="pug">
modal(
  :show="show"
  :title="title"
  @close="close"
  @confirm="confirm"
)
  ProductItem(
    :item="item"
    @removeProduct="removeProduct"
    class="modal__item"
  )
</template>

<script>
import Modal from "@/components/Modal";
import ProductItem from "@/components/ProductItem";

export default {
  components: {
    Modal,
    ProductItem,
  },
  data() {
    return {
      show: false,
      title: "",
      item: null,
    };
  },
  methods: {
    open(title, item) {
      this.show = true;
      this.title = title;
      this.item = item;
    },

    close() {
      this.show = false;
    },

    confirm() {
      // query to remove from server

      this.$emit("wasRemoved", this.item.id);
      this.close();
    },
  },
};
</script>

<style lang="scss">
.modal__item.product-item {
  padding: 10px 0;

  &:hover {
    background: #fff;
  }

  & .product-item__action {
    display: none;
  }
  & > * {
    width: 70px;
  }
}
</style>
