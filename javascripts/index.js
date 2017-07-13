'use strict';

var activity = new Vote({
  activityId: 12,
  initialData: {
    "1": {id: 1, target: ".vote-result-1", button: ".vote-button-1", count: 0},
    "2": {id: 2, target: ".vote-result-2", button: ".vote-button-2", count: 0}
  }
});