const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const db = require('../../models');


const { FoodMapLocation } = db

const FoodMapLocationType = new GraphQLObjectType({
  name: 'food_map_location_type',
  description: 'this represents a food map location',
  fields: () => {
    return {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      address: { type: GraphQLString },
      rating: { type: GraphQLString },
    };
  },
});

const FoodMapLocationsSchema = {     
  type: new GraphQLList(FoodMapLocationType),
  args: {},
  async resolve(root, args) {
    const locations = await FoodMapLocation.findAll();
    if (locations) {
      return locations;
    }
  }
}

const FoodMapLocationMutationSchema = {
  type: FoodMapLocationType,
  args: {
    //This is your input variables
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    rating: { type: GraphQLString },
  },
  async resolve(root, args) {
    const newFoodMapLocation = await FoodMapLocation.create({
      title: args.title,
      description: args.description,
      address: args.address,
      rating: args.rating,
    });
    return newFoodMapLocation;
  },
}


module.exports = {FoodMapLocationsSchema,FoodMapLocationMutationSchema}