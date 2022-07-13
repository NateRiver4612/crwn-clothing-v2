export const selectProducts = (state) => {
  const productsArray = state.shop.products;

  return productsArray.reduce((acc, product) => {
    const { title, items } = product;
    acc[title.toLowerCase()] = items;

    return acc;
  }, {});
};
