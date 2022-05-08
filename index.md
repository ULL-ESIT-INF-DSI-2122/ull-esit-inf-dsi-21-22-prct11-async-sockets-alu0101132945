# Practica 11 - Cliente y servidor para una aplicación de procesamiento de notas de texto

En esta práctica tendrá que partir de la implementación de la aplicación de procesamiento de notas de texto que llevó a cabo en la Práctica 9 para escribir un servidor y un cliente haciendo uso de los sockets proporcionados por el módulo net de Node.js.

Las operaciones que podrá solicitar el cliente al servidor deberán ser las mismas que ya implementó durante la Práctica 9, esto es, añadir, modificar, eliminar, listar y leer notas de un usuario concreto. Un usuario interactuará con el cliente de la aplicación, exclusivamente, a través de la línea de comandos. Al mismo tiempo, en el servidor, las notas se almacenarán como ficheros JSON en el sistema de ficheros y siguiendo la misma estructura de directorios utilizada durante la Práctica 9.

En esta practica se divide la logica del programa entre el servidor(que tendra la logica de la gestion de ficheros) y el cliente(que tendra la logica del paso de parametros por la linea de comandos):

## El servidor

El servidor se encarga de llamar a la clase ``Note`` y trabajar con las notas y hacerlas persistentes(guardandolas en ficheros _.json_ en una carpeta). El servidor recibira el comando del cliente y ejecutara ese comando de la clase y le devolvera el resultado de la operación al cliente:

```Typescript
type Response = {
    success: boolean,
    nota?:Note[]
}

class Server{
    notes: Note = new Note()
    constructor() {
        net.createServer({allowHalfOpen:true},(connection) =>{
            console.log(chalk.green('A client has connected'))
            const serEv = new ServerRequest(connection)

            serEv.on('request', (req) => {
                switch(req.type){
                    case 'add':
                        let ad:boolean =this.notes.addNote(req.tittle,req.body,req.color,req.autor)
                        let respa:Response = {
                            success: ad
                        }
                        connection.write(JSON.stringify(respa))
                    break;
                    case 'mod':
                        let mo:boolean = this.notes.modifyNote(req.title,req.body,req.color,req.autor)
                        let respm:Response = {
                            success: mo
                        }
                        connection.write(JSON.stringify(respm))
                    break;
                    case 'del':
                        let de:boolean = this.notes.removeNote(req.autor,req.title)
                        let respd:Response = {
                            success: de
                        }
                        connection.write(JSON.stringify(respd))
                    break
                    case 'list':
                        let li = this.notes.showNote(req.autor,req.title)
                        if(typeof(li) == 'boolean'){
                           let respl:Response = {
                               success:li
                           }
                           connection.write(JSON.stringify(respl))
                        }
                        else connection.write(JSON.parse(li))
                    break
                    case 'show':
                        let sh = this.notes.showNote(req.autor,req.title)
                        if(typeof(sh) == 'boolean'){
                           let resps:Response = {
                               success:sh
                           }
                           connection.write(JSON.stringify(resps))
                        }
                        else connection.write(JSON.parse(sh))
                    break 
                }

            })
            connection.on('close', () => {
                console.log('A client has disconnected');
            });
            connection.end()
        }).listen(60300, () => {
            console.log('Waiting for clients to connect');
        });
    }
}
```

## El cliente

El cliente estara encargado de usar la linea de comandos para pasarle los argumentos y el tipo de comando que se usara, y se lo pasa al servidor para que este ejecute los metodos de la clase ``Note`` y luego le devuelve el resultado de la accion:

```Typescript
type Request = {
    type: 'add' | 'mod' | 'del' | 'read' | 'list';
    user: string;
    title?: string;
    body?: string;
    color?: string;
}

class Client{
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
```