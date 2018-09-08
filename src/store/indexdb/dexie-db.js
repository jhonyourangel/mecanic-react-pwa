import Dexie from 'dexie';

const db = new Dexie('mecanic2');
db.version(2).stores({ vehicle2: 'plateNumber', maintenance: '_id', product: '_id' });

export default db

  