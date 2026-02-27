import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./pages/login/login.component").then((m) => m.LoginComponent)
  },
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "dashboard",
        loadComponent: () =>
          import("./pages/dashboard/dashboard.component").then(
            (m) => m.DashboardComponent
          )
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];
