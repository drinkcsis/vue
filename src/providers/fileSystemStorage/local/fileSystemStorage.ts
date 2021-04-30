import { I_FileSystemStorage } from "../I_FileSystemStorage";
import { PhotoModel } from "../../../models/photoModel";

export default class FileSystemStorage implements I_FileSystemStorage {
    constructor(private albomsDir: string) { }
    createAlbom({ title }: { title: string }): Promise<any> {
        return new Promise((resolve, reject) => {
            window.fsAPI.createDir(title)
                .then(dir => {
                    resolve(dir)
                }).catch(err => reject(err));
        });
    }
    async uploadPhoto( file: any ): Promise<any> {
        const photoInfo = {
            name: file.name,
            urls: {
                origin_url: '',
                small: ''
            }
        };
        const origin_url = await window.fsAPI.createFile(this.albomsDir, file)
        if (origin_url) {
            photoInfo.urls.origin_url = origin_url
        }
        const small = await window.fsAPI.createThmbFile(this.albomsDir, file)
        if (small) {
            photoInfo.urls.small = small
        }
        return photoInfo;
    }
    async deletePhoto(photo: PhotoModel): Promise<void> {
        await window.fsAPI.deleteFile(`${this.albomsDir}/${photo.name}`);
        await window.fsAPI.deleteFile(`${this.albomsDir}/${photo.name}`, true);
     }
}