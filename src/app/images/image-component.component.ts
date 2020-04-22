import { Component, OnInit } from '@angular/core';
import { ImageServiceService } from '../shared/image-service.service';

@Component({
  selector: 'image',
  templateUrl: './image-component.component.html',
  styleUrls: []
})
export class ImagesComponent implements OnInit {


  constructor(private service:ImageServiceService) { }

  ngOnInit(){
    this.service.getimagedetaillist();
  }

}
