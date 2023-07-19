import { ApplicationConfig, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'GBP' },
  ],
};
