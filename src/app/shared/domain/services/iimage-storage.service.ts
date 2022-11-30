import { Observable } from "rxjs";

export interface IImageStorageService {
    saveImage(fileName: string, base64String: string, format: string): Observable<string>;
}

export abstract class AbstractImageStorageService implements IImageStorageService {
    abstract saveImage(fileName: string, base64String: string, format: string): Observable<string>;
}