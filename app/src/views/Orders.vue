<template lang="pug">
.view-layout
  Heading(
    :title="$t('orders.title', orders.length)"
  )
  .orders
    .orders__left
      OrderTab(
        v-for="(item, index) in orders"
        :item="item" 
        :tab="tab" 
        @click="selectTab(item)"
        @remove="removeOrder"
      )
    .orders__right(:class="{show: !!tab}")
      .orders__right-content 
        .orders__right-title
          h2.title {{ orderTitle }}
          .orders__right-close(@click="close")
            img(:src="icons.closeIcon")

        ProductItem(
          v-for="(item, index) in orderProducts"
          :item="item"
          @removeProduct="removeProduct"
        )
OrderRemoveModal(ref="modal" @wasRemoved="removeFromOrders")
ProductRemoveModal(ref="productsModal" @wasRemoved="removeFromProducts")
</template>

<script>
import Heading from "@/components/Heading";
import OrderTab from "@/components/OrderTab";
import ProductItem from "@/components/ProductItem";
import OrderRemoveModal from "@/modals/OrderRemoveModal";
import ProductRemoveModal from "@/modals/ProductRemoveModal";
import OrdersApi from "@/api/OrdersApi";
import closeIcon from "@/assets/images/close.png";

export default {
  components: {
    Heading,
    OrderTab,
    ProductItem,
    OrderRemoveModal,
    ProductRemoveModal,
  },
  mounted() {
    const res = OrdersApi.fetchAll();
    this.orders = res;
  },
  data() {
    return {
      tab: 0,
      orderTitle: "",
      orders: [],
      orderProducts: [],
    };
  },
  computed: {
    icons() {
      return {
        closeIcon,
      };
    },
  },
  methods: {
    selectTab(tab) {
      const products = OrdersApi.fetchOrderProduct(tab.id);
      this.tab = tab.id;
      this.orderTitle = tab.title;
      this.orderProducts = products;
    },

    removeOrder(item) {
      this.$refs.modal.open(
        this.$t("orders.modal_remove_order", { name: item.title }),
        item.id
      );
    },

    removeProduct(item) {
      this.$refs.productsModal.open(
        this.$t("orders.modal_remove_product"),
        item
      );
    },

    removeFromOrders(id) {
      this.orders = [...this.orders.filter((order) => order.id !== id)];
    },

    removeFromProducts(id) {
      console.log(id);
      this.orderProducts = [
        ...this.orderProducts.filter((product) => product.id !== id),
      ];
    },

    close() {
      this.tab = 0;
    },
  },
};
</script>

<style lang="scss">
.view-layout {
  padding: 20px;
}

.orders {
  display: flex;

  &__left {
    padding-right: 20px;
  }

  &__right {
    width: 0;
    transition: 0.7s;
    position: relative;
    overflow: hidden;

    &.show {
      width: 700px;
    }

    &-title {
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      margin-bottom: 30px;

      .orders__right-close {
        cursor: pointer;
        padding: 5px;
        width: 30px;

        img {
          width: 100%;
        }
      }
    }

    &-content {
      width: 700px;
      padding: 30px 0;
      background: #fff;
    }
  }
}
</style>
