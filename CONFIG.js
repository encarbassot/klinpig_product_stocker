



export const EMAIL_TO = ["paolo.campos@klinpig.com","eloi.fabrega@panotmobility.com"] // ["correo1@example.com", "correo2@example.com", ...]



// id: '67ab5c1d82a2051b2808dc72', name: 'AMAZON',
// id: '67ab5b9fe2b5407f6200f172', name: 'AMPHORA LOGISTICS',
// id: '67cb0552c07e7c35f005efe2', name: 'KLINPIG DECATHLON',
// id: '67a9e05ac0b38982de0348d8', name: 'KLINPIG, S.L Almacén',
export const WEAREHOUSE_ID = "67a9e05ac0b38982de0348d8"

export const FILE_NAME = ()=>{
  const today = new Date().toISOString().split('T')[0]; // 2025-4-13
  return `stock-klinpig-tradein-${today}.xlsx`;
}


export const PARAMETERS = {
  "EAN": "barcode",
  "CANTIDAD": "stock",
  "PRECIO COMPRA":"cost",
  "PVP":"price",
  "DESCUENTO": () => "2", // valor estático
  "MARCA": () => "KLINPIG", // valor estático
  "PRODUCTO": "name"
}

//------- EJEMPLO DE PRODUCTO --------
// id: '67aa09a37c89af303b0c93cf',
// kind: 'simple',
// name: 'PACK LIMPIABICIS 1L + DESENGRASANTE 1L',
// desc: '',
// typeId: '',
// contactId: '',
// contactName: '',
// price: 19.75207,
// taxes: [ 's_iva_21' ],
// total: 23.9,
// hasStock: 1,
// stock: -26,
// barcode: '8437024054863 ',
// sku: 'K-04832-2',
// cost: 0,
// purchasePrice: 5.2314,
// weight: 0,
// tags: [ 'packs' ],
// categoryId: '',
// factoryCode: '',
// forSale: 1,
// forPurchase: 1,
// salesChannelId: null,
// expAccountId: null,
// warehouseId: null,
// translations: []





export const ORDER = {
  EAN:[
  "8437024054139",
  "8437024054177",
  "8437024054443",
  "8437024054368",
  "8437024054375",
  "8437024054092",
  "8437024054634",
  "8437024054009",
  "8437024054023",
  "8437024054313",
  "8437024054290",
  "8437024054320",
  "8437024054054",
  "8437024054191",
  "8437024054214",
  "8437024054238",
  "8437024054726",
  "8437024054733",
  "8437024054764",
  "8437024054573",
  "8437024054597",
  "8437024054788",
  "8437024054351",
  "8437024054467",
  "8437024054566",
  "8437024054627",
  "8437024054863",
  ]
}



