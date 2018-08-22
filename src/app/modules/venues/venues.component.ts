import { Component, OnInit } from '@angular/core';
import {APISrvc} from '../../core/services/api.service';
import {environment} from 'app/environment';


@Component({
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {
 venueArr= [];
 backupArr= [];

   selectedId=0;
   isDisabledBtn= true;

  constructor(private apiSrvc: APISrvc) {
        this.getVenuesDetail();
  }


  getVenuesDetail(){
      this.apiSrvc.getData(environment.baseURL + '/venue/all', {})
      .subscribe(
        data => {
          this.venueArr= data;
          this.backupArr=JSON.parse(JSON.stringify(data))
        },
        err => {
            console.log(err);
        });
    }

  ngOnInit() {

  }

    editOperation(data){
        if(this.selectedId!==-1){
            this.selectedId=data.id;
        }
    }
    cancelOperation(event, index){
        event.stopPropagation();
        if(this.venueArr[index].city==='' && this.venueArr[index].ground==='' && this.selectedId===-1){
            this.venueArr.splice(index,1);
        }else {
            this.venueArr[index]= JSON.parse(JSON.stringify(this.backupArr[index]));
        }
       this.selectedId=0;

    }

    deleteOperation(data,event, index){
       if(this.selectedId!==-1){
                this.apiSrvc.getData(environment.baseURL + "/venue/delete?id="+data.id, {})
          .subscribe(
            data => {
                this.venueArr.splice(index,1);
               this.backupArr.splice(index,1);
               this.selectedId=0;
            },
            err => {
             this.selectedId=0;
                console.log(err);
            });
        }
    }

    saveOperation(data,event, index){
        if(this.selectedId===-1){
             this.apiSrvc.getData(environment.baseURL + "/venue/add?city="+data.city+"&ground="+data.ground, {})
              .subscribe(
                data => {
                    this.venueArr[index].id= data.id;
                   this.backupArr.splice(0, 0, data);
                 this.selectedId=0;
                },
                err => {
                 this.selectedId=0;
                    console.log(err);
                });
        } else {
            this.apiSrvc.getData(environment.baseURL + "/venue/edit?id="+data.id+"&city="+data.city+"&ground="+data.ground, {})
              .subscribe(
                data => {
                    this.venueArr[index].id= data.id;
                   this.backupArr[index]=JSON.parse(JSON.stringify(data))
                 this.selectedId=0;
                },
                err => {
                 this.selectedId=0;
                    console.log(err);
                });

        }
        event.stopPropagation();
    }

    addItem(){
        if(this.selectedId!==-1){
            this.venueArr.splice(0, 0, {
               id: -1,
               city: '',
               ground:''
           });
           this.selectedId=-1;
         }

    }
}
