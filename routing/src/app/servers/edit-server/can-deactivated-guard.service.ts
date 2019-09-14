import { Observable } from 'rxjs/Observable';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivated {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivated> {

    canDeactivate(component: CanComponentDeactivated,
                    currentRoute: ActivatedRouteSnapshot,
                    currentState: RouterStateSnapshot,
                    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate();
    }
}

