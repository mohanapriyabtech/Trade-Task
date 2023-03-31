import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { encrypt } from '../utils/encrypt';

const Schema = mongoose.Schema; 

/**
 * * AdminSchema
 * @description Admin model
 */
const AdminSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email must not be empty'],
        unique: true
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

AdminSchema.plugin(mongoosePaginate);

AdminSchema.index({ email: 'text' });

/**
 * encrypt password
 */
AdminSchema.pre("save", function(next) {
    this.password = encrypt(this.password);
    next();
});


export const Admin = mongoose.model('Admin', AdminSchema);