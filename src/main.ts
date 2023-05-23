import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { nameValidation } from './app/form/form.component';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

const app = document.querySelector('app-root')


if(app) {
  // nameValidation()
}

