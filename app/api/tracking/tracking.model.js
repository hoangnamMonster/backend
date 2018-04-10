'use strict';
import mongoose,{schema, Schema} from 'mongoose';
import { registerEvents} from './tracking.events';
var TrackingSchema = new Schema({
    created : Date,
    modified: Date,
    to : String,
    bill_safa : String,
    tracking : String,
    service : String,
    delivery_date: Date,
    time_exspect : Date,
    cau1 : String,
    time_cau1 : String,
    diadiem1 : String,
    cau2 : String,
    time_cau2 : String,
    diadiem2 : String,
    cau3 : String,
    time_cau3 : String,
    diadiem3 : String,
    cau4 : String,
    time_cau4 : String,
    diadiem4 : String
})
registerEvents(TrackingSchema);
export default mongoose.model('Tracking', TrackingSchema);