"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbomModel = void 0;
var AlbomModel = /** @class */ (function () {
    function AlbomModel(_a) {
        var _b = _a.ID, ID = _b === void 0 ? null : _b, _c = _a.title, title = _c === void 0 ? '' : _c, _d = _a.description, description = _d === void 0 ? '' : _d, _e = _a.preview_photo, preview_photo = _e === void 0 ? '' : _e, _f = _a.path, path = _f === void 0 ? '' : _f;
        this.ID = ID;
        this.title = title;
        this.description = description;
        this.preview_photo = preview_photo;
        this.path = path;
    }
    return AlbomModel;
}());
exports.AlbomModel = AlbomModel;
