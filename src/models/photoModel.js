"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoModel = void 0;
var PhotoModel = /** @class */ (function () {
    function PhotoModel(_a) {
        var _b = _a.id, id = _b === void 0 ? null : _b, _c = _a.name, name = _c === void 0 ? '' : _c, _d = _a.albom_id, albom_id = _d === void 0 ? null : _d, _e = _a.urls, urls = _e === void 0 ? { origin_url: '', small: '' } : _e;
        this.id = id;
        this.name = name;
        this.albom_id = albom_id;
        this.urls = urls;
    }
    return PhotoModel;
}());
exports.PhotoModel = PhotoModel;
