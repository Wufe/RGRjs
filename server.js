import fs from 'fs';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import {MongoClient} from 'mongodb';

let app = express();

app.use( express.static( 'public' ) );

console.log( "Connecting .. " );

( async () => {

    let db = await MongoClient.connect( "mongodb://192.168.99.100:27017/test" );
    console.log( "Connected to mongo-db." );
    let schema = Schema( db );

    app.use( '/graphql', GraphQLHTTP({
        schema,
        graphiql: true
    }));

    app.listen( 8080, () => console.log( 'Listening on port 8080' ) );

    let json = await graphql( schema, introspectionQuery );
    fs.writeFile( './data/schema.json', JSON.stringify( json, null, 4 ), err => {
        if( err ) throw err;
        console.log( "JSON schema created" );
    })

})();
