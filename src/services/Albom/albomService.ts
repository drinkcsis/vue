import { AlbomCollection, AlbomModel } from '../../models/albomModel';
import { I_AlbomService } from './I_AlbomService';
import { I_DBStorage } from '../../providers/dbStorage/I_DBStorage';
import { LocalDBStorageFactory } from '../../providers/dbStorage/LocalDBStorageFactory';
import { I_FileSystemStorage } from '../../providers/fileSystemStorage/I_FileSystemStorage';
import { LocalFileSystemStorageFactory } from '../../providers/fileSystemStorage/LocalFileSystemStorageFactory';

class AlbomService implements I_AlbomService {
    private dbStorage: I_DBStorage;
    private fileSystemStorage: I_FileSystemStorage;

    constructor() {
        // if (config.dbStorageType == 'local') {
            const localDBStorageFactory = new LocalDBStorageFactory();
            this.dbStorage = localDBStorageFactory.create()
        
            const localFileSystemStorageFactory = new LocalFileSystemStorageFactory();
            this.fileSystemStorage = localFileSystemStorageFactory.create();
        // }
    }

    async createAlbom({ title, description }: { title: string, description: string }): Promise<AlbomModel> {
        const path = await this.fileSystemStorage.createAlbom({ title });
        const albomModel = new AlbomModel(this.dbStorage.createAlbom({ title, description, path: path.fullPath }));

        return albomModel;
    }

    fetchAlboms({ perPage, page }: { perPage: number, page: number }): AlbomCollection {
        const alboms = this.dbStorage.fetchAlboms({ perPage, page });

        return alboms.map((albom: any) => {
            return new AlbomModel({
                ID: albom.ID,
                title: albom.title,
                description: albom.description,
                preview_photo: albom.preview_photo,
                path: albom.path
            });
        });
    }
}
const albomServiceInstance = new AlbomService();
export default albomServiceInstance;
