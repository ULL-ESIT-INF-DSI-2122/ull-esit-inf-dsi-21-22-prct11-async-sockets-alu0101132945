import {EventEmitter} from 'events';

export class ServerRequest extends EventEmitter {
    constructor(connection: EventEmitter) {
      super();
  
      let info = '';
      connection.on('data', (data) => {
        info += data;
  
        let messageLimit = info.indexOf('\n');
        while (messageLimit !== -1) {
          const message = info.substring(0, messageLimit);
          info = info.substring(messageLimit + 1);
          this.emit('message', JSON.parse(message));
          messageLimit = info.indexOf('\n');
        }
      });
    }
  }