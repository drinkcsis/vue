export interface IAlbomModel {}

export class AlbomModel implements IAlbomModel {
    ID: number | null
    title: string
    description: string
    preview_photo: string
    path: string

    constructor(
        { ID = null, title = '', description = '', preview_photo = '', path = '' }:
        { ID?: number | null, title?: string, description?: string, preview_photo?: string, path?: string }
    ) {
        this.ID = ID
        this.title = title
        this.description = description
        this.preview_photo = preview_photo
        this.path = path
    }
}

export type AlbomCollection = Array<AlbomModel>;