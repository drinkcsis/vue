import fsAPI from "../../../utils/fs";

const ALBOMS_DIR = 'alboms'

export default {
    createAlbom: (title) => {
        return new Promise((resolve, reject) => {
            fsAPI.createDir(title)
                .then(dir => {
                    console.log(dir)
                    resolve(dir)
                }).catch(err => reject(err));
        });
    },

    uploadPhoto: async (file) => {
        const urls = {};
        const origin_url = await fsAPI.createFile(ALBOMS_DIR, file)
        if (origin_url) {
            urls.origin_url = origin_url
            const small = await fsAPI.createThmbFile(ALBOMS_DIR, file)
            urls.small = small
        }
        return urls;
    }
}