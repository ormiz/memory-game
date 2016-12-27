angular.module('memoryGameApp')
    .directive('card', function() {
        return {
            restrict: 'E',
            scope: {
                card: '=cardData',
                cardAction: '&'
            },
            templateUrl: 'views/card.html'
        };
    });