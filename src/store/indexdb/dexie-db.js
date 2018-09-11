import Dexie from 'dexie';

const db = new Dexie('mecanic');
db.version(2).stores({ vehicle: 'plateNumber', maintenance: '_id', product: '_id' });

export default db

  