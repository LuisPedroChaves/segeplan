import { createAction, props } from '@ngrx/store';
import { PreinvDocument } from '../../core/models/sinafip/preinvDocument';


export const READ_PREINVDOCUMENTS = createAction(
	'[PREINVDOCUMENTS] Leer preinvDocuments'
);

export const SET_PREINVDOCUMENTS = createAction(
	'[PREINVDOCUMENTS] Asignar preinvDocuments',
	props<{ preinvDocuments: PreinvDocument[] }>()
)
