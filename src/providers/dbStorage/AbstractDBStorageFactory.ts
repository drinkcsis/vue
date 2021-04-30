import { I_DBStorage } from "./I_DBStorage";

export default abstract class DBStorageFactory {
    /**
     * Обратите внимание, что Создатель может также обеспечить реализацию
     * фабричного метода по умолчанию.
     */
    public abstract create(): I_DBStorage;
}