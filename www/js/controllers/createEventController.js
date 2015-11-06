ionicApp.controller('CreateEventController', function($scope, $cordovaLocalNotification, $state, $firebase) {

  var self = this;

  var eventsRef = new Firebase('https://event-alarm.firebaseio.com/events');

  var currentUserId = eventsRef.getAuth();

  self.calcDateTime = function(eventDate, eventTime) {
    eventDate.setHours(eventTime.getHours());
    eventDate.setMinutes(eventTime.getMinutes());
    eventDateTime = eventDate;
    return eventDateTime;
  };

  self.createEventHash = function(eventTitle, description, eventDateTime) {
    currentEvent = {
      id : new Date().valueOf(),
      owner: currentUserId.uid,
      eventTitle : eventTitle,
      description : description,
      dateTime : eventDateTime.toJSON()
    };
    return currentEvent;
  };

  self.createNotification = function(currentEvent){
    eventsRef.push(currentEvent);
  };

  self.createEvent = function(eventTitle, description, eventDate, eventTime) {
    self.calcDateTime(eventDate, eventTime);
    self.createEventHash(eventTitle, description, eventDateTime);
    self.createNotification(currentEvent);
    $state.go('tabs.myEvents')
  };

});
