// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { UserService } from './user.service';  // Import your UserService

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private userService: UserService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     const currentUser = sessionStorage.getItem('username'); // Get username from sessionStorage
//     if (currentUser) {
//       // User is logged in, allow access to the page
//       return true;
//     } else {
//       // User is not logged in, redirect to login page
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }




import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const username = sessionStorage.getItem('username');
    if (username) {
      // User is logged in, allow access
      return true;
    } else {
      // User is not logged in, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
