import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Ably from 'ably';
import {
  logApproved,
  logRejected,
  messageRecieved,
  noticeAdded,
  paymentRequested,
} from '../../+state/shared.actions';
import { IRealTimeService } from '../../domain/abstractions/irealtime.service';
import { IMessage } from '../../domain/abstractions/imessage';
import { IPayment } from '../../domain/abstractions/ipayment';
import { StorageService } from '../storage/storage.service';
import { INotice } from '../../domain/abstractions/inotice';
import { ILog } from '../../domain/abstractions/ilog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AblyEvents implements IRealTimeService {
  options: Ably.Types.ClientOptions = {
    key: 'm2BStQ.WYEoaw:WRC5iiG2PcIyhJW1fXTV-jGVlsINETMflLHfuOGexGk',
    closeOnUnload: true,
  };
  client?: Ably.Realtime;

  constructor(private _store: Store, private _storageService: StorageService) { }
  listen() {
    const homeOwnerId = this._storageService.getUserId();
    const societyId = this._storageService.getSocietyId();
    if (this.client === undefined && homeOwnerId && societyId && environment.production) {
      this.client = new Ably.Realtime(this.options);
      let homeOwnerChannel = this.client.channels.get(homeOwnerId);
      let societyChannel = this.client.channels.get(societyId);
      this.client.connection.on('disconnected', () => {
        debugger;
      })
      this.client.connection.on('connected', () => {
        debugger
        homeOwnerChannel.subscribe('ADD_MESSAGE', (m) => {
          const message: IMessage = m.data
          if (message.sentById !== homeOwnerId) {
            new Audio('https://i.cloudup.com/E021I9zUG3.m4a').play()
            this._store.dispatch(messageRecieved({ message }))
          }
        })
        homeOwnerChannel.subscribe('REQUEST_PAYMENT', (m) => {
          const payment: IPayment = m.data
          new Audio('https://i.cloudup.com/E021I9zUG3.m4a').play()
          this._store.dispatch(paymentRequested({ payment }))
        })
        homeOwnerChannel.subscribe('LOG_ACTION', (message) => {
          const log: ILog = message.data
          if (log) {
            if (log.status === 'APPROVED') {
              this._store.dispatch(logApproved())
            } else {
              this._store.dispatch(logRejected())
            }
          }
        })
        societyChannel.subscribe('REQUEST_PAYMENT', (m) => {
          const payment: IPayment = m.data
          payment.status = 'PENDING'
          new Audio('https://i.cloudup.com/E021I9zUG3.m4a').play()
          this._store.dispatch(paymentRequested({ payment }))
        })
        societyChannel.subscribe('ADD_NOTICE', (m) => {
          const notice: INotice = m.data
          new Audio('https://i.cloudup.com/E021I9zUG3.m4a').play()
          this._store.dispatch(noticeAdded({ notice }))
        })
      });
    }
  }

  listenToHO(homeOwnerId: string) {
    if (this.client === undefined && homeOwnerId && environment.production) {
      this.client = new Ably.Realtime(this.options);
      let homeOwnerChannel = this.client.channels.get(homeOwnerId);
      this.client.connection.on('disconnected', () => {
        debugger;
      })
      this.client.connection.on('connected', () => {
        homeOwnerChannel.subscribe('LOG_ACTION', (message) => {
          homeOwnerChannel.unsubscribe();
          const log: ILog = message.data
          if (log) {
            if (log.status === 'APPROVED') {
              this._store.dispatch(logApproved())
            } else {
              this._store.dispatch(logRejected())
            }
          }
        })
      });
    }
  }

  close() {
    if (this.client) {
      this.client.close();
    }
  }
}
