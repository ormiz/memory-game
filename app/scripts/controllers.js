angular.module('memoryGameApp')
    .controller('GameController', ['$scope', '$timeout', '$location', 'CardsService', 'GameService', function($scope, $timeout, $location, CardsService, GameService) {

        $scope.cards = [];
        $scope.cardsClicked = 0;

        $scope.startGame = function() {
            console.log("Game started");

            $scope.cards = CardsService.getCards();
            console.log($scope.cards);
        };

        $scope.cardClick = function(card) {

            if (card.solved === true || $scope.card1 == card || $scope.cardsClicked > 1)
                return;

            $scope.cardsClicked++;
            card.flip();

            console.log($scope.cardsClicked);

            if ($scope.cardsClicked == 1) {
                $scope.card1 = card;
            } else if ($scope.cardsClicked === 2) {

                $scope.card2 = card;

                if ($scope.card1.class === $scope.card2.class) {

                    $scope.card1.solved = true;
                    $scope.card2.solved = true;

                    $scope.cardsClicked = 0;
                    $scope.card1 = null;
                    $scope.card2 = null;

                    if (GameService.checkIfGameOver($scope.cards) === true) {

                        $timeout(function() {
                            $location.path("/result");
                        }, 1000);

                    }

                } else {

                    $timeout(function() {

                        $scope.card1.unflip();
                        $scope.card2.unflip();

                        $scope.cardsClicked = 0;
                        $scope.card1 = null;
                        $scope.card2 = null;

                    }, 2000);

                }
            }
        };

    }])
    .controller('GameStartController', ['$scope', 'CardsService', function($scope, CardsService) {

        $scope.spinnerValue = 8;
        CardsService.setNumOfCards($scope.spinnerValue);

        $scope.incrementSpinnerValue = function() {
            if ($scope.spinnerValue < 64) {
                $scope.spinnerValue += 2;
                CardsService.setNumOfCards($scope.spinnerValue);
            }
        };

        $scope.decrementSpinnerValue = function() {
            if ($scope.spinnerValue > 8) {
                $scope.spinnerValue -= 2;
                CardsService.setNumOfCards($scope.spinnerValue);
            }
        };

    }])
    .controller('GameEndController', ['$scope', '$location', 'GameService', function($scope, $location, GameService) {

        $scope.score = GameService.getScore();
        $scope.result = GameService.getResult();
        $scope.startOver = function() {
            GameService.resetGame();
            $location.path("/");
        };

    }]);