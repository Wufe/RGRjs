import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID
} from 'graphql';
import CustomGraphQLDateType from 'graphql-custom-datetype';
import {ObjectQueries} from '../js/Queries';
import User from './models/user';

let resolveUsers = ( id ) => {
    console.log( id );
    //conn.query( ObjectQueries.LIST_USERS );
};

let Schema = ( conn ) => {

    let userType = new GraphQLObjectType({
        name: 'User',
        fields: () => ( User.properties )
    });

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                users: {
                    type: new GraphQLList( userType ),
                    args: {
                        id: {
                            type: GraphQLID
                        },
                        name: {
                            type: GraphQLString
                        }
                    },
                    resolve: ( _, args ) => User.resolve( args )
                }
            })
        })
    });

    return schema;
}

export default Schema;
//
// let Schema = ( db ) => {
//
//     let linkType = new GraphQLObjectType({
//         name: 'Link',
//         fields: () => ({
//             _id: { type: GraphQLString },
//             title: { type: GraphQLString },
//             url: { type: GraphQLString },
//         })
//     });
//
//     let schema = new GraphQLSchema({
//         query: new GraphQLObjectType({
//             name: 'Query',
//             fields: () => ({
//                 links: {
//                     type: new GraphQLList( linkType ),
//                     resolve: () => db.collection( "links" ).find({}).toArray()
//                 }
//             })
//         })
//     });
//
//     return schema;
// };
//
// export default Schema;
