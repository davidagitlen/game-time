import Round from './Round.js';
import Player from './Player.js';
import domUpdates from './domUpdates';

class Game {
  constructor(allSurveys, allAnswers, player1Name = 'Player 1', player2Name = 'Player 2') {
    this.allSurveys = allSurveys;
    this.allAnswers = allAnswers;
    this.gameIds = null;
    this.roundCounter = 0;
    this.turnCounter = 0;
    this.currentSurveys = this.pickSurveys();
    this.currentAnswers = this.pickAnswers(); 
    this.playerOne = new Player(player1Name);
    this.playerTwo = new Player(player2Name);
    this.currentRound = new Round(this, this.currentSurveys[this.roundCounter], this.setCurrentRoundAnswers());
  }

  startGame() {
    domUpdates.populateQuestionsAndAnswers(this);
    domUpdates.showCurrentPlayer(this)
  }

  setCurrentRoundAnswers() {
    return this.currentAnswers.filter(answer => answer.surveyId === this.currentSurveys[this.roundCounter].id);
  }

  startNewRound() {
    this.currentRound = new Round(this, this.currentSurveys[this.roundCounter], this.setCurrentRoundAnswers()); 
  }

  pickSurveys() {
    let randomIds = [];
    for (let i = 0; i < 15; i++) {
      let randomId = Math.floor(Math.random() * Math.floor(15) + 1);
      randomIds.push(randomId);
    }
    this.gameIds = Array.from(new Set(randomIds)).slice(0, 4);
    return this.gameIds.map(id => {
      return this.allSurveys.find(survey => survey.id === id);
    });
  }

  pickAnswers(ids) {
    return this.allAnswers.filter(answer => {
      return this.gameIds.some(id => id === answer.surveyId
      )});
  }

  endGame() {
    if (this.playerOne.score === this.playerTwo.score) {
      return 'It\'s a tie!';
    }
    let winner = this.playerOne.score > 
    this.playerTwo.score ? this.playerOne : this.playerTwo;
    domUpdates.handleEndGameAnimation(winner);
    return winner;
  }
}

export default Game;