import { orders, products } from "./orders_data";

const OrdersApi = {
  fetchAll() {
    const ordersUpdated = orders.map((l) => {
      const orderFiltered = products.filter((p) => l.id === p.order);

      const totalUSD = orderFiltered.reduce(
        (accum, order) => accum + order.price[0].value,
        0
      );
      const totalUAH = orderFiltered.reduce(
        (accum, order) => accum + order.price[1].value,
        0
      );

      return {
        ...l,
        total: {
          length: orderFiltered.length,
          totalUAH,
          totalUSD,
        },
      };
    });
    return ordersUpdated;
  },

  fetchOrderProduct(id) {
    return products.filter((product) => id === product.order);
  },

  fetchAllProducts() {
    return products;
  },

  fetchProductsByType(type) {
    return products.filter((product) => type === product.type);
  },
};

export default OrdersApi;
