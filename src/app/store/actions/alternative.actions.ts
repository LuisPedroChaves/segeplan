import { createAction, props } from '@ngrx/store';

import { IdeaAlternative } from 'src/app/core/models/alternative/ideaAlternative';

export const SET_ALTERNATIVE = createAction(
	'[IDEA] Asignar alternativa',
	props<{ alternative: IdeaAlternative }>()
)
