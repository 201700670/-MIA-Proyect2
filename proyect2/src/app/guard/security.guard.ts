import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Perfil } from '../components/models/perfil'
import { UploadService } from "../services/upload.service";

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {
  constructor(private UserService: UploadService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.UserService.getUser()) {
      var user: Perfil = this.UserService.getUser();
      
      if (user.tipousuario == 2) {
        return true;
      } else {
        console.log(user.tipousuario);
        if (user.tipousuario == 1) {
          this.router.navigate(["admin"]);
        }else if (user.tipousuario == 3) { 
        }else { 
          this.router.navigate([""]) 
        }
        //alert("no tiene permiso");
        return true;
        
      }

    } else {
      alert("no tiene permiso");
      this.router.navigate([""]);
      return false;
    }
  }

}
