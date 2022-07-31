enum PRODUCTS_ACTION_TYPES  {
  SET_PRODUCTS_START =  "SET_PRODUCTS_START",
  SET_PRODUCTS_SUCCESS =  "SET_PRODUCTS_SUCCESS",
  SET_PRODUCTS_FAILED =  "SET_PRODUCTS_FAILED",
};

export type ProductItemType = {
  id: number,
  imageUrl: string,
  price: number,
  name:string
}

export type ProductsType = {
  title: string,
  imageUrl: string,
  items: ProductItemType[]
}

export type ProductMap = {
  [key: string]: ProductItemType[];
}


export default PRODUCTS_ACTION_TYPES;
