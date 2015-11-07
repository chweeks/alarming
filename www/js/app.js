var ionicApp = angular.module('alarming', ['ionic', 'ngCordova', 'firebase']);

var self = this;

ionicApp.run(function($ionicPlatform, $cordovaLocalNotification) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    var ref = new Firebase('https://event-alarm.firebaseio.com/');
    ref.child('events').on('value', function(events) {
      self.events = events.val();
      for (var key in self.events) {
        notification(self.events[key]);
      }
    });

    function notification(currentEvent) {
      $cordovaLocalNotification.schedule({
        id: currentEvent.id,
        title: currentEvent.eventTitle,
        text: currentEvent.description,
        at: Date.parse(currentEvent.dateTime),
      })
    }
  });
});

ionicApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});


ionicApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/logged-out');

  $stateProvider

  .state('loggedout', {
     url: '/logged-out',
     templateUrl: 'templates/logged-out.html',
     controller: 'LoggedOutController as LoggedOutCtrl'
 })

  .state('signin', {
    url: '/sign-in',
    templateUrl: 'templates/sign-in.html',
    controller: 'SignInController as signInCtrl'
  })

  .state('signup', {
    url: '/sign-up',
    templateUrl: 'templates/sign-up.html',
    controller: 'SignUpController as signUpCtrl'
  })

  .state('forgotpassword', {
    url: '/forgot-password',
    templateUrl: 'templates/forgot-password.html'
  })

  .state('tabs', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsController as tabsCtrl'
  })

  .state('tabs.createEvent', {
    url: '/event',
    views: {
      'event-tab': {
        templateUrl: 'templates/create-event.html',
        controller: 'CreateEventController as CreateEventCtrl'
      }
    }
  })

  .state('tabs.myEvents', {
    url: '/my-events',
    views: {
      'my-events-tab': {
        templateUrl: 'templates/my-events.html',
        controller: 'MyEventsController as MyEventsCtrl'
      }
    }
  })

  .state('myEvent', {
    url: '/my-event/:key',
    templateUrl: 'templates/my-event.html',
    controller: 'MyEventsController as MyEventsCtrl'
  });
});
