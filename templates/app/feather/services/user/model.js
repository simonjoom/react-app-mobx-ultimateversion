import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const schema = new Schema({
  uuid: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true },
  username: { type: String, required: false, unique: true },
  password: { type: String, required: false },

  facebookId: { type: String },
  facebook: { type: Schema.Types.Mixed },
  googleId: { type: String },
  google: { type: Schema.Types.Mixed },
  instagramId: { type: String },
  instagram: { type: Schema.Types.Mixed },
  profile: {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    locationName: {
      type: String
    },
    bio: {
      type: String
    },
    location: {
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [Number]
    },
    subscriptions: [{
      subscriptionId: {
        type: Schema.Types.ObjectId,
        ref: 'subscription'
      },
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      },
    }],
    photo: {
      type: String
    }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model('user', schema);
