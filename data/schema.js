import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from 'graphql';
import CustomGraphQLDateType from 'graphql-custom-datetype';
import {ObjectQueries} from '../js/Queries';

let Schema = ( conn ) => {

    let userType = new GraphQLObjectType({
        name: 'User',
        fields: () => ({
            id: { type: GraphQLString },
            email: { type: GraphQLString },
            status: { type: GraphQLInt },
            type: { type: GraphQLInt },
            name: { type: GraphQLString },
            surname: { type: GraphQLString },
            telephone: { type: GraphQLString },
            gender: { type: GraphQLString },
            dob: { type: GraphQLString }
        })
    });

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                users: {
                    type: new GraphQLList( userType ),
                    resolve: () => conn.query( ObjectQueries.LIST_USERS )
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
