"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var albomModel_1 = require("../models/albomModel");
var photoModel_1 = require("../models/photoModel");
var dbStorage_1 = __importDefault(require("./providers/dbStorage/local/dbStorage"));
var fileSystemStorage_1 = __importDefault(require("./providers/fileSystemStorage/local/fileSystemStorage"));
var APIV2 = /** @class */ (function () {
    function APIV2() {
    }
    APIV2.prototype.createAlbom = function (_a) {
        var title = _a.title, description = _a.description;
        return __awaiter(this, void 0, void 0, function () {
            var path, albomModel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fileSystemStorage_1.default.createAlbom({ title: title })];
                    case 1:
                        path = _b.sent();
                        albomModel = new albomModel_1.AlbomModel(dbStorage_1.default.createAlbom({ title: title, description: description, path: path.fullPath }));
                        return [2 /*return*/, albomModel];
                }
            });
        });
    };
    APIV2.prototype.fetchAlboms = function (_a) {
        var perPage = _a.perPage, page = _a.page;
        var alboms = dbStorage_1.default.fetchAlboms({ perPage: perPage, page: page });
        return alboms.map(function (albom) {
            return new albomModel_1.AlbomModel({
                ID: albom.ID,
                title: albom.title,
                description: albom.description,
                preview_photo: albom.preview_photo,
                path: albom.path
            });
        });
    };
    APIV2.prototype.uploadPhoto = function (_a) {
        var albomId = _a.albomId, file = _a.file;
        return __awaiter(this, void 0, void 0, function () {
            var photoInfo, photoModel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fileSystemStorage_1.default.uploadPhoto(file)];
                    case 1:
                        photoInfo = _b.sent();
                        if (photoInfo)
                            photoModel = new photoModel_1.PhotoModel(dbStorage_1.default.addPhoto({
                                albomId: albomId,
                                urls: photoInfo.urls,
                                name: photoInfo.name,
                            }));
                        return [2 /*return*/, photoModel];
                }
            });
        });
    };
    APIV2.prototype.fetchPhotos = function (_a) {
        var albomId = _a.albomId, perPage = _a.perPage, page = _a.page;
        return __awaiter(this, void 0, void 0, function () {
            var photos;
            return __generator(this, function (_b) {
                photos = dbStorage_1.default.fetchPhotos({ albomId: albomId, perPage: perPage, page: page });
                return [2 /*return*/, photos.map(function (photo) {
                        return new photoModel_1.PhotoModel(__assign({ id: photo.ID }, photo));
                    })];
            });
        });
    };
    APIV2.prototype.deletePhoto = function (_a) {
        var photo = _a.photo;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fileSystemStorage_1.default.deletePhoto(photo)];
                    case 1:
                        _b.sent();
                        dbStorage_1.default.deletePhoto(photo);
                        return [2 /*return*/];
                }
            });
        });
    };
    return APIV2;
}());
var APIV2Instance = new APIV2();
exports.default = APIV2Instance;
