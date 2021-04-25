var blobUtil = require('blob-util')

interface IfsAPI {
    deleteDir: (dir: string) => void
    createDir: (dir: string) => Promise<any>
    clearDir: (dir: string) => void
    deleteFile: (filePath: string, removeThmb?: boolean) => void
    createThmbFile: (dir: string, _file: any) => Promise<string>
    createFile: (dir: string, file: any) => Promise<string | null>
    getFiles: (dir: string, callback: Function) => void
    getDirs: (dir: string) => Promise<string[]>
}

declare global {
    interface Window {
        webkitRequestFileSystem: any
        fs: any
        fsAPI: IfsAPI,
        TEMPORARY: any
    }
}
export default new Promise((resolve, reject) => {
    window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1204, (fileSystem: any) => {
        window.fs = fileSystem;
        window.fsAPI = {
            deleteDir: function (dir: string) {
                window.fs.root.getDirectory(dir, {}, function (dirEntry: any) {
                    dirEntry.removeRecursively(function () {
                        console.log('Directory removed.');
                    }, err);

                }, err);
            },

            createDir: function (dir: string) {
                return new Promise((resolve, reject) => {
                    window.fs.root.getDirectory(dir, { create: true }, function (FileSystemDirectoryEntry: any) {
                        console.log('Directory created.');
                        resolve(FileSystemDirectoryEntry)
                    }, reject);
                })

            },

            clearDir: function (dir: string) {
                window.fs.root.getDirectory(dir, {}, function (dirEntry: any) {

                    var dirReader = dirEntry.createReader();

                    dirReader.readEntries(function (content: any) {
                        content.forEach(function (item: any) {
                            if (item.isDirectory) {
                                window.fsAPI.deleteDir(item.fullPath)
                            }
                            if (item.isFile) {
                                window.fsAPI.deleteFile(item.fullPath)
                            }
                        })
                    }, err);

                }, err);

            },

            deleteFile: function (filePath: string, removeThmb: boolean = false) {
                if (removeThmb) {
                    filePath = filePath.replace(/(\.[\w\d_-]+)$/i, '_w_300$1');
                }
                window.fs.root.getFile(filePath, { create: false }, function (fileEntry: any) {
                    fileEntry.remove(function () {
                        console.log('File removed.');
                    }, err);

                }, err);
            },

            createThmbFile: function (dir, _file) {
                return new Promise((resolve) => {
                    const fileName = _file.name.replace(/(\.[\w\d_-]+)$/i, '_w_300$1');
                    const reader = new FileReader();
                    reader.readAsDataURL(_file);
                    reader.onload = (event: any) => {
                        const img = new Image();
                        img.src = event.target.result;
                        img.onload = () => {
                            const elem = document.createElement('canvas');
                            const width = 300;
                            const scaleFactor = width / img.width;
                            elem.width = width;
                            elem.height = img.height * scaleFactor;
                            const ctx: any = elem.getContext('2d');

                            ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                            ctx.canvas.toBlob((blob: any) => {
                                const file = new File([blob], fileName, {
                                    type: _file.type,
                                    lastModified: Date.now()
                                });
                                window.fsAPI.createFile(dir, file).then((url: any) => resolve(url))
                            }, _file.type, 1);
                        },
                            reader.onerror = error => console.log(error);
                    };
                });
            },

            createFile: function (dir, file) {
                return new Promise((resolve) => {

                    if (!file) return resolve(null);

                    window.fs.root.getDirectory(dir, { create: true }, function (dirEntry: any) {

                        // save original_file
                        dirEntry.getFile(
                            file.name, { create: true },
                            function (fileEntry: any) {
                                // create a writer that can put data in the file
                                fileEntry.createWriter(function (writer: any) {
                                    writer.onerror = err;
                                    writer.onwriteend = function () {
                                        // when done, continue to the next file                            
                                        console.log(fileEntry.toURL(), ' File created')
                                        resolve(fileEntry.toURL());
                                    };

                                    var fileReader = new FileReader();

                                    fileReader.onloadend = function (e: any) {
                                        var arrayBuffer = e.target.result;
                                        var fileType = file.type;
                                        var blob = blobUtil.arrayBufferToBlob(arrayBuffer, fileType);
                                        writer.write(blob);
                                    };
                                    fileReader.readAsArrayBuffer(file);

                                }, err);
                            },
                            err
                        );
                    })
                });

            },

            getFiles: function (dir, callback) {
                window.fs.root.getDirectory(dir, {}, function (dirEntry: any) {

                    var dirReader = dirEntry.createReader();
                    var urls: any[] = []

                    dirReader.readEntries(function (content: any) {
                        content.forEach(function (item: any) {
                            if (item.isFile) {
                                urls.push(item.toURL());
                            }
                        })
                        callback && callback(urls)
                    }, err);

                }, err);
            },

            getDirs: function (dir) {
                return new Promise((resolve, reject) => {
                    window.fs.root.getDirectory(dir, {}, function (dirEntry: any) {

                        var dirReader = dirEntry.createReader();
                        var folders: any[] = []

                        dirReader.readEntries(function (content: any) {
                            content.forEach(function (item: any) {
                                if (item.isDirectory) {
                                    folders.push(item.name);
                                }
                            })
                            resolve(folders)
                        }, reject);

                    }, reject);
                })

            }
        }
        resolve(true);
    }, function (e: any) {
        reject();
        console.log('Error', e);
    });

    const err = function (e: any) {
        reject();
        throw e;
    };
});
