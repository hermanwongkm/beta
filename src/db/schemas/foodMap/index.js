const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');
const db = require('../../models');

const { FoodMapLocation } = db

const FoodMapLocationType = new GraphQLObjectType({
  name: 'food_map_location_type',
  description: 'this represents a food map location',
  fields: () => {
    return {
      id: { type: GraphQLInt },
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

const AddFoodMapLocationsSchema = {
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

const UpdateFoodMapLocationSchema = {
  type: FoodMapLocationType,
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    rating: { type: GraphQLString },
  },
  async resolve(root, args) {
    const foodMapLocation = await FoodMapLocation.findOne({
      where: {
        id: args.id,
      },
    });
    if(!foodMapLocation){
      throw new Error('Food Map Location not found');
    }

    foodMapLocation.update({
      title: args.title,
      description: args.description,
      address: args.address,
      rating: args.rating,
    });
    return foodMapLocation;
  }
}

module.exports = {
  FoodMapLocationsSchema,
  AddFoodMapLocationsSchema,
  UpdateFoodMapLocationSchema
}