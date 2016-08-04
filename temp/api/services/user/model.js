import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('user',
  new Schema({
    uuid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  facebookId: { type: String },
  facebook: { type: Schema.Types.Mixed },
  googleId: { type: String },
  google: { type: Schema.Types.Mixed },
  instagramId: { type: String },
  instagram: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }));
