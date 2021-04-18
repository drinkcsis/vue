import provider from './providers/local';
//Models
import { AlbomModel, AlbomCollection } from '../models/albomModel';
import { PhotoModel, PhotoCollection } from '../models/photoModel';

//Exceptions
import WrongModelType from '../exceptions/WrongModelType';
export default {
    createAlbom: async ({ title, description }) => {
        const albomModel = await provider.createAlbom({ title, description })
        if (!(albomModel instanceof AlbomModel)) {
            throw new WrongModelType('AlbomModel', albomModel);
        }
        return albomModel;

    },
    fetchAlboms: async ({ perPage, page }) => {
        const albomCollection = await provider.fetchAlboms({ perPage, page })
        if (!(albomCollection instanceof AlbomCollection)) {
            throw new WrongModelType('AlbomCollection', albomCollection);
        }
        return albomCollection;

    },
    uploadPhoto: async ({ albomId, file }) => {
        const photoModel = await provider.uploadPhoto({ albomId, file })
        if (!(photoModel instanceof PhotoModel)) {
            throw new WrongModelType('PhotoModel', photoModel);
        }
        return photoModel;
    },
    fetchPhotos: async ({ albomId, perPage, page }) => {
        const photoCollection = await provider.fetchPhotos({ albomId, perPage, page });

        if (!(photoCollection instanceof PhotoCollection)) {
            throw new WrongModelType('PhotoCollection', photoCollection);
        }

        return photoCollection;
    },

    deletePhoto: async ({photo}) => {
        if (!(photo instanceof PhotoModel)) {
            throw new WrongModelType('PhotoModel', photo);
        }

        await provider.deletePhoto({ photo })
    }
}