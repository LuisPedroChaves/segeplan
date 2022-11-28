import { ObjectEffects } from './object.effects';
import { ProcesoEffects } from './proceso.effects';
import { GeograficoEffects } from './geografico.effects';
import { ProductEffects } from './product.effects';
import { SessionEffects } from './session.effects';
import { DenominationEffects } from './denomination.effects';
import { ReferenceEffects } from './popRef.effects';
import { EntityEffects } from './entity.effects';
import { ProjectFunctionEffects } from './projectFunction.effects';
import { GeneralStudyEffects } from './generalStudy.effects';
import { PreinvDocumentEffects } from './preinvDocument.effects';
import { ModalityFinancingEffects } from './modalityFinancing.effects';
import { CheckProjectEffects } from './checkProject.effects'
export const effectsArray: any[] = [
    SessionEffects, ProductEffects,
    GeograficoEffects, ProcesoEffects,
    ObjectEffects, DenominationEffects,
    ReferenceEffects, EntityEffects,
    ProjectFunctionEffects, GeneralStudyEffects,
    PreinvDocumentEffects, ModalityFinancingEffects,
    CheckProjectEffects
];
