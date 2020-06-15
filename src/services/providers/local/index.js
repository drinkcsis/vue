import dbStorage from './dbStorage';
import fileSystemStorage from './fileSystemStorage';

import { AlbomModel, AlbomCollection } from '../../../models/albomModel';
import { PhotoModel, PhotoCollection } from '../../../models/photoModel';

export default {
    createAlbom: async ({ title, description }) => {

        await fileSystemStorage.createAlbom(title)
        const albomModel = AlbomModel(dbStorage.createAlbom({ title, description }));

        return albomModel;
    },

    fetchAlboms: async ({ perPage, page }) => {
        const alboms = dbStorage.fetchAlboms({ perPage, page });

        const albomCollection = AlbomCollection(
            alboms.map(albom => {

                return AlbomModel({
                    id: albom.ID,
                    ...albom
                })
            })
        );

        return albomCollection;
    },

    uploadPhoto: async ({ albomId, file }) => {
        const urls = await fileSystemStorage.uploadPhoto(file)
        let photoModel;
        if (urls)
            photoModel = PhotoModel(dbStorage.addPhoto({ albomId, urls }));
        return photoModel;

    },

    fetchPhotos: async ({ albomId, perPage, page }) => {
        const photos = dbStorage.fetchPhotos({ albomId, perPage, page });

        const photoCollection = PhotoCollection(
            photos.map(photo => {
                return PhotoModel({
                    id: photo.ID,
                    ...photo
                })
            })
        );
        return photoCollection
    }
}