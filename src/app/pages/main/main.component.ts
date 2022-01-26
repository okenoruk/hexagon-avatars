import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FileUploadService } from "../../services/file-upload.service";
import { TwitterApiService } from "../../services/twitter-api.service";

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
    private fileUploadSvc: FileUploadService,
    private twitter: TwitterApiService
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
      const canvasWidth = this.canvasElement.nativeElement.width;
      const canvasHeight = this.canvasElement.nativeElement.height;
      img.onload = () => {
        if (this.context) {
          this.context.globalCompositeOperation = '';
          this.context.clearRect(0, 0, canvasWidth, canvasHeight);
          this.context.beginPath();

          const hexa = new Image(canvasWidth, canvasHeight);
          hexa.src = '/assets/images/img.png';
          this.context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
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

  downloadImage() {
    const link = document.createElement('a');
    link.download = this.imageChangedEvent.target.files[0].name;
    link.href = this.canvasElement.nativeElement.toDataURL()
    link.click();
  }

  setAsProfileImage() {
    this.twitter.request().then((result) => {
      console.log(result);
    })
  }
}
