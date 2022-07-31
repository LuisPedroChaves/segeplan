import { createAction, props } from '@ngrx/store';

export const CHANGE_MENU_DRAWER = createAction(
	'[DRAWER] Cambiar estado del cajon para menu',
);

export const OPEN_FULL_DRAWER = createAction(
	'[DRAWER] Abir cajón',
	props<{ fullTitle: string, fullComponent: string }>()
);

export const CLOSE_FULL_DRAWER = createAction(
    '[DRAWER] Cerrar cajón',
)
