class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = {...state};
  }

  async parse(message) {
    let answers = await this.fetchAnswer(message);
    this.interpret(answers);
  }

  interpret(answers) {
    const firstAnswer = answers[0].answer;
    const secondAnswer = answers[1] !== undefined ? answers[1].answer : undefined;
    //Normally the answer we need will be in the second part
    if (secondAnswer !== undefined) {
      this.actionProvider.handleAnswer(secondAnswer, this.state.questionNr, this.state.userPreferences);
      return;
    }
    //if there is no chitchat answer our defined answers can also be in the firstPart
    if (firstAnswer === 'true' || firstAnswer === 'false' || firstAnswer === 'medium' || firstAnswer === 'restart') {
      this.actionProvider.handleAnswer(firstAnswer, this.state.questionNr, this.state.userPreferences);
      return;
    }
    if (firstAnswer === 'No answer found') {
      this.actionProvider.handleNoAnswer();
      return;
    }
    //if there is no answer that we defined than we show the chitchat answer
    this.actionProvider.handleChitChat(firstAnswer);
  }

  async fetchAnswer(message) {
    try {
      const response = await fetch(`http://benchmarket.germanywestcentral.cloudapp.azure.com:1880/interpretMessage?message=${message}`, {mode:'cors'})
      const json = await response.json();
      return json.answers;
    } catch (e) {
        console.log('fetching failed === ', e);
    }
  }
}

export default MessageParser;