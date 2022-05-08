import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note'; 

describe('class tests', () => {
    let notas = new Note()
    notas.addNote("adios", "Nota para decir adios", "yellow", "Carlos")
    
    it('Note is created', () => {
        expect(notas).to.not.equal(null);
    });

    it('AddNote is used', () => {
        expect(notas.addNote("hola" , "Nota para decir hola", "green", "Carlos")).to.be.equal(undefined);
    });
    
    it('ModifyNote is used', () => {
        expect(notas.modifyNote("esta nota es para decir adios","blue", "adios", "Carlos")).to.be.equal(undefined);
    });

    it('ListNotes is used', () => {
        expect(notas.listNotes("Carlos")).to.not.equal(null);
    });

    it('ShowNote is used', () => {
        expect(notas.showNote("Carlos","hola")).to.not.equal(null);
    });

    it('RemoveNote is used', () => {
        expect(notas.removeNote("Carlos","adios")).to.be.equal(undefined);
    });

})