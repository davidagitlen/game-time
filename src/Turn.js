import domUpdates from './domUpdates';

class Turn {
  constructor() {
  }

  checkGuess(game, guess) {
    let index = game.currentRound.currentSurveyAnswers.findIndex(answerObj => answerObj.answer.toLowerCase() === guess.toLowerCase());
    if (index !== -1) {
      let targetAnswer = game.currentRound.currentSurveyAnswers.splice(index, 1)[0];
      this.assignPoints(game, targetAnswer);
    }
    this.endTurn(game);
  }

  assignPoints(game, targetAnswer) {
    game.currentRound.currentPlayer.score += targetAnswer.respondents * game.currentRound.currentPlayer.multiplier;
  }

  endTurn(game) {
    game.currentRound.currentPlayer === game.playerOne ? game.currentRound.currentPlayer = game.playerTwo : game.currentRound.currentPlayer = game.playerOne;
    if (game.currentRound.currentSurveyAnswers.length === 0) {
      game.currentRound.endRound(game);
      domUpdates.populateQuestionsAndAnswers(game.currentRound);
    }
  }
}

export default Turn;