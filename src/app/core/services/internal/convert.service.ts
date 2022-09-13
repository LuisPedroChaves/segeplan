import { Injectable } from '@angular/core';
import * as moment from 'moment';
// Importaciones de Impresion
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { GeneralInformation } from '../../models/informationGeneral/GeneralInformation';
import { IdeaAlternative } from '../../models/alternative/ideaAlternative';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class ConvertService {
  styles = {
    header: {
      fontSize: 18,
      bold: true
    },
    subheader: {
      fontSize: 15,
      bold: true
    },
    quote: {
      italics: true
    },
    small: {
      fontSize: 8
    },
    cellHeader: { fillColor: '#D6D6D6', bold: true }
  };

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

  static async createIdeaReportPertinenceAndPreinvestment(currentIdea: GeneralInformation, currentAlternative: IdeaAlternative): Promise<void>{
    let imageLogo = await ConvertService.getBase64ImageFromURL('assets/img/Logo-min.jpg');


    let today = moment().format('DD.MM.YYYY');
    let dateArr = today.split('.');
    let monthName = ConvertService.convertMonthToString(parseInt(dateArr[1]));
    let dateToday = `Guatemala, ${dateArr[0]} de ${monthName} de ${dateArr[2]}`

    let dateCreateIdea = moment(currentIdea.createdAt).format('DD/MM/YYYY')

    let tableBody: any[] =
      [
        {
          text: 'No.',
          style: 'cellHeader',
          border: [false, false, false, true]
        },
        {
          text: 'Criterios de Pertinencia',
          style: 'cellHeader',
          border: [false, false, false, true]
        },
        {
          text: 'RECOMENDACIONES',
          alignment: 'left',
          style: 'cellHeader',
          border: [false, false, false, true]
        }
      ]

    let rows = []
    let numberI = 0

    if (currentAlternative.qualification?.descProblemComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Descripción de la problemática y el indicador (Línea base)',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.descProblemComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (currentAlternative.qualification?.generalObjctComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Objetivo General y resultado',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.generalObjctComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }

    if (currentAlternative.qualification?.anlysDelimitationComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Análisis de la delimitación preliminar de beneficiarios.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.anlysDelimitationComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (currentAlternative.qualification?.terrainIdentComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Identificación del terreno.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.terrainIdentComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (currentAlternative.qualification?.legalSituationComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Situación legal del posible bien inmueble.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.legalSituationComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (currentAlternative.qualification?.descAnlysComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Análisis de la descripción de la idea.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.descAnlysComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }

    if (currentAlternative.qualification?.total) {

      let textDesc = currentAlternative.qualification?.total.toString();
      (currentAlternative.qualification?.descriptionGeneral) ? textDesc = textDesc + ' - ' + currentAlternative.qualification?.descriptionGeneral : textDesc;

      let alt = [
        {
          text: '',
          border: [false, false, false, false],
        },
        {
          text: 'TOTAL OBTENIDO.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: textDesc,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    let resultadoPre = currentAlternative.preInvestment.etapaResultado.toUpperCase();
    // currentAlternative.qualification?.



    const pdfDefinition: any = {
      content: [
        {
          stack: [
            {
              text: dateToday,
              alignment: 'right',
              margin: [0, 0, 0, -35],
            }
          ],
        },
        {
          image: imageLogo,
          width: 150,
          opacity: 0.5,
          margin: [0, 0, 0, 35],
        },
        currentAlternative.resEntity.leaderName,
        'Puesto Indefinido',
        currentAlternative.resEntity.nameEPI,
        'Presente\n\n\n\n',
        'Estimado representante de la Secretaria de la Nación:\n\n',
        {
          text: [
            'Deseándoles éxitos en sus labores cotidianas, permítame infórmale con base en la información de la idea registrada en el Banco de Ideas de Proyectos denominada ',
            currentAlternative.preName.preliminaryName,
            ' con fecha ', dateCreateIdea, ' y código de registro ',
            currentIdea.registerCode, ', su IDEA DE PROYECTO queda en calidad de ', currentAlternative.qualification?.result.toUpperCase(), ', lo anterior de acuerdo al análisis de la información consignada.\n\n\n',],
          alignment: 'justify'
        },
        {
          style: 'tableExample',
          table: {
            body: [
              tableBody,
              ...rows
            ]
          },
          alignment: 'center',
          layout: {
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
              return (rowIndex % 2 === 0) ? '#f2f2f2' : null;
            },
          },
          margin: [40, 0, 40, 35],
        },
        {
          text: [
            '\n\n\n\n\nSe le recomienda que la etapa a la cual debe llegar la idea de proyecto, previo a la etapa de ejecución sea: ',
            resultadoPre + '\n\n\n'
          ],
          alignment: 'justify',
        },
        {
          style: 'tableExample',
          table: {
            body: [
              [
                {
                  text: 'ETAPA SUGERIDA DE PREINVERSIÓN A LA QUE DEBE LLEGAR',
                  style: 'cellHeader',
                  border: [false, false, false, false],
                  colSpan: 2,
                },
                {
                }
              ],
              [
                {
                  text: 'ETAPA SUGERIDA',
                  border: [false, true, true, false],
                },
                {
                  text: resultadoPre,
                  alignment: 'left',
                  border: [false, true, false, false],
                },
              ],
            ]
          },
          alignment: 'center',
          layout: {
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
              return (rowIndex % 2 === 0) ? '#f2f2f2' : null;
            },
          },
          margin: [70, 0, 40, 35],
        },
        {
          text: '\n\nLa Dirección de Preinversión, queda a la disposición para cualquier para cualquier asesoría que se requiera.',
          alignment: 'justify',
        },
        {
          text: '\n\n\n Atentamente',
          alignment: 'justify',
        },
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }


  static async createIdeaReportPertinence(currentIdea: GeneralInformation, currentAlternative: IdeaAlternative): Promise<void>{
    let imageLogo = await ConvertService.getBase64ImageFromURL('assets/img/Logo-min.jpg');


    let today = moment().format('DD.MM.YYYY');
    let dateArr = today.split('.');
    let monthName = ConvertService.convertMonthToString(parseInt(dateArr[1]));
    let dateToday = `Guatemala, ${dateArr[0]} de ${monthName} de ${dateArr[2]}`

    let dateCreateIdea = moment(currentIdea.createdAt).format('DD/MM/YYYY')

    let tableBody: any[] =
      [
        {
          text: 'No.',
          style: 'cellHeader',
          border: [false, false, false, true]
        },
        {
          text: 'Criterios de Pertinencia',
          style: 'cellHeader',
          border: [false, false, false, true]
        },
        {
          text: 'RECOMENDACIONES',
          alignment: 'left',
          style: 'cellHeader',
          border: [false, false, false, true]
        }
      ]

    let rows = []
    let numberI = 0

    if (currentAlternative.qualification?.descProblemComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Descripción de la problemática y el indicador (Línea base)',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.descProblemComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (currentAlternative.qualification?.generalObjctComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Objetivo General y resultado',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.generalObjctComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }

    if (currentAlternative.qualification?.anlysDelimitationComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Análisis de la delimitación preliminar de beneficiarios.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.anlysDelimitationComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (currentAlternative.qualification?.terrainIdentComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Identificación del terreno.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.terrainIdentComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (currentAlternative.qualification?.legalSituationComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Situación legal del posible bien inmueble.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.legalSituationComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (currentAlternative.qualification?.descAnlysComment) {
      numberI = numberI + 1;
      let alt = [
        {
          text: numberI,
          border: [false, false, true, false],
        },
        {
          text: 'Análisis de la descripción de la idea.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: currentAlternative.qualification?.descAnlysComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }

    if (currentAlternative.qualification?.total) {

      let textDesc = currentAlternative.qualification?.total.toString();
      (currentAlternative.qualification?.descriptionGeneral) ? textDesc = textDesc + ' - ' + currentAlternative.qualification?.descriptionGeneral : textDesc;

      let alt = [
        {
          text: '',
          border: [false, false, false, false],
        },
        {
          text: 'TOTAL OBTENIDO.',
          alignment: 'left',
          border: [false, false, false, false],
        },
        {
          text: textDesc,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }





    const pdfDefinition: any = {
      content: [
        {
          stack: [
            {
              text: dateToday,
              alignment: 'right',
              margin: [0, 0, 0, -35],
            }
          ],
        },
        {
          image: imageLogo,
          width: 150,
          opacity: 0.5,
          margin: [0, 0, 0, 35],
        },
        currentAlternative.resEntity.leaderName,
        'Puesto Indefinido',
        currentAlternative.resEntity.nameEPI,
        'Presente\n\n\n\n',
        'Estimado representante de la Secretaria de la Nación:\n\n',
        {
          text: [
            'Deseándoles éxitos en sus labores cotidianas, permítame infórmale con base en la información de la idea registrada en el Banco de Ideas de Proyectos denominada ',
            currentAlternative.preName.preliminaryName,
            ' con fecha ', dateCreateIdea, ' y código de registro ',
            currentIdea.registerCode, ', su IDEA DE PROYECTO queda en calidad de ', currentAlternative.qualification?.result.toUpperCase(), ', lo anterior de acuerdo al análisis de la información consignada.\n\n\n',],
          alignment: 'justify'
        },
        {
          style: 'tableExample',
          table: {
            body: [
              tableBody,
              ...rows
            ]
          },
          alignment: 'center',
          layout: {
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
              return (rowIndex % 2 === 0) ? '#f2f2f2' : null;
            },
          },
          margin: [40, 0, 40, 35],
        },
        {
          text: '\n\nLa Dirección de Preinversión, queda a la disposición para cualquier para cualquier asesoría que se requiera.',
          alignment: 'justify',
        },
        {
          text: '\n\n\n Atentamente',
          alignment: 'justify',
        },
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }
}
