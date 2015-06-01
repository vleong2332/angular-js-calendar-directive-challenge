var calendarDemoApp = angular.module('calendarDemoApp', []);



calendarDemoApp.run(function($rootScope, getYearRange) {
   // Setting current month and year
   var now = new Date();
   $rootScope.calendarSetting = {
      // Compensate for 0/1 base difference
      currentMonth: now.getMonth() + 1,
      currentYear: now.getFullYear(),
      months: [
         {name: 'Jan', cardinal: '1'},
         {name: 'Feb', cardinal: '2'},
         {name: 'Mar', cardinal: '3'},
         {name: 'Apr', cardinal: '4'},
         {name: 'May', cardinal: '5'},
         {name: 'Jun', cardinal: '6'},
         {name: 'Jul', cardinal: '7'},
         {name: 'Aug', cardinal: '8'},
         {name: 'Sep', cardinal: '9'},
         {name: 'Oct', cardinal: '0'},
         {name: 'Nov', cardinal: '11'},
         {name: 'Dec', cardinal: '12'}
      ],
      years: getYearRange
   };
});



calendarDemoApp.factory('changeCalendarRange', function($rootScope) {
   return function() {
      var newDate = new Date();
      newDate.setFullYear(parseInt($rootScope.calendarSetting.currentYear));
      // Compensate for 0/1 base difference
      newDate.setMonth(parseInt($rootScope.calendarSetting.currentMonth-1));
      return CalendarRange.getMonthlyRange(newDate);
   }
});
calendarDemoApp.factory('getYearRange', function() {
   var now = new Date();
   var currentYear = now.getFullYear();
   var years = [];
   var min = currentYear - 20;
   var max = currentYear + 21;
   for (var i = min; i < max; i++) {
      years.push(i);
   }
   return years;
});



calendarDemoApp.controller('calendarCtrl', function($rootScope, changeCalendarRange) {
   $rootScope.changeCalendarRange = changeCalendarRange;
   $rootScope.calendarRange = CalendarRange.getMonthlyRange(new Date());
});



calendarDemoApp.directive('calendar', function() {
   return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/calendar.html'
   }
});
calendarDemoApp.directive('navigation', function() {
   return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/navigation.html'
   }
});