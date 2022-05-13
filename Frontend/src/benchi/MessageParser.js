class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = {...state};
  }

  parse(message) {
    console.log(this.state)
    this.fetchAnswer(message);
  }

  interpret(data) {
    const chitChatAnswer = data[0].answer;
    const answer = data[1] !== undefined ? data[1].answer : undefined;
    if (answer !== undefined) {
      this.actionProvider.handleAnswer(answer, this.state.questionNr, this.state.userPreferences);
      return;
    }
    if (chitChatAnswer === 'true' || chitChatAnswer === 'false' || chitChatAnswer === 'medium') {
      this.actionProvider.handleAnswer(chitChatAnswer, this.state.questionNr, this.state.userPreferences);
      return;
    }
    if (chitChatAnswer === 'No answer found') {
      this.actionProvider.handleNoAnswer();
      return;
    }
    this.actionProvider.handleChitChat(chitChatAnswer);
  }

  fetchAnswer(message) {
    var url = "https://westeurope.api.cognitive.microsoft.com/language/:query-knowledgebases?projectName=benchi-QnA&api-version=2021-10-01&deploymentName=production";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.responseType = 'json';

    xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "6ee6c9b8f982470abc210317cbf8d89c");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.interpret(xhr.response.answers);
      }
    };

    var data = `{"top":3,"question":"${message}","includeUnstructuredSources":true,"confidenceScoreThreshold":"0.5","answerSpanRequest":{"enable":true,"topAnswersWithSpan":1,"confidenceScoreThreshold":"0.5"}}`;

    xhr.send(data);
  }
}

export default MessageParser;