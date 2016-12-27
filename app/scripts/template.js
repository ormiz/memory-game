angular.module('memoryGameApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/card.html',
    "<div class=flip-container><div ng-class=card.flipClass><div class=front><div class=cards-card54 ng-click=cardAction(card)></div></div><div class=back><div ng-class=card.class></div></div></div></div>"
  );


  $templateCache.put('views/game-end.html',
    "<div class=container><div class=row><div class=col-sm-7><h2 ng-if=result>Well done! Your score is {{score}}.</h2><h2 ng-if=!result>Game Over! You suck. Your score is {{score}}.</h2></div><div class=col-sm-2><h2><button class=\"btn btn-primary btn-block\" ng-click=startOver()>Start Over</button></h2></div></div></div>"
  );


  $templateCache.put('views/game-start.html',
    "<div class=container><form><p style=height:60px></p><div class=\"form-group row\"><label for=spinner class=\"col-form-label col-sm-offset-4 col-sm-2\">Number of cards to play:</label><div class=col-sm-2><div class=input-group><input style=height:57px id=spinner class=form-control ng-model=spinnerValue readonly> <span class=input-group-addon><div class=btn-group-vertical><button class=\"btn btn-xs btn-secondary\" type=button ng-click=incrementSpinnerValue()><span class=\"glyphicon glyphicon-chevron-up\"></span></button> <button class=\"btn btn-xs btn-secondary\" type=button ng-click=decrementSpinnerValue()><span class=\"glyphicon glyphicon-chevron-down\"></span></button></div></span></div></div></div><div class=\"form-group row\"><div class=\"col-sm-offset-4 col-sm-4\"><a class=\"btn btn-primary btn-block\" href=#!game>Start</a></div></div></form></div>"
  );


  $templateCache.put('views/game.html',
    "<div class=container ng-init=startGame()><div class=row><div class=col-md-10><card ng-repeat=\"c in cards track by $index\" card-data=c card-action=cardClick(c)></card></div><div class=col-md-2><a class=\"btn btn-primary\" href=#!result>Finish</a></div></div></div>"
  );

}]);
