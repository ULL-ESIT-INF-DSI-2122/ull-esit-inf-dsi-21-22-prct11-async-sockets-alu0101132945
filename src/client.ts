import * as net from 'net'
import * as yargs from 'yargs';

type Request = {
    type: 'add' | 'mod' | 'del' | 'read' | 'list';
    user: string;
    title?: string;
    body?: string;
    color?: string;
}

export class Client{
    client
    constructor(){
       this.client = net.connect({port: 60300});
    }

    addC(user:string,title:string,body:string,color:string){
        const request: Request = {
            type: 'add',
            user: user,
            title: title,
            body: body,
            color: color,
          };
          // pasa los datos al servidor
          this.client.write(JSON.stringify(request) + '\n');
    }

    modC(user:string,title:string,body:string,color:string){
        const request: Request = {
            type: 'mod',
            user: user,
            title: title,
            body: body,
            color: color,
          };
          // pasa los datos al servidor
          this.client.write(JSON.stringify(request) + '\n');
    }

    listC(user:string){
        const request: Request = {
            type: 'list',
            user: user,
          };
          this.client.write(JSON.stringify(request) + '\n');
    }

    readC(user:string,title:string){
        const request: Request = {
            type: 'read',
            user: user,
            title: title,
          };
          this.client.write(JSON.stringify(request) + '\n');
    }

    removeC(user:string, title:string){
        const request: Request = {
            type: 'del',
            user: user,
            title: title,
          };
          this.client.write(JSON.stringify(request) + '\n');
    }


}
let client = new Client()
yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder: {
      user: {
        describe: 'User:',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Note title:',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'Note body:',
        demandOption: true,
        type: 'string',
      },
      color: {
        describe: 'Note colour:',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
        client.addC(argv.user,argv.title,argv.body,argv.color)
      }
    },
  });

  yargs.command({
    command: 'mod',
    describe: 'Modify an existing note.',
    builder: {
      user: {
        describe: 'User:',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Note title:',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'Note body:',
        demandOption: true,
        type: 'string',
      },
      color: {
        describe: 'Note colour:',
        demandOption: false,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
        client.addC(argv.user,argv.title,argv.body,argv.color)
      }
    },
  });

  yargs.command({
    command: 'list',
    describe: 'List notes from user',
    builder: {
      user: {
        describe: 'User:',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.user === 'string') {
        client.listC(argv.user)
      }
    },
  });
  
  yargs.command({
    command: 'read',
    describe: 'Read note',
    builder: {
      user: {
        describe: 'User:',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Note title:',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.title === 'string' && typeof argv.user === 'string') {
        client.readC(argv.title, argv.user)
      }
    },
  });
  
  yargs.command({
    command: 'remove',
    describe: 'Delete note.',
    builder: {
      user: {
        describe: 'User:',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Note title:',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.user === 'string' && typeof argv.title === 'string') {
       
      }
    },
  });
  
  yargs.parse();