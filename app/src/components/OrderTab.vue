<template lang="pug">
.order-item(:class="{active: item.id == tab}")
  .order-item__arrow
    img(:src="icons.arrowIcon")
  .order-item__name(:class="{hide: !!tab}") 
    span {{ item.title }}
  .order-item__count
    img(:src="icons.listIcon")
    .order-item__count-txt(v-html=" $t('orders.item_count', item.total.length)")
  .order-item__date
    span.sm {{ dateFormatted(item.date).short }}
    span {{ dateFormatted(item.date).full }}
  .order-item__price(:class="{hide: !!tab}") 
    span.sm  {{ item.total.totalUSD }} $
    span  {{ item.total.totalUAH }} UAH
  .order-item__remove(:class="{hide: !!tab}" @click.stop="$emit('remove', item)") 
    img(:src="icons.removeIcon")
</template>

<script>
import listIcon from "@/assets/images/list.png";
import removeIcon from "@/assets/images/remove_black.png";
import arrowIcon from "@/assets/images/right-arrow.png";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    tab: {
      type: Number,
    },
  },
  computed: {
    icons() {
      return {
        listIcon,
        removeIcon,
        arrowIcon,
      };
    },
  },
  methods: {
    dateFormatted(date) {
      const short = new Date(date).toLocaleString(this.$i18n.locale, {
        day: "2-digit",
        month: "2-digit",
      });
      const full = new Date(date).toLocaleString(this.$i18n.locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return { short, full };
    },
  },
};
</script>

<style lang="scss">
.order-item {
  position: relative;
  padding: 5px;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 0px 15px -4px rgb(0 0 0 / 15%);
  overflow: hidden;

  &__arrow {
    position: absolute;
    right: -25px;
    top: 0;
    bottom: 0;
    width: 30px !important;
    background: #242625;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 10px;
    }
  }

  &.active {
    padding-right: 20px;
    box-shadow: 3px 3px 4px 0px rgb(0 0 0 / 15%);

    .order-item__arrow {
      right: 0;
    }
  }

  & > * {
    padding: 5px 10px;
    transition: 0.7s;
    width: 130px;
    overflow: hidden;

    span {
      display: block;
      width: 130px;
    }
    &.hide {
      padding: 5px 0;
      width: 0px;
      opacity: 0;
    }
  }

  &__name {
    width: 180px;

    span {
      width: 180px;
    }
  }

  &__count {
    display: flex;
    align-items: center;
    width: 140px;

    span {
      width: 140px;
    }

    img {
      width: 20px;
      margin-right: 10px;
    }

    &-txt {
      font-size: 13px;
      & .count {
        font-size: 15px;
      }
    }
  }

  &__price {
    span {
      font-size: 13px;

      &.sm {
        font-size: 11px;
        color: gray;
      }
    }
  }

  &__date {
    font-size: 13px;

    .sm {
      font-size: 11px;
      color: gray;
    }
  }

  &__remove {
    width: 40px;

    img {
      width: 20px;
    }
  }
}
</style>
