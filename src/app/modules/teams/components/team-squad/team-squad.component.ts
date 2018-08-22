import {Component, Input, OnInit} from '@angular/core';
import {StorageSrvc} from 'app/core/services/storage.service';
import {APISrvc} from '../../../../core/services/api.service';
import {environment} from 'app/environment';

@Component({
    selector: 'team-squad',
    templateUrl: './team-squad.template.html',
    styleUrls: ['./team-squad.scss']
})
export class TeamSquad {
     teamInfo:any;

    playerArr= [];
    backupArr= [];

   selectedId=0;
   isDisabledBtn= true;

  constructor(private apiSrvc: APISrvc, private storageSrvc: StorageSrvc) {
        this.getPlayerList();
         this.teamInfo= this.storageSrvc.getData('selectedTeam');
  }


  getPlayerList(){
      this.apiSrvc.getData(environment.baseURL + '/player/all', {})
      .subscribe(
        data => {
          this.playerArr= data;
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
        if(this.playerArr[index].name==='' && this.playerArr[index].specialist==='' && this.playerArr[index].role==='' && this.selectedId===-1){
            this.playerArr.splice(index,1);
        }else {
            this.playerArr[index]= JSON.parse(JSON.stringify(this.backupArr[index]));
        }
       this.selectedId=0;

    }



    deleteOperation(data,event, index){
       if(this.selectedId!==-1){
                this.apiSrvc.getData(environment.baseURL + "/player/delete?id="+data.id, {})
          .subscribe(
            data => {
                this.playerArr.splice(index,1);
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
            let url= environment.baseURL + "/player/add?name="+data.name+"&specialist="+data.specialist+"&role="+data.role+"&teamId="+this.teamInfo.id;
            alert(url);
             this.apiSrvc.getData(url, {})
              .subscribe(
                data => {
                    this.playerArr[index].id= data.id;
                   this.backupArr.splice(0, 0, data);
                 this.selectedId=0;
                },
                err => {
                 this.selectedId=0;
                    console.log(err);
                });
        } else {
            this.apiSrvc.getData(environment.baseURL + "/player/edit?id="+data.id+"&name="+data.name+"&specialist="+data.specialist+"&role="+data.role+"&teamId="+this.teamInfo.id, {})
              .subscribe(
                data => {
                    this.playerArr[index].id= data.id;
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
            this.playerArr.splice(0, 0, {
               id: -1,
               city: '',
               ground:''
           });
           this.selectedId=-1;
         }

    }
}
