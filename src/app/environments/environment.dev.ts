// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfiguration } from '../models/environment-configuration';

const serverUrl = 'http://localhost:5100/api';

// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: true,
  apiUrl: serverUrl,
  adb2cConfig: {
    clientId: '***************ur client id************',
    readScopeUrl:
      'https://SoumyaExamCertify.onmicrosoft.com/examcertify/dev/api/User.Read',
    writeScopeUrl:
      'https://SoumyaExamCertify.onmicrosoft.com/examcertify/dev/api/User.Write',
    scopeUrls: [
      'https://SoumyaExamCertify.onmicrosoft.com/examcertify/dev/api/User.Read',
      'https://SoumyaExamCertify.onmicrosoft.com/examcertify/dev/api/User.Write',
    ],
    apiEndpointUrl: serverUrl,
  },
  cacheTimeInMinutes: 30,
};
