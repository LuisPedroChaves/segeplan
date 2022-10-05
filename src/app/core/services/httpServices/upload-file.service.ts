import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private API_URL = environment.root;
  private url = 'api/upload/';

  constructor(

  ) { }

  uploadFile( file: File, type: string, id: string) {

    return new Promise( (resolve, reject ) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      // const tokenstorege = this.authService.getToken();

      formData.append( 'archivo', file, file.name );

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log( 'Imagen Subida' );
            resolve( JSON.parse(xhr.response));
          } else {
            console.log( 'Fallo la subida' );
            console.log("🚀 ~ file: upload-file.service.ts ~ line 31 ~ UploadFileService ~ returnnewPromise ~ xhr.response", xhr)
            reject( xhr.response );
          }
        }
      };


      const url = `${this.API_URL}${this.url}${type}/${id}`

      xhr.open('PUT', url, true);
      // xhr.setRequestHeader('Authorization', 'Bearer ' + tokenstorege);
      xhr.send( formData );
    });

  }
}
