/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
var TrackingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TrackingEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Tracking) {
  for(var e in events) {
    let event = events[e];
    Tracking.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    TrackingEvents.emit(`${event}:${doc._id}`, doc);
    TrackingEvents.emit(event, doc);
  };
}

export {registerEvents};
export default TrackingEvents;
