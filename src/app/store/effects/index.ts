import { ObjectEffects } from './object.effects';
import { ProcesoEffects } from './proceso.effects';
import { GeograficoEffects } from './geografico.effects';
import { ProductEffects } from './product.effects';
import { SessionEffects } from './session.effects';
import { DenominationEffects } from './denomination.effects';
import { ReferenceEffects } from './popRef.effects';
import { EntityEffects } from './entity.effects';
import { ProjectFunctionEffects } from './projectFunction.effects';
export const effectsArray: any[] = [
    SessionEffects, ProductEffects, 
    GeograficoEffects, ProcesoEffects, 
    ObjectEffects, DenominationEffects, 
    ReferenceEffects, EntityEffects,
    ProjectFunctionEffects
];

