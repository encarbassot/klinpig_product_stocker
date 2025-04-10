



import "dotenv/config"

import { EXPORTS_FOLDER, saveExcel } from "./src/excel.js";


import { sendMail } from './src/mailer.js'; // asegúrate de tener tu lógica de mailer aquí
import { getStocks, getWarehouses } from "./src/holded.js";

import path from "path";
import { EMAIL_TO, FILE_NAME } from "./CONFIG.js";

async function run(){
  const stocks = await getStocks()

  // console.log(stocks)

  const filename = FILE_NAME()
  saveExcel(stocks, filename)
  
  const today = new Date().toISOString().split('T')[0]; // 2025-4-13

  await sendMail({
    to: EMAIL_TO,
    subject: `Stock actualizado - ${today}`,
    text: `Adjunto el fichero de stock con ${stocks.length} productos.`,
    attachments: [
      {
        filename,
        path: path.join(EXPORTS_FOLDER, filename),
      },
    ],
  });
}



run()