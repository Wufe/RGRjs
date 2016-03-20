import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import {
    connectionDefinitions,
    connectionArgs, // agrs
    connectionFromPromisedArray
} from 'graphql-relay';

let Schema = ( db ) => {

    let store = {};

    let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            linkConnection: {
                type: linkConnection.connectionType,
                args: connectionArgs,
                resolve: ( _, args ) => connectionFromPromisedArray(
                    db.collection( "links" ).find({}).toArray(),
                    args
                )
            }
        })
    });

    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            //_id: { type: GraphQLString },
            id: {
                type: new GraphQLNonNull( GraphQLID ),
                resolve: ( obj ) => obj._id
            },
            title: { type: GraphQLString },
            url: { type: GraphQLString },
        })
    });

    let linkConnection = connectionDefinitions({
        name: 'Link',
        nodeType: linkType
    });

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                store: {
                    type: storeType,
                    resolve: () => store
                }
            })
        })
    });



    return schema;
};

export default Schema;
