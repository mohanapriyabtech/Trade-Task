import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { encrypt } from '../utils/encrypt';

const Schema = mongoose.Schema; 

/**
 * * UserSchema
 * @description User model
 */
const UserSchema = new Schema({
 
    wallet_address: {
        type: String,
        required: [true, 'wallet_address must not be empty'],
        unique: true,
        required:true
    },  
    status: {
        type: Number,
        default: 1,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
}, { versionKey: false });

UserSchema.plugin(mongoosePaginate);

UserSchema.index({ email: 'text' });




export const User = mongoose.model('User', UserSchema);