import { existsSync, mkdir, readdir, unlink } from 'fs';
import { writeFile } from 'fs/promises';

const EXPORTS_FOLDER = './exports';


/**
 * Convierte un array de objetos a CSV
 * @param {Array} data - Array de productos
 * @returns {string} - CSV string
 */
const toCSV = (data) => {
  if (!data.length) return '';

  const headers = Object.keys(data[0]);

  const rows = data.map(obj =>
    headers.map(h => {
      let val = obj[h];

      if (typeof val === 'number') {
        val = val.toFixed(2).toString().replace('.', ','); // coma decimal y 2 decimales
      }

      if (typeof val === 'string') {
        val = `"${val.replace(/"/g, '""')}"`;
      }

      return val;
    }).join(';')
  );

  return [headers.join(';'), ...rows].join('\n');
};

/**
 * Borra todos los archivos de una carpeta
 */
const clearDirectory = async (dirPath) => {
  if (!existsSync(dirPath)) return;
  const files = await readdir(dirPath);
  await Promise.all(files.map(file => unlink(path.join(dirPath, file))));
};

/**
 * Guarda CSV en carpeta ./exports, limpiando primero
 */
export const saveCSV = async (products, filename) => {
  // Asegurar que la carpeta existe
  if (!existsSync(EXPORTS_FOLDER)) {
    await mkdir(EXPORTS_FOLDER);
  }

  // Limpiar la carpeta antes de escribir
  await clearDirectory(EXPORTS_FOLDER);

  const csv = toCSV(products);
  const fullPath = path.join(EXPORTS_FOLDER, filename);

  await writeFile(fullPath, csv);
  console.log(`📄 Archivo ${fullPath} guardado con ${products.length} productos`);
};