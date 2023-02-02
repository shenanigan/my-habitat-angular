import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Ably from 'ably';
import {
  messageRecieved,
  noticeAdded,
  paymentRequested,
} from '../../+state/shared.actions';
import { IRealTimeService } from '../../domain/abstractions/irealtime.service';
import { IMessage } from '../../domain/abstractions/imessage';
import { IPayment } from '../../domain/abstractions/ipayment';
import { StorageService } from '../storage/storage.service';
import { INotice } from '../../domain/abstractions/inotice';

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
    if (this.client === undefined && homeOwnerId && societyId) {
      this.client = new Ably.Realtime(this.options);
      let homeOwnerChannel = this.client.channels.get(homeOwnerId);
      let societyChannel = this.client.channels.get(societyId);
      this.client.connection.on('disconnected', () => {
        debugger;
      })
      this.client.connection.on('connected', () => {
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

  close() {
    if (this.client) {
      this.client.close();
    }
  }
}
