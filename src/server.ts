import {Note} from './note'
import {ServerRequest} from './ServerRequest'
import * as net from 'net'
import chalk from 'chalk'

type Response = {
    success: boolean,
    nota?:Note[]
  }
  

export class Server{
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