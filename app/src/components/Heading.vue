<template lang="pug">
.heading
  h2 {{ title }}
  .heading__right(v-if="$slots.default")
    slot
  </template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style scoped lang="scss">
.heading {
  display: flex;
  align-items: center;
  margin-bottom: 35px;

  h2 {
    font-size: 24px;
    line-height: 36px;
    font-weight: 700;
  }

  &__right {
    display: flex;
    align-items: center;
    margin-left: 50px;
  }
}

@media screen and (max-width: 1000px) {
  .heading {
    margin-bottom: 20px;
  }
  h2 {
    font-size: 20px;
  }
}
</style>
