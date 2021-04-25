"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var albomModel_1 = require("../../../../models/albomModel");
var localStorageDB = require('localstoragedb');
var DBStorage = /** @class */ (function () {
    function DBStorage() {
        this.db = new localStorageDB('library', localStorage);
        if (this.db.isNew()) {
            this.db.createTable('alboms', ['title', 'description', 'preview_photos', 'path']);
            this.db.createTable('photos', ['albom_id', 'urls']);
            this.db.commit();
            console.log('New Database created');
        }
    }
    DBStorage.prototype.fetchAlboms = function (_a) {
        var perPage = _a.perPage, page = _a.page;
        var alboms = this.db.queryAll('alboms', {
            start: (page - 1) * perPage,
            limit: perPage
        });
        return alboms;
    };
    DBStorage.prototype.createAlbom = function (_a) {
        var title = _a.title, description = _a.description, path = _a.path;
        var albom = new albomModel_1.AlbomModel({ title: title, description: description, path: path });
        albom.ID = this.db.insert('alboms', albom);
        this.db.commit();
        return albom;
    };
    DBStorage.prototype.addPhoto = function (_a) {
        var albomId = _a.albomId, urls = _a.urls, name = _a.name;
        var photo = {
            id: null,
            name: name,
            albom_id: albomId,
            urls: urls
        };
        photo.id = this.db.insert('photos', photo);
        this.db.commit();
        return photo;
    };
    DBStorage.prototype.deletePhoto = function (photo) {
        if (photo.id) {
            this.db.deleteRows('photos', { ID: photo.id });
            this.db.commit();
        }
    };
    DBStorage.prototype.fetchPhotos = function (_a) {
        var albomId = _a.albomId, perPage = _a.perPage, page = _a.page;
        var photos = this.db.queryAll('photos', {
            query: { albom_id: albomId },
            start: (page - 1) * perPage,
            limit: perPage
        });
        return photos;
    };
    return DBStorage;
}());
exports.default = new DBStorage();
