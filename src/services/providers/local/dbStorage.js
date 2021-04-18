import localStorageDB from 'localstoragedb';

var db = new localStorageDB('library', localStorage);
if (db.isNew()) {
    db.createTable('alboms', ['title', 'description', 'preview_photos']);
    db.createTable('photos', ['albom_id', 'urls']);
    db.commit();
    console.log('New Database created')
}
export default {
    createAlbom: ({ title, description }) => {
        const albom = { title, description, preview_photos: [] };
        albom.id = db.insert('alboms', albom);
        db.commit();

        return albom;
    },
    fetchAlboms: ({ perPage, page }) => {
        const alboms = db.queryAll('alboms', {
            start: (page - 1) * perPage,
            limit: perPage
        });

        return alboms
    },
    addPhoto: ({ albomId, urls, name }) => {
        const photo = {
            albom_id: albomId,
            urls: urls,
            name
        };
        photo.id = db.insert('photos', photo);
        db.commit();
        return photo;
    },
    deletePhoto: ({photoId}) => {
        db.deleteRows('photos', { ID: photoId });
        db.commit();
        return true;
    },
    fetchPhotos: ({ albomId, perPage, page }) => {

        const photos = db.queryAll('photos', {
            query: { albom_id: albomId },
            start: (page - 1) * perPage,
            limit: perPage
        });

        return photos;
    }
}