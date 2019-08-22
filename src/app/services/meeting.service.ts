import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meet } from '../models/meet.interface';
@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private meetingscollection: AngularFirestoreCollection<Meet>;
  private meets: Observable<Meet[]>;

  constructor( db: AngularFirestore) {
    this.meetingscollection = db.collection<Meet>('meets');
    this.meets = this.meetingscollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
   }
   getMeets() {
     return this.meets;
   }

   getMeet( id: string) {
     return this.meetingscollection.doc<Meet>(id).valueChanges();
   }

   updateMeet( meets: Meet, id: string) {
     return this.meetingscollection.doc(id).update(meets);
   }

   addMeet(meets:Meet) {
     return this.meetingscollection.add(meets);
   }

   removeMeet(id: string) {
     return this.meetingscollection.doc(id).delete();
   }
}

