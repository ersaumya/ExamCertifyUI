import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  BrowserCacheLocation,
  IPublicClientApplication,
  PublicClientApplication,
  LogLevel,
  InteractionType,
} from '@azure/msal-browser';
import { environment } from './environments/environment.dev';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_examcertify',
    resetPassword: 'B2C_1_examcertify_password_reset',
    editProfile: 'B2C_1_examcertify_profile_edit',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://SoumyaExamCertify.b2clogin.com/SoumyaExamCertify.onmicrosoft.com/B2C_1_examcertify',
    },
    resetPassword: {
      authority:
        'https://SoumyaExamCertify.b2clogin.com/SoumyaExamCertify.onmicrosoft.com/B2C_1_examcertify_password_reset',
    },
    editProfile: {
      authority:
        'https://SoumyaExamCertify.b2clogin.com/SoumyaExamCertify.onmicrosoft.com/B2C_1_examcertify_profile_edit',
    },
  },
  authorityDomain: 'SoumyaExamCertify.b2clogin.com',
};

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.adb2cConfig.clientId,
      authority: b2cPolicies.authorities.signUpSignIn.authority, //environment.msalConfig.auth.authority,
      knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    // system: {
    //   allowNativeBroker: false, // Disables WAM Broker
    //   loggerOptions: {
    //     loggerCallback,
    //     logLevel: LogLevel.Info,
    //     piiLoggingEnabled: false,
    //   },
    // },
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    loginFailedRoute: '/login-failed',
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    MsalBroadcastService,
  ],
};
