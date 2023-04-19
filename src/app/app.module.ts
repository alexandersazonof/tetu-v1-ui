import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppTranslateModule, DeviceIfDirectiveModule, UiModule } from '@tetu_io/tetu-ui';
import { enUS } from 'date-fns/locale';
import { en_US, NZ_DATE_LOCALE, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { SharedModule } from "@shared/shared.module";
import { CustomIconsProviderModule } from "@helpers/icons/icons-provider.module";

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableFileDetails: true,
      timestampFormat: 'hh:mm:ss',
    }),
    CustomIconsProviderModule,
    NzModalModule,
    UiModule,
    NzNotificationModule,
    DeviceIfDirectiveModule,
    SharedModule,
    AppTranslateModule
  ],
  providers: [
    {
      provide: NZ_DATE_LOCALE,
      useValue: enUS,
    },
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    {
      provide: LOCALE_ID,
      useValue: 'en',
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
