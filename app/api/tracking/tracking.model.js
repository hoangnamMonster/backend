'use strict';
import mongoose,{schema, Schema} from 'mongoose';
import { registerEvents} from './tracking.events';
var TrackingSchema = new Schema({
    created : Date,
    modified: Date,
    sale_agent : String,
    customer : String,
    kdoc_pack : String,
    to : String,
    kg_receive : Number,
    kg_send : Number,
    bill_safa : String,
    bill_sky : String,
    tracking : String,
    service : String,
    pick_up_by : String,
    delivery_by : String,
    status : String,
    delivery_date : String,
    department_receive : Date,
    price_buy : Number,
    price_sale : Number
})
registerEvents(TrackingSchema);
export default mongoose.model('Tracking', TrackingSchema);