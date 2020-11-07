import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Perfil } from '../components/models/perfil';
import { UploadService } from '../services/upload.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGuard implements CanActivate {
  constructor(private userService: UploadService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.getUser()) {
      var user: Perfil = this.userService.getUser();
      if (user.tipousuario == 1 || user.tipousuario== 3) {
        if (user.tipousuario == 1) {
          this.router.navigate(['admin']);
        } else if (user.tipousuario == 3) {
          // pendiente
        }
        alert("no tiene permiso");
        return false;
      }
      else { return true; }

    } else {
      return true;
    }
  }

}
