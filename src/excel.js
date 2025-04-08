import * as XLSX from 'xlsx';
import { mkdir, readdir, unlink} from 'fs/promises';
import { existsSync } from 'fs';

import path from 'path';

export const EXPORTS_FOLDER = './exports';



/**
 * Borra todos los archivos de una carpeta
 */
const clearDirectory = async (dirPath) => {
  if (!existsSync(dirPath)) return;
  const files = await readdir(dirPath);
  await Promise.all(files.map(file => unlink(path.join(dirPath, file))));
};



export const saveExcel = async (data, filename) => {
  if (!existsSync(EXPORTS_FOLDER)) {
    await mkdir(EXPORTS_FOLDER);
  }

  // Limpiar la carpeta antes de escribir
  await clearDirectory(EXPORTS_FOLDER);

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock');

  const fullPath = path.join(EXPORTS_FOLDER, filename);

  XLSX.writeFile(workbook, fullPath); // no necesita await

  console.log(`📄 Excel guardado como ${fullPath}`);
};
