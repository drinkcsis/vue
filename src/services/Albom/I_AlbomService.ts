import { AlbomCollection, IAlbomModel } from "../../models/albomModel";

export interface I_AlbomService {
    createAlbom({ title, description }: { title: string, description: string }): IAlbomModel
    fetchAlboms({ perPage, page }: { perPage: number, page: number }): AlbomCollection
}