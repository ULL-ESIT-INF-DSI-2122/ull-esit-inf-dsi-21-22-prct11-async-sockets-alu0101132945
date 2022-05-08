import 'mocha';
import {expect} from 'chai';
import {Server} from '../src/server';

describe('class tests', () => {
    let server = new Server()
    
    it('server exists', () => {
        expect(server != undefined).to.be.true;
    });

    it('an object can be created of the Server class', () => {
        expect(server instanceof Server).to.be.true;
    });

})