import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { WorkshopComponent } from './components/workshop/workshop.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { LegalComponent } from './components/legal/legal.component';
import { ServicedetailsComponent } from './components/servicedetails/servicedetails.component';
import { AuthGuard } from './guards/auth.guard';

const APP_ROUTES: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'servicios', component: ServicesComponent },
  { path: 'talleres', component: WorkshopComponent },
  { path: 'nosotras', component: AboutusComponent },
  { path: 'cursos', component: CoursesComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'politica_privacidad', component: PrivacypolicyComponent },
  { path: 'aviso_legal', component: LegalComponent },
  { path: 'servicio/:id', component: ServicedetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // TODO only users auth
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {scrollPositionRestoration: 'top'});
