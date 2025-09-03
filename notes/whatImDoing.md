# Testing w/ Microservices
- we refactor our index.ts file. Create a app.ts file in same directory. In app.ts your gonna have all your imports and configuration for the app from express you export it at the bottom and import it in index.ts all you do in index is start the db and start the app with .listen(port, callback)

- install following dependencies. Make sure to do so with dev flag
```
npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server
```
## What the above command installed in depth:
- first two are types for jest and supertest since were using typescript
- next we have jest and supertest themselves ts-jest again is for typescript specifically 
- mongodb-memory-server (quite large btw) is a copy of mongodb that runs in memory this is useful for testing multiple different microservices at once each one will run inside its service 
- we do this as dev dependencies because they are not to be seen by docker and not for production 
# In your docker file add this 
```
RUN npm install --omit=dev
``` 
- -omit=dev is new to ignore dev dependencies
---
# Package.json
```
    "scripts": {
        "start": "ts-node-dev src/index.ts",
        "test": "jest --watchall --no-cache" <-- this is new. Startup jest and run all the test files in our project whenever changes are detected -- no-cache is for ts specifically
    },
```
- under scripts add 
```
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "setupFilesAfterEnv": [
      "./src/test/setup.ts"
    ]
  },
```
- the above is configuration for jest ts does not know jest so we add all this and start the setup file
# Setup setup file 
- your gonna have your before all before each and after all hooks that you can use to do your setup for your tests ex.
```
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;

// the following beforeAll, beforeEach, and afterAll are configuration hooks 

beforeAll(async () => { // this will run before all of our tests so do setup in here
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
```

- when setting up a testing file follow the convention ```__test__``` for folder name folder should be at same level of file your wanting to test then inside the folder create a file ```name-of-test-file.test.ts```
