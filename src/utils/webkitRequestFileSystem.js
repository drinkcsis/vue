"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blobUtil = require('blob-util');
exports.default = new Promise(function (resolve, reject) {
    window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1204, function (fileSystem) {
        window.fs = fileSystem;
        window.fsAPI = {
            deleteDir: function (dir) {
                window.fs.root.getDirectory(dir, {}, function (dirEntry) {
                    dirEntry.removeRecursively(function () {
                        console.log('Directory removed.');
                    }, err);
                }, err);
            },
            createDir: function (dir) {
                return new Promise(function (resolve, reject) {
                    window.fs.root.getDirectory(dir, { create: true }, function (FileSystemDirectoryEntry) {
                        console.log('Directory created.');
                        resolve(FileSystemDirectoryEntry);
                    }, reject);
                });
            },
            clearDir: function (dir) {
                window.fs.root.getDirectory(dir, {}, function (dirEntry) {
                    var dirReader = dirEntry.createReader();
                    dirReader.readEntries(function (content) {
                        content.forEach(function (item) {
                            if (item.isDirectory) {
                                window.fsAPI.deleteDir(item.fullPath);
                            }
                            if (item.isFile) {
                                window.fsAPI.deleteFile(item.fullPath);
                            }
                        });
                    }, err);
                }, err);
            },
            deleteFile: function (filePath, removeThmb) {
                if (removeThmb === void 0) { removeThmb = false; }
                if (removeThmb) {
                    filePath = filePath.replace(/(\.[\w\d_-]+)$/i, '_w_300$1');
                }
                window.fs.root.getFile(filePath, { create: false }, function (fileEntry) {
                    fileEntry.remove(function () {
                        console.log('File removed.');
                    }, err);
                }, err);
            },
            createThmbFile: function (dir, _file) {
                return new Promise(function (resolve) {
                    var fileName = _file.name.replace(/(\.[\w\d_-]+)$/i, '_w_300$1');
                    var reader = new FileReader();
                    reader.readAsDataURL(_file);
                    reader.onload = function (event) {
                        var img = new Image();
                        img.src = event.target.result;
                        img.onload = function () {
                            var elem = document.createElement('canvas');
                            var width = 300;
                            var scaleFactor = width / img.width;
                            elem.width = width;
                            elem.height = img.height * scaleFactor;
                            var ctx = elem.getContext('2d');
                            ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                            ctx.canvas.toBlob(function (blob) {
                                var file = new File([blob], fileName, {
                                    type: _file.type,
                                    lastModified: Date.now()
                                });
                                window.fsAPI.createFile(dir, file).then(function (url) { return resolve(url); });
                            }, _file.type, 1);
                        },
                            reader.onerror = function (error) { return console.log(error); };
                    };
                });
            },
            createFile: function (dir, file) {
                return new Promise(function (resolve) {
                    if (!file)
                        return resolve(null);
                    window.fs.root.getDirectory(dir, { create: true }, function (dirEntry) {
                        // save original_file
                        dirEntry.getFile(file.name, { create: true }, function (fileEntry) {
                            // create a writer that can put data in the file
                            fileEntry.createWriter(function (writer) {
                                writer.onerror = err;
                                writer.onwriteend = function () {
                                    // when done, continue to the next file                            
                                    console.log(fileEntry.toURL(), ' File created');
                                    resolve(fileEntry.toURL());
                                };
                                var fileReader = new FileReader();
                                fileReader.onloadend = function (e) {
                                    var arrayBuffer = e.target.result;
                                    var fileType = file.type;
                                    var blob = blobUtil.arrayBufferToBlob(arrayBuffer, fileType);
                                    writer.write(blob);
                                };
                                fileReader.readAsArrayBuffer(file);
                            }, err);
                        }, err);
                    });
                });
            },
            getFiles: function (dir, callback) {
                window.fs.root.getDirectory(dir, {}, function (dirEntry) {
                    var dirReader = dirEntry.createReader();
                    var urls = [];
                    dirReader.readEntries(function (content) {
                        content.forEach(function (item) {
                            if (item.isFile) {
                                urls.push(item.toURL());
                            }
                        });
                        callback && callback(urls);
                    }, err);
                }, err);
            },
            getDirs: function (dir) {
                return new Promise(function (resolve, reject) {
                    window.fs.root.getDirectory(dir, {}, function (dirEntry) {
                        var dirReader = dirEntry.createReader();
                        var folders = [];
                        dirReader.readEntries(function (content) {
                            content.forEach(function (item) {
                                if (item.isDirectory) {
                                    folders.push(item.name);
                                }
                            });
                            resolve(folders);
                        }, reject);
                    }, reject);
                });
            }
        };
        resolve(true);
    }, function (e) {
        reject();
        console.log('Error', e);
    });
    var err = function (e) {
        reject();
        throw e;
    };
});
