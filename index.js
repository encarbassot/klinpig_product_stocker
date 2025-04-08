



import dotenv from "dotenv"
import axios from "axios"
import { writeFile } from 'fs/promises'; // usando fs/promises para ES6
import { saveCSV } from "./toCsv.js";


import { sendMail } from './mailer.js'; // asegúrate de tener tu lógica de mailer aquí


dotenv.config();

const API_KEY = process.env.API_KEY;
const WEAREHOUSE_ID = "67a9e05ac0b38982de0348d8"


const getStocks = async () => {
  try {
    const response = await axios.get(`https://api.holded.com/api/invoicing/v1/warehouses/${WEAREHOUSE_ID}/stock`, {
      headers: {
        'accept': 'application/json',
        'key': API_KEY,
      },
    });

    const wearehouse = response.data.warehouse;

    const products = await Promise.all(
      wearehouse.products.map(async (prod) => {
        const info = await getProductById(prod.product_id); // or variant ID if needed
        return {
          name: info.name,
          barcode: info.barcode,
          stock:prod.stock,
          cost:info.cost,
          price: info.price,
          // ...info,
        };
      })
    );


    // Guardar como archivo JSON
    await writeFile('stocks.json', JSON.stringify(products, null, 2));
    saveAndSendStockCSV(products)
    console.log('Archivo products.json guardado correctamente.');
  } catch (error) {
    console.error('Error al obtener productos:', error.response?.data || error.message);
  }
  
};


const getProductById = async (productId) => {
  try {
    const response = await axios.get(`https://api.holded.com/api/invoicing/v1/products/${productId}`, {
      headers: {
        'accept': 'application/json',
        'key': API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error al obtener el producto ${productId}:`, error.response?.data || error.message);
    return null;
  }
};



export const saveAndSendStockCSV = async (products) => {
  const today = new Date().toISOString().split('T')[0];
  const filename = `stock-klinpig-tradein-${today}.csv`;

  await saveCSV(products, filename);

  await sendMail({
    to: "paolo.campos@klinpig.com",
    subject: `Stock actualizado - ${today}`,
    text: `Adjunto el fichero de stock con ${products.length} productos.`,
    attachments: [
      {
        filename,
        path: `./${filename}`,
      },
    ],
  });
};




getStocks()
// getProducts()