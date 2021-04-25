import { IAPIV2 } from './apiTypes';
import { AlbomCollection, AlbomModel } from '../models/albomModel';
import { PhotoCollection, PhotoModel } from '../models/photoModel';
import dbStorage from './providers/dbStorage/local/dbStorage';
import fileSystemStorage  from './providers/fileSystemStorage/local/fileSystemStorage';

class APIV2 implements IAPIV2{
    async createAlbom({ title, description }: { title: string, description: string }): Promise<AlbomModel> {
        const path = await fileSystemStorage.createAlbom({title});
        const albomModel = new AlbomModel(dbStorage.createAlbom({ title, description, path: path.fullPath }));
        
        return albomModel;
    }

    fetchAlboms({ perPage, page }: { perPage: number, page: number }): AlbomCollection {
        const alboms = dbStorage.fetchAlboms({ perPage, page });

        return alboms.map((albom: any) => {
            return new AlbomModel({
                ID: albom.ID,
                title: albom.title,
                description: albom.description,
                preview_photo: albom.preview_photo,
                path: albom.path
            });
        });
    }

    async uploadPhoto({ albomId, file }: { albomId: number, file: any }) {
        const photoInfo = await fileSystemStorage.uploadPhoto(file)
        let photoModel: any;
        if (photoInfo)
            photoModel = new PhotoModel(dbStorage.addPhoto({
                albomId,
                urls: photoInfo.urls,
                name: photoInfo.name,
            }));
        return photoModel;
    }

    async fetchPhotos({ albomId, perPage, page }: { albomId: number, perPage: number, page: number }): Promise<PhotoCollection> {
        const photos = dbStorage.fetchPhotos({ albomId, perPage, page });
        return photos.map((photo: any) => {
            return new PhotoModel({
                id: photo.ID,
                ...photo
            })
        });
    }

    async deletePhoto({ photo }: {photo: PhotoModel}) {
        await fileSystemStorage.deletePhoto(photo);
        dbStorage.deletePhoto(photo);
    }
}
const APIV2Instance = new APIV2();
export default APIV2Instance;
