import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'profilepicture';
  imageChangedEvent: any;
  croppedImage = '';

  constructor() { }

  ngOnInit(): void {
  }

  fileUploaded(ev: any) {
    this.imageChangedEvent = ev;
  }

  imageCropped(image: string) {
    console.log(image);
    this.croppedImage = image;
  }
}
