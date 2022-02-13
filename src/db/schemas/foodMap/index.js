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
      entry: {type: locationDetails},
      id: { type: GraphQLInt },
    };
  },
});

const locationDetails = new GraphQLObjectType({
  name: 'location_details',
  description: 'this represents a a location details',
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
    const locations = await FoodMapLocation.findAll({
      raw: true, // Sequelize wraps all it's return values in a virtual object that contains meta data. If you have an object and you just want the undecorated data value
      nest : true // if you have associations with include that gets flattened. So, we can use another parameter nest:true 
    });
    const parsedLocations = locations.map(location => {
      // assigns remaining keys to a new `entry` object using destructuring
      const {id, ...entry} = location
      return {id, entry}
    });
      return parsedLocations;
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