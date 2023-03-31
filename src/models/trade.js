import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { encrypt } from '../utils/encrypt';
import { string } from 'joi';

const Schema = mongoose.Schema; 

/**
 * * 
 * @description  Trade Model
 */
const TradeSchema = new Schema({
    key1: { type: String },
    key2: { type: String },
    key3: { type: String },
    key4: { type: String },
    key5: { type: String },
    key6: { type: String },
    key7: { type: String },
    key8: { type: String },
    key9: { type: String },
    key10: { type: String },
    key11: { type: String },
    key12: { type: String },
    key13: { type: String },
    key14: { type: String },
    key15: { type: String },
    key16: { type: String },
    key17: { type: String },
    key18: { type: String },
    key19: { type: String },

    created_at: {
        type: Date,
        default: Date.now,
    }
}, { versionKey: false });

TradeSchema.plugin(mongoosePaginate);




export const Trade = mongoose.model('Trade', TradeSchema);