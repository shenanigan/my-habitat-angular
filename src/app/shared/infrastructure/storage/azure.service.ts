import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { decode } from "base64-arraybuffer";
import { environment } from 'src/environments/environment';
import { IImageStorageService } from '../../domain/services/iimage-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AzureImageStorageService implements IImageStorageService {

    constructor(private _http: HttpClient) { }

    saveImage(fileName: string, base64String: string, format: string): Observable<string> {
        const blob = new Blob([new Uint8Array(decode(base64String!))], {
            type: `image/${format}`,
        });

        const file = new File([blob], "_", {
            type: blob.type,
        });

        let headers = new HttpHeaders({ 'Content-Type': blob.type, 'x-ms-blob-type': 'BlockBlob' });
        const imageUrl = `${environment.azureImageURL}${fileName}${environment.azureRWSASToken}`;
        return this._http.put<void>(imageUrl, file, { headers: headers }).pipe(map(_ => `${environment.azureImageURL}${fileName}`));
    }

}