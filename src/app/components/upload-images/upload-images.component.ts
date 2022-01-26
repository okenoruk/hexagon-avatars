import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  @Output() callbackChange = new EventEmitter<any>();

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: any;

  constructor(private uploadService: FileUploadService) {}

  async ngOnInit() {
    this.imageInfos = await this.uploadService.getFiles();
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles?.length > 0) {
      this.message = [];
      this.progressInfos = [];
      this.selectedFileNames = [];
      this.previews = [];
      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;
        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.progressInfos[i].value = Math.round(
              (100 * e.loaded) / e.total
            );
            this.previews.push(e.target.result);
          };

          reader.readAsDataURL(this.selectedFiles[i]);

          this.selectedFileNames.push(this.selectedFiles[i].name);
          this.progressInfos[i] = { value: 0, fileName: this.selectedFiles[i].name };
        }
      }

      this.callbackChange.emit(event);
    }
  }
}
