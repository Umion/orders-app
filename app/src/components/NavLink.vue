<template lang="pug">
.sidebar__link
  .sidebar__link-icon
    img(:src="require(`@/assets/images/${icon}`)")
  span.sidebar__link-label {{label}}
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.sidebar__link {
  width: 220px;
  display: flex;
  align-items: center;

  &-icon {
    width: 30px;
    height: 30px;
    padding: 0 5px;
    margin-right: 15px;

    img {
      width: 100%;
    }
  }

  &-label {
    color: #fff;
  }
}
</style>
