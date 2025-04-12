import { Routes } from '@angular/router';
import { PickingViewComponent } from './overview/edit-task/picking-view/picking-view.component';
import { PackingViewComponent } from './overview/edit-task/packing-view/packing-view.component';
import { PickupViewComponent } from './overview/edit-task/pickup-view/pickup-view.component';
import {OverviewPageComponent} from './overview/overview-page/overview-page.component';

export const routes: Routes = [
  { path: '', component: OverviewPageComponent },
  { path: 'edit/picking/:id', component: PickingViewComponent },
  { path: 'edit/packing/:id', component: PackingViewComponent },
  { path: 'edit/pickup/:id', component: PickupViewComponent },
  { path: '**', redirectTo: '' }
  // Weitere Routen hier hinzufügen
];
