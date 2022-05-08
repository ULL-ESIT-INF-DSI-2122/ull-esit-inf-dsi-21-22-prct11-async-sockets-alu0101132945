import { Color } from 'chalk';
import * as fs from 'fs'
import chalk from 'chalk'
const path = require('path')

type Color = 'red' | 'green' | 'blue' | 'yellow';

export class Note{
    /**
     * constructor de la clase Note, al ser una clase que trabaja con ficheros el constructor esta vacio
     */
    constructor(){}

    /**
     * este metodo crea una nota
     * @param title titulo de la nota
     * @param body mensaje
     * @param color color de la nota
     * @param autor creador de la nota
     */
    addNote(title:string,body:string,color:Color,autor:string):boolean{
        let pathToAdd = path.join('notes',autor)
        if(!fs.existsSync(pathToAdd))
            fs.mkdirSync(pathToAdd,{recursive:true})

        title = title + '.json'
        pathToAdd = path.join(pathToAdd, title)
        if(fs.existsSync(pathToAdd))
            return false;
            
        else{
            let inf = {
                title: title,
                body: body,
                color: color
            };
            let data = JSON.stringify(inf)
            fs.writeFileSync(pathToAdd,data)
            return true
        }
    }   

    /**
     * este metodo modifica una nota existente
     * @param body nuevo mensaje de la nota
     * @param color nuevo color
     * @param title titulo de la nota a modificar
     * @param autor autor de la nota
     */
    modifyNote(body:string,color:Color,title:string,autor:string):boolean{
        title = title + '.json'
        let pathToMod = path.join('notes',autor, title)
        if(!fs.existsSync(pathToMod))
            return false
        else{
            let inf = {
                body: body,
                color: color
            }
            let data = JSON.stringify(inf)
            fs.writeFileSync(pathToMod,data)
            return true
        }
    }

    /**
     * este metodo borra una nota
     * @param autor autor de la nota a borrar
     * @param title titulo de la nota que se quiere borrar
     */
    removeNote(autor:string,title:string):boolean{
        title = title + '.json'
        let pathToRm = path.join('notes',autor, title)
        fs.unlink(pathToRm,(err)=>{
            if(err) return false
        })
        return true
    }

    /**
     * este metodo lista todas los notas de un autor
     * @param autor autor de las notas
     */
    listNotes(autor:string){
        let pathToList = path.join('notes',autor)
        if(!fs.existsSync(pathToList))
            return false
        else{
            const notes = fs.readdirSync(pathToList,{withFileTypes:false})
            return notes
        }
    }

    /**
     * este metodo muestra una nota
     * @param autor autor de la nota a mostrar
     * @param title titulo de la nota a mostrar
     */
    showNote(autor:string, title:string){
        title = title + '.json'
        let pathToShow = path.join('notes',autor,title)
        if(!fs.existsSync(pathToShow)){
            return false
        }
        const note = fs.readFileSync(pathToShow).toString()
        return note
    }
}