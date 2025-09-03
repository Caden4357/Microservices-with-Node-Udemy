import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';



declare global {
    var signin: () => Promise<string[]>;
}




let mongo: any;
// the following beforeAll, beforeEach, and afterAll are configuration hooks 
beforeAll(async () => { // this will run before all of our tests so do setup in here
    process.env.JWT_KEY = 'adfafdf';
    mongo = await MongoMemoryServer.create(); // create a in memory db 
    const mongoUri = mongo.getUri(); // get connect uri 

    await mongoose.connect(mongoUri, {});

})

beforeEach(async () => { // this configure hook will run before EACH of our tests
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections(); // get all the collections 

        for (let collection of collections) {
            await collection.deleteMany({}); // delete all collections
        }
    }
})

afterAll(async () => { // after all of our test are complete. shutdown mongo
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
})

// this is only global to our app in the test env
global.signin = async () => {
    const email = 'test@aol.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({ email, password })
        .expect(201)
    const cookie = response.get('Set-Cookie');
    if(!cookie){
        throw new Error('Cookie is not set')
    }
    return cookie;
}