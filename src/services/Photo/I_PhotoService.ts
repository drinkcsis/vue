import { PhotoModel, PhotoCollection } from '../../models/photoModel';


export interface I_PhotoService {
    uploadPhoto({ albomId, file }: { albomId: number, file: any }): Promise<PhotoModel>
    fetchPhotos({ albomId, perPage, page }: { albomId: number, perPage: number, page: number }): Promise<PhotoCollection>
    deletePhoto({ photo }: { photo: PhotoModel }): void
}