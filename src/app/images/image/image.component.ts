import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from "rxjs/operators";
import { ImageServiceService } from 'src/app/shared/image-service.service';

@Component({
  selector: 'upload',
  templateUrl: './image.component.html',
  styleUrls: []
})
export class ImageComponent implements OnInit {
  imgsrc: string;
  selectimageurl:any;
  issubmitted:boolean;
  formtemplate = new FormGroup({
    caption :new FormControl('',Validators.required),
    category :new FormControl(''),
    imageurl :new FormControl('',Validators.required),
  })
  constructor(private storage:AngularFireStorage,private service:ImageServiceService) { }

  ngOnInit(){
    this.resetform();
  }
  files: any = [];

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }  
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
showpreview(event:any){
if(event.target.files && event.target.files[0]){
  const reader=new FileReader();
  reader.onload=(e:any)=>this.imgsrc=e.target.result;
  reader.readAsDataURL(event.target.files[0]);
  this.selectimageurl=event.target.files[0];
}
else{
  this.imgsrc='assets/img/download.png';
  this.selectimageurl=null;
}
}
onsubmit(formValue){
this.issubmitted=true;
for(let i=0;i<this.files.length;i++){
this.deleteAttachment(i);
}
if(this.formtemplate.valid){
  var filepath=`${formValue.category}/${this.selectimageurl.name}_${new Date().getTime()}`
  const fileref=this.storage.ref(filepath);
  this.storage.upload(filepath,this.selectimageurl).snapshotChanges().pipe(
finalize(()=>{
fileref.getDownloadURL().subscribe((url)=>{
  formValue['imageurl']=url;
  this.service.insertimagedetails(formValue);
  this.service.insertimagedetails(this.files);
  this.resetform();
})
})
  ).subscribe();
}
}
get formControls(){
  return this.formtemplate['controls'];
}

resetform(){
  this.formtemplate.reset();
  this.formtemplate.setValue({
    caption:'',
    imageurl:'',
    category:'Animal'

  });
  this.imgsrc="assets/img/download.png";
  this.selectimageurl=null;
  this.issubmitted=false;
}


upload(): void {
  //get image upload file obj;
}
}
