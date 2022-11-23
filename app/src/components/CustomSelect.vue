<template lang="pug">
.select
  .button(@click="toggleSelect" :class="{open: show}")
    span.button__value(v-if="!selected.value") Select
    span.button__value(v-else) {{selected.text}}
    img.icon(:class="{close: show}" :src="icons.arrowDownIcon")
  .select-block(:class="{open: show}")
    div(class="scroll")
      ul
        li(v-for="item in options" :key='item.value' @click="selectItem(item)" :class="item.value === selected.value ? 'active' : ''") {{ item.text }}
</template>

<script>
import arrowDownIcon from "@/assets/images/down-arrow.png";

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    this.selected = {
      text: this.$i18n.locale.toUpperCase(),
      value: this.$i18n.locale,
    };
  },

  data() {
    return {
      show: false,
      selected: {},
    };
  },

  methods: {
    toggleSelect() {
      this.show = !this.show;
    },

    selectItem(value) {
      this.selected = value;
      this.show = false;
      this.$emit("selected", value);
    },
  },

  computed: {
    icons() {
      return {
        arrowDownIcon,
      };
    },
  },
};
</script>

<style lang="scss">
$gray0: #f1f1f1;
$primary0: #636983;

.select {
  width: 100%;
  position: relative;

  .button {
    position: relative;
    width: 100%;
    border-radius: 10px;
    background-color: $gray0;
    padding: 5px 10px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.3s;
    z-index: 0;

    &__value {
      font-size: 12px;
    }

    &.open {
      border-radius: 10px 10px 0 0;
    }

    &:hover {
      box-shadow: 0 5px 25px -4px rgba(0, 0, 0, 0.05);
    }
  }

  .select-block {
    width: 100%;
    max-height: 200px;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 5px 25px -4px rgba(0, 0, 0, 0.05);
    position: absolute;
    background-color: white;
    box-sizing: border-box;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
    z-index: 2;

    .scroll {
      height: 100%;
      overflow-y: auto;
    }

    &.open {
      visibility: visible;
      opacity: 1;
    }
  }
  ul {
    margin: 0;
    padding: 0;

    li {
      list-style-type: none;
      color: #666;
      padding: 5px 10px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 12px;

      &:hover {
        background: $gray0;
      }
      &:hover:last-child {
        border-radius: 0 0 10px 10px;
      }

      &.active {
        font-weight: 700;
      }
    }
  }

  .select-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 0;
    opacity: 0;
  }

  .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s;
    &.close {
      transform: translateY(-50%) rotate(180deg);
    }
  }
}
</style>
