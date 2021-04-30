import { I_FileSystemStorage } from "./I_FileSystemStorage";

export default abstract class FileSystemStorageFactory {
    /**
     * Обратите внимание, что Создатель может также обеспечить реализацию
     * фабричного метода по умолчанию.
     */
    public abstract create(): I_FileSystemStorage;
}