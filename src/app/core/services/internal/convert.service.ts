import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {


  constructor() { }

  static convertMonthToString(month: number): string {

    if (month >= 1 || month <= 12){

      const arrMonths = [
        { number: 1, name: 'Enero' },
        { number: 2, name: 'Febrero' },
        { number: 3, name: 'Marzo' },
        { number: 4, name: 'Abril' },
        { number: 5, name: 'Mayo' },
        { number: 6, name: 'Junio' },
        { number: 7, name: 'Julio' },
        { number: 8, name: 'Agosto' },
        { number: 9, name: 'Septiembre' },
        { number: 10, name: 'Octubre' },
        { number: 11, name: 'Nomviembre' },
        { number: 12, name: 'Diciembre' },
      ]
  
      let monthObj = arrMonths.find((mnt: any) => mnt.number == month);
      return monthObj.name; 
    }
    return null;
  }

  static async getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

}
