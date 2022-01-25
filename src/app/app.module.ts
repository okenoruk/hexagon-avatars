import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { MainComponent } from "./pages/main/main.component";
import { RouterModule, Routes } from "@angular/router";
import { UploadImagesComponent } from "./components/upload-images/upload-images.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CustomMaterialModule } from "./components/custom-material.module";

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'index',
    component: MainComponent
  },
  // {
  //   path: 'preview',
  //   loadChildren: () => import ('./main/pages/preview/preview.module').then(m => m.PreviewModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ToolbarComponent,
    UploadImagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
