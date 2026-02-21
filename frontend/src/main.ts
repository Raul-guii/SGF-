import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/auths/interceptors/auth.interceptor';
import { appRouterProviders } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    appRouterProviders,
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimations()
  ]
})
  .catch(err => console.error(err));

