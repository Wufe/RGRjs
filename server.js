import express from 'express';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

import {MongoClient} from 'mongodb';

import mysql from 'promise-mysql';

let app = express();
app.use( express.static( 'public' ) );

var fs = require( 'fs' );
let configPath = './env.json';
var settings = JSON.parse( fs.readFileSync( configPath, "UTF-8" ) );




( async () => {

    try{
        console.log( "Connecting to mysql.." );
        let connection = await mysql.createConnection({
            host: settings.mysql.host,
            port: settings.mysql.port,
            user: settings.mysql.user,
            password: settings.mysql.pass,
            database: settings.mysql.database
        });

        app.use( '/graphql', GraphQLHTTP({
            schema: schema( connection ),
            graphiql: true
        }));

        app.listen( settings.express.port, () => console.log( "Listening on port " + settings.express.port ));

    }catch( conn_err ){
        console.log( "Cannot connect: ", conn_err );
    }


})();


// let db;
// MongoClient.connect( "mongodb://192.168.99.100:27017/test", ( err, database ) => {
//         if( err ) throw err;
//         db = database;
//
//         app.use( '/graphql', GraphQLHTTP({
//             schema: schema( db ),
//             graphiql: true
//         }));
//
//         app.listen( 8080, () => console.log( 'Listening on port 8080' ) );
// });

// app.get( '/data/links', ( req, res ) => {
//     db.collection( "links" ).find({}).toArray( ( err, links ) => {
//         if( err ) throw err;
//         res.json( links );
//     });
// });
