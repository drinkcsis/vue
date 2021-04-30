import AbstractFileSystemStorageFactory from "./AbstractFileSystemStorageFactory";
import { I_FileSystemStorage } from "./I_FileSystemStorage";
import FileSystemStorage from "./local/fileSystemStorage";

export class LocalFileSystemStorageFactory extends AbstractFileSystemStorageFactory {
    public create(): I_FileSystemStorage {
        return new FileSystemStorage('alboms')
    }
}