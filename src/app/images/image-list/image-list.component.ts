import { Component, OnInit } from '@angular/core';
import { ImageServiceService } from 'src/app/shared/image-service.service';

@Component({
  selector: 'list',
  templateUrl: './image-list.component.html',
  styleUrls: []
})
export class ImageListComponent implements OnInit {
imagelist:any[];
rowindexarray:any[];
  constructor(private service:ImageServiceService) { }

  ngOnInit(){
    this.service.imagedetaillist.snapshotChanges().subscribe(
      list=>{
        this.imagelist=list.map(item=>{return item.payload.val();});
        this.rowindexarray=Array.from(Array(Math.ceil((this.imagelist.length+1)/3)).keys());
      }
    );
  }

}
