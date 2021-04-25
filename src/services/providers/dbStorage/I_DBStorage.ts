import { PhotoModel } from "../../../models/photoModel";

export interface I_DBStorage {
    fetchAlboms({ perPage, page }: { perPage: number, page: number }): object[]
    createAlbom({ title, description, path }: { title: string, description: string, path: string }): object
    addPhoto({ albomId, urls, name }: { albomId: number, urls: { origin_url: string, small: string }, name: string }): object
    deletePhoto(photo: PhotoModel): void
    fetchPhotos({ albomId, perPage, page }: { albomId: number, perPage: number, page: number }): object
}