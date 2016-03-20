import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID
} from 'graphql';

class Model{

    static resolve( args ){
        console.log( this.name );
    }

};

export default Model;
