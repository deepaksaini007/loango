import { AdminEffects } from './admin';
import { AuthorizationEffects } from './authorization';
import { MasterAppDataEffects } from './master-app-data';
import { MasterItemListEffects } from './master-item-list';

export * from './authorization';

export const effects:any[] = [
    AuthorizationEffects,
    MasterItemListEffects,
    MasterAppDataEffects,
    AdminEffects
 ]
