import fsAPI from "../../../utils/fs";

const ALBOMS_DIR = 'alboms'

export default {
    createAlbom: (title) => {
        return new Promise((resolve, reject) => {
            fsAPI.createDir(title)
                .then(dir => {
                    resolve(dir)
                }).catch(err => reject(err));
        });
    },

    uploadPhoto: async (file) => {
        const photoInfo = {
            name: file.name,
            urls: {}
        };
        const origin_url = await fsAPI.createFile(ALBOMS_DIR, file)
        if (origin_url) {
            photoInfo.urls.origin_url = origin_url
            const small = await fsAPI.createThmbFile(ALBOMS_DIR, file)
            photoInfo.urls.small = small
        }
        return photoInfo;
    },

    deletePhoto: async (photo) => {
        await fsAPI.deleteFile(`${ALBOMS_DIR}/${photo.name}`);
        await fsAPI.deleteFile(`${ALBOMS_DIR}/${photo.name}`, true);
    }
}