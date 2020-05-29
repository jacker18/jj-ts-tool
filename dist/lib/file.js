"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path_1 = require("path");
var FileTool = /** @class */ (function () {
    function FileTool() {
    }
    FileTool.readFile = function (path) {
        return new Promise(function (resolve) {
            fs.readFile(path, "utf-8", function (err, data) {
                if (err) {
                    resolve({
                        err: err
                    });
                }
                resolve({
                    data: data
                });
            });
        });
    };
    FileTool.isFileExisted = function (path) {
        return new Promise(function (resolve) {
            fs.access(path, function (err) {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    FileTool.isDir = function (path) {
        return new Promise(function (resolve) {
            var stat = fs.statSync(path);
            var dir = stat.isDirectory();
            resolve(dir);
        });
    };
    FileTool.mapDir = function (path) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var pathArr, isDirectory, paths_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pathArr = [];
                        return [4 /*yield*/, this.isDir(path)];
                    case 1:
                        isDirectory = _a.sent();
                        if (isDirectory) {
                            paths_1 = fs.readdirSync(path);
                            paths_1.forEach(function (pathstr, index) { return __awaiter(_this, void 0, void 0, function () {
                                var arr;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            pathstr = path_1.join(path, pathstr);
                                            if (!this.isDir(pathstr)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.mapDir(pathstr)];
                                        case 1:
                                            arr = _a.sent();
                                            pathArr = __spreadArrays(pathArr, arr);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            pathArr.push(pathstr);
                                            _a.label = 3;
                                        case 3:
                                            if (index === paths_1.length - 1) {
                                                resolve(pathArr);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        else {
                            pathArr = [path];
                            resolve(pathArr);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    FileTool.creatFile = function (path, content) {
        return new Promise(function (resolve) {
            fs.writeFile(path, content, 'utf-8', function (error) {
                if (error) {
                    console.log(error);
                    return;
                }
                resolve();
            });
        });
    };
    FileTool.delFiles = function (path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    FileTool.delFiles(curPath); //递归删除文件夹
                }
                else {
                    fs.unlinkSync(curPath); //删除文件
                }
            });
            fs.rmdirSync(path);
        }
    };
    FileTool.mkdir = function (filepath) {
        fs.mkdirSync(filepath);
    };
    return FileTool;
}());
exports.default = FileTool;
//# sourceMappingURL=file.js.map