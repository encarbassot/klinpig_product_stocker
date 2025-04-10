import axios from 'axios';
import {ORDER, PARAMETERS, WEAREHOUSE_ID} from "../CONFIG.js"

const API_KEY = process.env.API_KEY;

const BASE_URL = 'https://api.holded.com/api/invoicing/v1';


const routes = {
  products: '/products',
  productById: (id) => `/products/${id}`,
  productStock: '/productstock',
  warehouses: '/warehouses',
  wearehouseStock: (id)=>`/warehouses/${id}/stock`
};

const callHoldedAPI = async (endpoint) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await axios.get(url,{
      headers: {
        accept: 'application/json',
        key: API_KEY,
      }
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error al llamar a ${endpoint}:`, error.response?.data || error.message);
    throw error;
  }
};

// Funciones específicas
export const getAllProducts = () => callHoldedAPI(routes.products);

export const getProductById = (id) => callHoldedAPI(routes.productById(id));

export const getWarehouseStock = (id) => callHoldedAPI(routes.wearehouseStock(id || WEAREHOUSE_ID));

export const getProductStock = () => callHoldedAPI(routes.productStock);

export const getWarehouses = () => callHoldedAPI(routes.warehouses);




export const getStocks = async () => {

  const data = await getWarehouseStock()
  const warehouse = data.warehouse

  const products = await Promise.all(
    warehouse.products.map( async ({stock,product_id})=>{
      const product = await getProductById(product_id)
      product.stock = stock

      const result = {};

      for (const [columnName, value] of Object.entries(PARAMETERS)) {
        if (typeof value === "function") {
          result[columnName] = value(product);
        } else {
          result[columnName] = product[value];
        }
      }

      return result;
    })
  )

  
  const [orderKey, orderList] = Object.entries(ORDER)[0];

  const sorted = products.sort((a, b) => {
    const aValue = a[PARAMETERS[orderKey]];
    const bValue = b[PARAMETERS[orderKey]];
  
    const aIndex = orderList.indexOf(aValue);
    const bIndex = orderList.indexOf(bValue);
  
    const aPos = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
    const bPos = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
  
    return aPos - bPos;
  });


  return sorted

};
