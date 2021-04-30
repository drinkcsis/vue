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
exports.LocalFileSystemStorageFactory = void 0;
var AbstractFileSystemStorageFactory_1 = __importDefault(require("./AbstractFileSystemStorageFactory"));
var fileSystemStorage_1 = __importDefault(require("./local/fileSystemStorage"));
var LocalFileSystemStorageFactory = /** @class */ (function (_super) {
    __extends(LocalFileSystemStorageFactory, _super);
    function LocalFileSystemStorageFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalFileSystemStorageFactory.prototype.create = function () {
        return new fileSystemStorage_1.default('alboms');
    };
    return LocalFileSystemStorageFactory;
}(AbstractFileSystemStorageFactory_1.default));
exports.LocalFileSystemStorageFactory = LocalFileSystemStorageFactory;
