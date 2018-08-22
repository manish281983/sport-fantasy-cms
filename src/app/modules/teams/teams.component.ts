import { Component, OnInit } from '@angular/core';
import {environment} from 'app/environment';
import {APISrvc} from '../../core/services/api.service';
import {MatTabChangeEvent} from '@angular/material';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {StorageSrvc} from 'app/core/services/storage.service';

@Component({
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
   teamArr= [];
   backupArr= [];

     selectedId=0;
     isDisabledBtn= true;

    constructor(private apiSrvc: APISrvc, private router: Router, private activatedRoute: ActivatedRoute,
    private storageSrvc: StorageSrvc) {
          this.getTeamList();
    }


    getTeamList(){
        this.apiSrvc.getData(environment.baseURL + '/team/all', {})
        .subscribe(
          data => {
            this.teamArr= data;
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
          if(this.teamArr[index].name==='' && this.teamArr[index].theme==='' && this.selectedId===-1){
              this.teamArr.splice(index,1);
          }else {
              this.teamArr[index]= JSON.parse(JSON.stringify(this.backupArr[index]));
          }
         this.selectedId=0;

      }

      deleteOperation(data,event, index){
         if(this.selectedId!==-1){
                  this.apiSrvc.getData(environment.baseURL + "/team/delete?id="+data.id, {})
            .subscribe(
              data => {
                  this.teamArr.splice(index,1);
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
               this.apiSrvc.getData(environment.baseURL + "/team/add?name="+data.name+"&theme="+data.theme+"&logo=''", {})
                .subscribe(
                  data => {
                      this.teamArr[index].id= data.id;
                     this.backupArr.splice(0, 0, data);
                   this.selectedId=0;
                  },
                  err => {
                   this.selectedId=0;
                      console.log(err);
                  });
          } else {
              this.apiSrvc.getData(environment.baseURL + "/team/edit?id="+data.id+"&name="+data.name+"&theme="+data.theme+"&logo=''", {})
                .subscribe(
                  data => {
                      this.teamArr[index].id= data.id;
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
              this.teamArr.splice(0, 0, {
                 id: -1,
                 name: '',
                 theme:'',
                 logo:''
             });
             this.selectedId=-1;
           }

      }

      goToTeamSquad(team){
        this.storageSrvc.setData('selectedTeam', team);
               this.router.navigate(['../players'], {relativeTo: this.activatedRoute});

      }

      getTeamTheme(theme){
        return '#'+theme;
      }
  }
