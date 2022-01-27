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
import { ImageCropperModule } from "ngx-image-cropper";
import { ImageCropperComponent } from "./components/image-cropper/image-cropper.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { FooterComponent } from "./components/footer/footer.component";

const routes: Routes = [
  {
    path: 'index',
    component: MainComponent
  },
  // {
  //   path: 'preview',
  //   loadChildren: () => import ('./main/pages/preview/preview.module').then(m => m.PreviewModule)
  // },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ToolbarComponent,
    UploadImagesComponent,
    ImageCropperComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule,
    ImageCropperModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
