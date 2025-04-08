



import "dotenv/config"

import { EXPORTS_FOLDER, saveExcel } from "./src/excel.js";


import { sendMail } from './src/mailer.js'; // asegúrate de tener tu lógica de mailer aquí
import { getStocks } from "./src/holded.js";

import path from "path";

async function run(){
  const stocks = await getStocks()

  const today = new Date().toISOString().split('T')[0];
  const filename = `stock-klinpig-tradein-${today}.xlsx`;
  saveExcel(stocks, filename)
  
  await sendMail({
    to: "paolo.campos@klinpig.com",
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