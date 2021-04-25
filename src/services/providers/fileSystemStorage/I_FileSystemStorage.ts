import { PhotoModel } from '../../../models/photoModel';

export interface I_FileSystemStorage {
    createAlbom({ title }: { title: string }): Promise<string>
    uploadPhoto({ file }: { file: string }): Promise<any>
    deletePhoto(photo: PhotoModel): void
}