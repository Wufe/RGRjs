import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID
} from 'graphql';
import Model from '../model';

class User extends Model{

    static table = "users";

    static properties = {
        id:             { type: GraphQLInt },
        email:          { type: GraphQLString },
        status:         { type: GraphQLInt, default: 1 },
        type:           { type: GraphQLInt, default: 1 },
        name:           { type: GraphQLString },
        surname:        { type: GraphQLString },
        telephone:      { type: GraphQLString },
        gender:         { type: GraphQLString },
        dob:            { type: GraphQLString },
        city:           { type: GraphQLString },
        province:       { type: GraphQLString },
        address:        { type: GraphQLString },
        postal_code:    { type: GraphQLString },
        tax_code:       { type: GraphQLString },
        uuid:           { type: GraphQLString },
        registered_at:  { type: GraphQLString },
        updated_at:     { type: GraphQLString }
    };

}

export default User;
