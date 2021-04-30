import { PhotoCollection, PhotoModel } from '../../models/photoModel';
import { I_DBStorage } from '../../providers/dbStorage/I_DBStorage';
import { LocalDBStorageFactory } from '../../providers/dbStorage/LocalDBStorageFactory';
import { I_FileSystemStorage } from '../../providers/fileSystemStorage/I_FileSystemStorage';
import { LocalFileSystemStorageFactory } from '../../providers/fileSystemStorage/LocalFileSystemStorageFactory';
import { I_PhotoService } from './I_PhotoService';

class PhotoService implements I_PhotoService {
    private dbStorage: I_DBStorage;
    private fileSystemStorage: I_FileSystemStorage;

    constructor() {
        // if (config.dbStorageType == 'local') {
        const localDBStorageFactory = new LocalDBStorageFactory();
        this.dbStorage = localDBStorageFactory.create();

        const localFileSystemStorageFactory = new LocalFileSystemStorageFactory();
        this.fileSystemStorage = localFileSystemStorageFactory.create();
        // }
    }
    async uploadPhoto({ albomId, file }: { albomId: number, file: any }) {
        const photoInfo = await this.fileSystemStorage.uploadPhoto(file)
        let photoModel: any;
        if (photoInfo)
            photoModel = new PhotoModel(this.dbStorage.addPhoto({
                albomId,
                urls: photoInfo.urls,
                name: photoInfo.name,
            }));
        return photoModel;
    }

    async fetchPhotos({ albomId, perPage, page }: { albomId: number, perPage: number, page: number }): Promise<PhotoCollection> {
        const photos = this.dbStorage.fetchPhotos({ albomId, perPage, page });
        return photos.map((photo: any) => {
            return new PhotoModel({
                id: photo.ID,
                ...photo
            })
        });
    }

    async deletePhoto({ photo }: { photo: PhotoModel }) {
        await this.fileSystemStorage.deletePhoto(photo);
        this.dbStorage.deletePhoto(photo);
    }
}
const photoServiceInstance = new PhotoService();
export default photoServiceInstance;
