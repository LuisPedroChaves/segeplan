import { createAction, props } from '@ngrx/store';
import { ITrack } from 'src/app/core/models/seguimiento/progress';

import { IProject } from 'src/app/core/models/seguimiento/project';
import { IFiltroCheckProjects } from '../../core/models/adicionales/filtro-check-projects';

// Filtro para Sectorial y Terrritorial
export const CHANGE_IS_MINISTRY = createAction(
	'[CHECK PROJECTS] Cambiar estado de isMinistry',
	props<{ isMinistry: boolean }>()
)

export const READ_CHECK_PROJECTS = createAction(
  '[CHECK PROJECTS Listar proyectos creados',
  props<{ filtros: IFiltroCheckProjects }>()
)

export const SET_CHECK_PROJECTS = createAction(
  '[CHECK PROJECTS] Asignar listado dek proyectos',
  props<{ checkProjects: IProject[] }>()
)

export const CREATE_CHECK_PROJECT = createAction(
  '[CHECK PROJECTS] Crear nuevo proyecto',
  props<{ checkProject: IProject }>()
)

export const SET_NEW_CHECK_PROJECT = createAction(
  '[CHECK PROJECTS] Asignar nuevo projecto',
  props<{ checkProject: IProject }>()
)

export const SET_PROJECT = createAction(
  '[CHECK PROJECTS] Asignar proyecto actual',
  props<{ checkProject: IProject }>()
)

export const SET_TRACKING = createAction(
  '[CHECK PROJECTS] Asignar seguimiento al proyecto actual',
  props<{ tracking: ITrack[] }>()
)

export const UPDATE_PROJECT = createAction(
	'[CHECK PROJECTS] Actualizar proyecto',
	props<{ checkProject: IProject }>()
)

export const SET_EDIT_PROJECT = createAction(
	'[CHECK PROJECTS] Asignar proyecto editado',
	props<{ checkProject: IProject }>()
)
