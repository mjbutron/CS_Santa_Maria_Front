import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AgmCoreModule } from '@agm/core';

// Utils
import { Globals } from './common/globals';

// Routes
import { APP_ROUTING } from './app.routes';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { BrandsComponent } from './components/brands/brands.component';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ContactComponent } from './components/contact/contact.component';

// Services
import { DataApiService } from './services/data-api.service';
import { OpinionsComponent } from './components/opinions/opinions.component';
// Pipes
import { PhoneFormatPipe } from './pipes/phone-format.pipe';
// Date
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ServicesComponent,
    LoginComponent,
    FooterComponent,
    DashboardComponent,
    BrandsComponent,
    WorkshopComponent,
    AboutusComponent,
    CoursesComponent,
    ContactComponent,
    OpinionsComponent,
    PhoneFormatPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SlickCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    APP_ROUTING
  ],
  providers: [
    DataApiService,
    Globals,
    PhoneFormatPipe,
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
