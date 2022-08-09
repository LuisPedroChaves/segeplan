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

export const OPEN_FULL_DRAWER2 = createAction(
	'[DRAWER] Abir cajón 2',
	props<{ fullTitle2: string, fullComponent2: string }>()
);

export const CLOSE_FULL_DRAWER2 = createAction(
    '[DRAWER] Cerrar cajón 2',
)
