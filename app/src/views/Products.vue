<template lang="pug">
.view-layout
  Heading(
    :title="$t('products.title', items.length)"
  )
    .products__select-wrap
      CustomSelect(:selected="selectedType" :options="typeOptions" @selected="changeType")
  .table__wrap
    DataTable(
      :headers="headers"
      :items="items"
    )
      template(v-slot:cel_photo="{ item }")
        img.product__img(:src="require(`@/assets/images/${item.photo}`)")
      template(v-slot:cel_title="{ item }")
        p.product__title {{item.title}}
        p.product__serial {{ item.serialNumber }}
      template(v-slot:cel_guarantee="{ item }")
        p.product__guarantee
          span {{ $t('common.from') }}
          |  {{ dateFormatted2digit(item.guarantee.start) }}
        p.product__guarantee
          span {{ $t('common.to') }}
          |  {{ dateFormatted2digit(item.guarantee.end) }}
      template(v-slot:cel_isNew="{ item }")
        .product__isnew {{item.isNew ? $t('common.new') : $t('common.used')}}
      template(v-slot:cel_price="{ item }")
        p.product__price.sm {{ `${item.price[0].value} ${item.price[0].symbol}` }} 
        p.product__price {{ `${item.price[1].value} ${item.price[1].symbol}` }}
      template(v-slot:cel_date="{ item }")
        span.product__date.sm {{ dateFormatted(item.date).short }}
        span.product__date {{ dateFormatted(item.date).full }}s
      template(v-slot:cel_action="{ item }")
        .product__delete(@click="removeProduct(item.id)")
          img(:src="require(`@/assets/images/remove.png`)")

</template>

<script>
import DataTable from "@/components/DataTable";
import Heading from "@/components/Heading";
import CustomSelect from "@/components/CustomSelect";
import OrdersApi from "@/api/OrdersApi";

export default {
  components: {
    DataTable,
    Heading,
    CustomSelect,
  },
  mounted() {
    const res = OrdersApi.fetchAllProducts();
    this.items = res;
  },
  data() {
    return {
      headers: [
        { key: "photo" },
        { key: "title" },
        { key: "type", squeeze: true },
        { key: "guarantee", squeeze: true },
        { key: "isNew", squeeze: true },
        { key: "price", squeeze: true },
        { key: "specification" },
        { key: "date" },
        { key: "action" },
      ],
      items: [],
      types: ["Monitors", "Laptops"],
      selectedType: {},
    };
  },
  computed: {
    typeOptions() {
      return this.types.map((l) => {
        return { text: l.toUpperCase(), value: l };
      });
    },
  },
  methods: {
    removeProduct(id) {
      console.log(id);
    },

    changeType(type) {
      this.selectedType = type;
      const res = OrdersApi.fetchProductsByType(type.value);
      this.items = res;
    },

    dateFormatted2digit(date) {
      return new Date(date).toLocaleString(this.$i18n.locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
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
.view-layout {
  padding: 20px;
  height: 100%;

  .products__select-wrap {
    width: 120px;

    & .button {
      background: #fff;
      box-shadow: 2px 2px 5px -2px rgb(0 0 0 / 40%);
    }
  }

  .table__wrap {
    overflow: hidden;
    overflow-x: scroll;
    overflow-y: scroll;
    padding-bottom: 5px;
    max-height: 500px;

    &::-webkit-scrollbar {
      height: 7px;
      width: 7px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
    }

    /* Handle on hover */
    & ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    & .data-table {
      max-width: 1500px;
      min-width: 1000px;
    }
  }

  .product {
    &__img {
      width: 80px;
    }

    &__guarantee {
      align-self: center;

      &:first-child {
        margin-bottom: 5px;
      }

      & span {
        color: #7e7e7e;
      }
    }

    &__serial {
      font-size: 12px;
      color: #7e7e7e;
    }

    &__isnew {
      text-align: center;
    }

    &__price.sm {
      font-size: 10px;
      color: #7e7e7e;
    }

    &__date {
      display: block;

      &.sm {
        font-size: 11px;
        color: gray;
      }
    }

    &__delete {
      padding: 5px;
      cursor: pointer;

      & img {
        width: 20px;
      }
    }
  }
}
</style>
