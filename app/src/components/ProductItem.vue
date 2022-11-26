<template lang="pug">
.product-item
  .product-item__img
    img(:src="require(`@/assets/images/${item.photo}`)")
  .product-item__name
    p.product-item__name-title {{ item.title }}
    p.product-item__name-serial {{ item.serialNumber }}
  .product-item__status {{ item.isNew ? $t('common.new') : $t('common.used') }}
  .product-item__action(@click="$emit('removeProduct', item)")
    img(:src="icons.removeIcon")
</template>

<script>
import removeIcon from "@/assets/images/remove_black.png";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    icons() {
      return {
        removeIcon,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.product-item {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 10px 20px;
  font-size: 15px;
  border-bottom: 1px solid #f0e0e0;

  &:hover {
    background: #fafafa;
  }

  &:first-child {
    border-top: 1px solid #f0e0e0;
  }

  & > * {
    width: 100px;
    margin: 0 5px;
  }

  &__img {
    width: 60px;

    & img {
      width: 100%;
    }
  }

  &__name {
    align-self: flex-start;
    flex-grow: 1;

    &-title {
      margin-bottom: 5px;
    }
    &-serial {
      font-size: 14px;
      color: #7e7e7e;
    }
  }

  &__status {
    text-align: center;
  }

  &__action {
    text-align: center;
    height: 40px;
    padding: 10px;

    img {
      cursor: pointer;
      width: 20px;
    }
  }
}
</style>
