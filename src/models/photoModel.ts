export interface IPhotoModel { }

export class PhotoModel implements IPhotoModel {
    id: number | null
    name: string
    albom_id: number | null
    urls: {
        origin_url: string
        small: string
    }

    constructor(
        { id = null, name = '', albom_id = null, urls = { origin_url: '', small: '' } }:
        { id: number | null, name: string, albom_id: number | null, urls: { origin_url: string, small: string } }
    ) {
        this.id = id
        this.name = name
        this.albom_id = albom_id
        this.urls = urls
    }
}

export type PhotoCollection = Array<PhotoModel>;