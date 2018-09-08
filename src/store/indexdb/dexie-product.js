import db from './dexie-db'

export const addProduct = (product) => db.table('product').add(product)
export const editProduct = addProduct(product) // dexie does not have a edit document, add is basicaly and upsert document
export const getAllProducts = () => db.table('product').toArray()

