import axios from 'axios';

const API_KEY = process.env.API_KEY;

const BASE_URL = 'https://api.holded.com/api/invoicing/v1';
const WEAREHOUSE_ID = "67a9e05ac0b38982de0348d8"


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
      const {name,barcode,cost,price} = await getProductById(product_id)
      return {name,barcode,stock,cost,price}
    })
  )

  return products  
};
