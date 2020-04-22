import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
imagedetaillist : AngularFireList<any>;
  constructor(private firebase:AngularFireDatabase) { }
  getimagedetaillist(){
    this.imagedetaillist=this.firebase.list('imagedetails');
  }
  insertimagedetails(imagedetails){
    this.imagedetaillist.push(imagedetails);
  }
}
