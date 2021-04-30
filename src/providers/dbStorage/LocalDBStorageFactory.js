"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDBStorageFactory = void 0;
var AbstractDBStorageFactory_1 = __importDefault(require("./AbstractDBStorageFactory"));
var dbStorage_1 = __importDefault(require("./local/dbStorage"));
var localStorageDB = require('localstoragedb');
var LocalDBStorageFactory = /** @class */ (function (_super) {
    __extends(LocalDBStorageFactory, _super);
    function LocalDBStorageFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalDBStorageFactory.prototype.create = function () {
        var db = new localStorageDB('library', localStorage);
        if (db.isNew()) {
            db.createTable('alboms', ['title', 'description', 'preview_photos', 'path']);
            db.createTable('photos', ['albom_id', 'urls']);
            db.commit();
            console.log('New Database created');
        }
        return new dbStorage_1.default(db);
    };
    return LocalDBStorageFactory;
}(AbstractDBStorageFactory_1.default));
exports.LocalDBStorageFactory = LocalDBStorageFactory;
