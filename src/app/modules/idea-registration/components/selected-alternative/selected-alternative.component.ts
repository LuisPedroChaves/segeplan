import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';
import { AlternativeStore, IdeaStore } from 'src/app/store/reducers';
import { ConvertService } from '../../../../core/services/internal/convert.service';
import * as moment from 'moment';
import { GeneralInformation } from 'src/app/core/models/informationGeneral/GeneralInformation';

// Importaciones de Impresion
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-selected-alternative',
  templateUrl: './selected-alternative.component.html',
  styleUrls: ['./selected-alternative.component.scss']
})
export class SelectedAlternativeComponent implements OnInit, OnDestroy {



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

  ideaStoreSubscription = new Subscription();
  currentIdea: GeneralInformation = null;

  alternativeStoreSubscription = new Subscription()
  currentAlternative: IdeaAlternative = null!;

  constructor(
    private alternativeStore: Store<AlternativeStore>,
    private ideaStore: Store<IdeaStore>,
  ) { }

  ngOnInit(): void {
    this.ideaStoreSubscription = this.ideaStore.select('idea')
      .subscribe(state => {
        this.currentIdea = state.idea;
        console.log(this.currentIdea);
      })
      
    this.alternativeStoreSubscription = this.alternativeStore.select('alternative')
      .subscribe(state => {
        this.currentAlternative = state.alternative
        console.log(this.currentAlternative);
      });
  }

  async printReport(): Promise<void> {
    let imageLogo = await ConvertService.getBase64ImageFromURL('assets/img/Logo-min.jpg');


    let today = moment().format('DD.MM.YYYY');
    let dateArr = today.split('.');
    let monthName = ConvertService.convertMonthToString(parseInt(dateArr[1]));
    let dateToday = `Guatemala, ${dateArr[0]} de ${monthName} de ${dateArr[2]}`

    let dateCreateIdea = moment(this.currentIdea.createdAt).format('DD/MM/YYYY')

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

    if (this.currentAlternative.qualification?.descProblemComment) {
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
          text: this.currentAlternative.qualification?.descProblemComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (this.currentAlternative.qualification?.generalObjctComment) {
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
          text: this.currentAlternative.qualification?.generalObjctComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }

    if (this.currentAlternative.qualification?.anlysDelimitationComment) {
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
          text: this.currentAlternative.qualification?.anlysDelimitationComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (this.currentAlternative.qualification?.terrainIdentComment) {
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
          text: this.currentAlternative.qualification?.terrainIdentComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (this.currentAlternative.qualification?.legalSituationComment) {
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
          text: this.currentAlternative.qualification?.legalSituationComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }


    if (this.currentAlternative.qualification?.descAnlysComment) {
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
          text: this.currentAlternative.qualification?.descAnlysComment,
          alignment: 'left',
          border: [false, false, false, false],
        },
      ];
      rows.push(alt)
    }

    if (this.currentAlternative.qualification?.total) {

      let textDesc = this.currentAlternative.qualification?.total.toString();
      (this.currentAlternative.qualification?.descriptionGeneral) ? textDesc = textDesc + ' - ' + this.currentAlternative.qualification?.descriptionGeneral : textDesc;

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


    let resultadoPre = this.currentAlternative.preInvestment.etapaResultado.toUpperCase();
    // this.currentAlternative.qualification?.



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
        this.currentAlternative.resEntity.leaderName,
        'Puesto Indefinido',
        this.currentAlternative.resEntity.nameEPI,
        'Presente\n\n\n\n',
        'Estimado representante de la Secretaria de la Nación:\n\n',
        {
          text: [
            'Deseándoles éxitos en sus labores cotidianas, permítame infórmale con base en la información de la idea registrada en el Banco de Ideas de Proyectos denominada ',
            this.currentAlternative.preName.preliminaryName,
            ' con fecha ', dateCreateIdea, ' y código de registro ',
            this.currentIdea.registerCode, ', su IDEA DE PROYECTO queda en calidad de ', this.currentAlternative.qualification?.result.toUpperCase(), ', lo anterior de acuerdo al análisis de la información consignada.\n\n\n',],
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
            '\n\n\n\n\n\n\n\nSe le recomienda que la etapa a la cual debe llegar la idea de proyecto, previo a la etapa de ejecución sea: ',
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

  ngOnDestroy(): void {
    this.alternativeStoreSubscription?.unsubscribe()
    this.ideaStoreSubscription?.unsubscribe()
  }

}
