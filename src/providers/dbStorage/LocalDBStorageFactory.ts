import AbstractDBStorageFactory from "./AbstractDBStorageFactory";
import { I_DBStorage } from "./I_DBStorage";
import DBStorage from "./local/dbStorage";
const localStorageDB = require('localstoragedb');

export class LocalDBStorageFactory extends AbstractDBStorageFactory {
    public create(): I_DBStorage {
        const db = new localStorageDB('library', localStorage);
        if (db.isNew()) {
            db.createTable('alboms', ['title', 'description', 'preview_photos', 'path']);
            db.createTable('photos', ['albom_id', 'urls']);
            db.commit();
            console.log('New Database created')
        }
        return new DBStorage(db);
    }
}