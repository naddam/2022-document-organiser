import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthSuperadminGuard {

    constructor(
        private router: Router,
        private authService: AuthService,
    ){ }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean{
        return this.check();
    }

    private check(): Observable<boolean | UrlTree>{
        return this.authService.authenticate().pipe(map((user)=>{
            if(!user || user.role!=='Superadmin'){
                return this.router.parseUrl('/login');
            }
            return true;
        }));
    }
}