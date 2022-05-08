import 'mocha';
import {expect} from 'chai';
import {Client} from '../src/client';

describe('class tests', () => {
    let client = new Client()
    
    it('Client exists', () => {
        expect(client != undefined).to.be.true;
    });

    it('an object can be created of the Client class', () => {
        expect(client instanceof Client).to.be.true;
    });

})