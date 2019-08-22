import { Component, OnInit } from '@angular/core';
import { Meet } from '../models/meet.interface';
import { MeetingService } from '../services/meeting.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular' ;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {

  meet: Meet ={
    name: '',
    section: '',
    date: 0,
    time: 0,
    duration: 0,
  }

  meetId = null;

  constructor(
    private route: ActivatedRoute,
    private meetService: MeetingService,
    private nav: NavController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.meetId = this.route.snapshot.params['id'];
    if (this.meetId) {
      this.loadMeet();
    }
  }
    async loadMeet() {
      const loading = await this.loadingController.create({
        message: 'loading.....'
      });
      await loading.present();
      this.meetService.getMeet(this.meetId).subscribe(res => {
        loading.dismiss();
        this.meet = res;
      });
    }

    async saveMeet() {
      const loading = await this.loadingController.create({
        message: 'Saving.....'
      });
      await loading.present();

      if (this.meetId) {
        //update
        this.meetService.updateMeet(this.meet, this.meetId).then(() => {
          loading.dismiss();
          this.nav.navigateForward('/');
        });
      } else {
        //Add new
        this.meetService.addMeet(this.meet).then(() => {
          loading.dismiss();
          this.nav.navigateForward('/');
        });
      }
    }
    onRemove(idMeet: string) {
      this.meetService.removeMeet(idMeet);
    }
  }