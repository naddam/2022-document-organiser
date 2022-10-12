import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthAdministratorGuard {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
        return this.check();
    }

    private check(): Observable<boolean | UrlTree> {
        return this.authService.authenticate().pipe(map((user) => {
            if (!user || !(user.role === 'Superadmin' || user.role === 'Administrator')) {
                return this.router.parseUrl('/login');
            }
            return true;
        }));
    }
}