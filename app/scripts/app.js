var app = angular.module('memoryGameApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "../views/game-start.html",
            controller: "GameStartController"
        })
        .when("/game", {
            templateUrl: "../views/game.html",
            controller: "GameController"
        })
        .when("/result", {
            templateUrl: "../views/game-end.html",
            controller: 'GameEndController'
        })
        .otherwise({
            template: ""
        });
}]);