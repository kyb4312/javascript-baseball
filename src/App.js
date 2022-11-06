const MissionUtils = require("@woowacourse/mission-utils");

class App {
  constructor() {
    this.threeDigits = [0, 0, 0];
    this.userDigits = [0, 0, 0];
    this.score = { strikes: 0, balls: 0 };
  }

  generateThreeDigits() {
    this.threeDigits = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
  }

  getUserDigits() {
    return new Promise((resolve, reject) => {
      MissionUtils.Console.readLine("숫자를 입력해주세요 : ", (userInput) => {
        this.checkInputValidity(userInput);
        this.userDigits = [...userInput].map(Number);
        resolve();
      });
    });
  }

  checkInputValidity(userInput) {
    if (userInput != parseInt(userInput) || userInput.length !== 3) {
      throw new Error("input should be three digits");
    }
  }

  countScore() {
    this.score.strikes = 0;
    this.score.balls = 0;

    for (let i = 0; i < 3; i++) {
      if (this.threeDigits[i] === this.userDigits[i]) {
        this.score.strikes += 1;
      } else if (this.threeDigits.includes(this.userDigits[i])) {
        this.score.balls += 1;
      }
    }
  }

  printScore() {
    let scoreSentence = "";
    if (this.score.balls) {
      scoreSentence += `${this.score.balls}볼`;
    }
    if (this.score.strikes) {
      if (scoreSentence) {
        scoreSentence += " ";
      }
      scoreSentence += `${this.score.strikes}스트라이크`;
    }
    if (!scoreSentence) {
      scoreSentence = "낫싱";
    }
    MissionUtils.Console.print(scoreSentence);
  }

  isGameOver() {
    if (this.score.strikes === 3) {
      return true;
    }
    return false;
  }

  async runUntilGameOver() {
    do {
      await this.getUserDigits();
      this.countScore();
      this.printScore();
    } while (!this.isGameOver());
  }

  play() {
    this.generateThreeDigits();
    this.runUntilGameOver();
  }
}

const app = new App();
app.play();

module.exports = App;
