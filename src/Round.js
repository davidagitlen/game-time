import Player from './Player.js';
import Turn from './Turn.js';
import Game from './Game.js';
import FastMoneyTurn from './FastMoneyTurn.js';

class Round {
  constructor(game, survey, answers) {
    this.game = game;
    this.currentSurvey = survey;
    this.currentSurveyAnswers = answers;
    this.currentTurn = this.startTurn();
    this.currentPlayer = game.playerOne
  }

  endRound(game) {
    game.roundCounter++;
    if (game.roundCounter === 2) {
      console.log('you are done playing two rounds')
     	this.startFastMoneyTurn();
		} else {
		  game.startNewRound();
	 	}
 	}
   
  startTurn() {
    this.currentTurn = new Turn();
  	return this.currentTurn;
  }

  startFastMoneyTurn() {
    this.game.startNewRound();
    this.currentTurn = new FastMoneyTurn();
  }

}

export default Round;