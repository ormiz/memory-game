angular.module('memoryGameApp')
    .service('CardsService', [function() {

        var numOfCards = 0;

        this.setNumOfCards = function(num) {
            numOfCards = num;
        };

        this.getNumOfCards = function() {
            return numOfCards;
        };

        function Card(cardClass) {
            this.hide = true;
            this.revealed = 0;
            this.solved = false;
            this.class = cardClass;
            this.flipClass = "";

            this.flip = function() {
                this.hide = false;
                this.flipClass = "flipped";
                this.revealed++;
            };

            this.unflip = function() {
                this.hide = true;
                this.flipClass = "unflipped";
            };
        }

        this.getCards = function() {
            var cards = [];
            var cardsMap = new Map();

            for (var i = 0; i < numOfCards / 2; i++) {

                var cardNum = i * 4 + Math.floor((Math.random() * 4));

                assignCard(new Card("cards-card" + cardNum));
                assignCard(new Card("cards-card" + cardNum));
            }

            function assignCard(card) {

                var assigned = false;
                var index;

                while (!assigned) {
                    index = Math.floor((Math.random() * numOfCards));
                    if (cards[index] === undefined) {
                        cards[index] = card;
                        assigned = true;
                        console.log(card.class + " assigned in " + index);
                    }
                }
            }

            return cards;
        };

    }])
    .service('GameService', [function() {

        var score = 0;
        var result = false;

        function calcScore(cards) {
            score = 100;
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].revealed > 1) {
                    score -= (cards[i].revealed - 1);
                }
            }
        }

        this.checkIfGameOver = function(cards) {
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].solved === false) {
                    return false;
                }
            }

            calcScore(cards);
            result = true;
            return true;
        };

        this.getResult = function() {
            return result;
        };

        this.resetGame = function() {
            score = 0;
            result = false;
        };

        this.getScore = function() {
            return score;
        };

    }]);