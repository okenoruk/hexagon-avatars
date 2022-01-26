import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FileUploadService } from "../../services/file-upload.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  title = 'profilepicture';
  imageChangedEvent: any;
  croppedImage = '';
  context: CanvasRenderingContext2D | null | undefined;

  constructor(
    private fileUploadSvc: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.context = this.canvasElement.nativeElement.getContext('2d');
    }, 100);
  }

  async fileUploaded(ev: any) {
    this.imageChangedEvent = ev;
    this.imageCropped(await this.fileUploadSvc.convertBlobToBase64(this.imageChangedEvent.target.files[0]));
  }

  imageCropped(image: string) {
    if (this.croppedImage !== image) {
      this.croppedImage = image;
      const img = new Image();
      img.onload = () => {
        if (this.context) {
          this.context.globalCompositeOperation = '';
          this.context.clearRect(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height);
          this.context.beginPath();

          const hexa = new Image(300, 300);
          hexa.src = '/assets/images/img.png';
          this.context.drawImage(img, 0, 0, 300, 300);
          setTimeout(() => {
            if (this.context) {
              this.context.globalCompositeOperation = "destination-atop";
              this.context.drawImage(hexa,0,0,hexa.width,hexa.height);
            }
          }, 50);
        }
      };
      img.src = this.croppedImage;
    }
  }
}
