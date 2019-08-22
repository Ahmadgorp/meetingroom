import { Component , OnInit} from '@angular/core';
import { Meet } from '../models/meet.interface';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  meets: Meet[];

  constructor( 
    private meetingService: MeetingService
    ) {}

  ngOnInit() {
    this.meetingService.getMeets().subscribe(res => this.meets = res);
  }
}
