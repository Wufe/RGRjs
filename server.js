import express from 'express';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

import {MongoClient} from 'mongodb';

let app = express();

app.use( express.static( 'public' ) );



let db;
MongoClient.connect( "mongodb://192.168.99.100:27017/test", ( err, database ) => {
        if( err ) throw err;
        db = database;

        app.use( '/graphql', GraphQLHTTP({
            schema: schema( db ),
            graphiql: true
        }));

        app.listen( 8080, () => console.log( 'Listening on port 8080' ) );
});

// app.get( '/data/links', ( req, res ) => {
//     db.collection( "links" ).find({}).toArray( ( err, links ) => {
//         if( err ) throw err;
//         res.json( links );
//     });
// });
