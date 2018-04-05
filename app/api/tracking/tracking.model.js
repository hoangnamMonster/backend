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
    delivery_date: Date,
    department_receive : String,
    price_buy : Number,
    price_sale : Number,
    time_exspect : Date,
    cau1 : String,
    time_cau1 : String,
    cau2 : String,
    time_cau2 : String,
    cau3 : String,
    time_cau3 : String,
    cau4 : String,
    time_cau4 : String
})
registerEvents(TrackingSchema);
export default mongoose.model('Tracking', TrackingSchema);