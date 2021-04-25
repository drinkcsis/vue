import { AlbomCollection, IAlbomModel } from "../models/albomModel";
import { PhotoModel, PhotoCollection } from '../models/photoModel';


export interface IAPIV2 {
    createAlbom({ title, description }: { title: string, description: string }): IAlbomModel
    fetchAlboms({ perPage, page }: { perPage: number, page: number }): AlbomCollection
    uploadPhoto({ albomId, file }: { albomId: number, file: any }): Promise<PhotoModel>
    fetchPhotos({ albomId, perPage, page }: { albomId: number, perPage: number, page: number }): Promise<PhotoCollection>
    deletePhoto({ photo }: { photo: PhotoModel}): void
}