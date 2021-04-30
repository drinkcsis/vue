import { I_DBStorage } from "../I_DBStorage";
import { AlbomModel } from '../../../models/albomModel';
import { PhotoModel } from "../../../models/photoModel";

export default class DBStorage implements I_DBStorage{
    private db: any;
    constructor(db: any) {
        this.db = db;
    }

    fetchAlboms({ perPage, page }: { perPage: number, page: number }): object[]
    {
        const alboms = this.db.queryAll('alboms', {
            start: (page - 1) * perPage,
            limit: perPage
        });

        return alboms
    }

    createAlbom({ title, description, path }: { title: string, description: string, path: string }): object
    {
        const albom = new AlbomModel({ title, description, path});
        albom.ID = this.db.insert('alboms', albom);
        this.db.commit();

        return albom;
    }

    addPhoto({ albomId, urls, name }: { albomId: number, urls: { origin_url: string, small: string}, name: string }) {
        const photo = {
            id: null,
            name,
            albom_id: albomId,
            urls: urls
        };
        photo.id = this.db.insert('photos', photo);
        this.db.commit();
        return photo;
    }

    deletePhoto(photo: PhotoModel) {
        if (photo.id) {
            this.db.deleteRows('photos', { ID: photo.id });
            this.db.commit();
        }
    }
    fetchPhotos({ albomId, perPage, page }: { albomId: number, perPage: number, page: number }) {

        const photos = this.db.queryAll('photos', {
            query: { albom_id: albomId },
            start: (page - 1) * perPage,
            limit: perPage
        });

        return photos;
    }
}