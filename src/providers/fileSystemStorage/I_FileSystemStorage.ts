import { PhotoModel } from '../../models/photoModel';

export interface I_FileSystemStorage {
    createAlbom({ title }: { title: string }): Promise<any>
    uploadPhoto({ file }: { file: string }): Promise<any>
    deletePhoto(photo: PhotoModel): void
}