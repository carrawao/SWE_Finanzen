class ActionProvider {
  
  strategies = {
    BuyAndHold : {experience: 'beginner', risk: 'low', active: true, effort: 'low', duration: 'longterm'}, 
    Index : {experience: 'beginner', risk: 'low', active: false, effort: 'low',duration: 'longterm'},
    Size : {experience: 'beginner', risk: 'medium', active: true, effort: 'low', duration: 'undefined'}, 
    Growth : {experience: 'advanced', risk: 'medium', active: true, effort: 'high', duration: 'longterm'}, 
    Value : {experience: 'advanced', risk: 'medium', active: true, effort: 'high', duration: 'longterm'},
    Long : {experience: 'advanced', risk: 'medium', active: true, effort: 'high', duration: 'longterm'},
    Short :{experience: 'advanced', risk: 'high', active: true, effort: 'high', duration: 'shortterm'},
    Trend : {experience: 'advanced', risk: 'medium', active: true, effort: 'high', duration: 'mediumterm'} ,
    Dividend : {experience: 'beginner', risk: 'medium', active: true, effort: 'medium', duration: 'undefined'},  
    Anticyclical : {experience: 'advanced', risk: 'high', active: true, effort: 'high', duration: 'shortterm'}, 
    Cyclical : {experience: 'undefined', risk: 'high', active: true, effort: 'high', duration: 'undefined'}
  };

  strategieDescriptions = {
    BuyAndHold : {experience: 'beginner', risk: 'low', active: true, effort: 'low', duration: 'longterm'}, 
    Index : {experience: 'beginner', risk: 'low', active: false, effort: 'low',duration: 'longterm'},
    Size : {experience: 'beginner', risk: 'medium', active: true, effort: 'low', duration: 'undefined'}, 
    Growth : {experience: 'advanced', risk: 'medium', active: true, effort: 'high', duration: 'longterm'}, 
    Value : {experience: 'advanced', risk: 'medium', active: true, effort: 'high', duration: 'longterm'},
    Long : {experience: 'advanced', risk: 'medium', active: true, effort: 'high', duration: 'longterm'},
    Short :{experience: 'advanced', risk: 'high', active: true, effort: 'high', duration: 'shortterm'},
    Trend : {experience: 'advanced', risk: 'medium', active: true, effort: 'high', duration: 'mediumterm'} ,
    Dividend : {experience: 'beginner', risk: 'medium', active: true, effort: 'medium', duration: 'undefined'},  
    Anticyclical : {experience: 'advanced', risk: 'high', active: true, effort: 'high', duration: 'shortterm'}, 
    Cyclical : {experience: 'undefined', risk: 'high', active: true, effort: 'high', duration: 'undefined'}
  };

  questions = 
  [
    `Are you a beginner, intermediate or advanced investor?`,
    `How much risk are you willing to take?`,
    `Would you like to invest active?`,
    `How much effort do you want to put into your investing?`,
    `Do you want to invest shortterm, mediumterm or longterm?`
  ];

  answerAfterQuestion = 
  [
    {true: `Nice to hear, let's start!`, medium:`Let's give it a try anyway!`, false: `Okay, you can come back any time!`},
    {true:`So you alreay have a lot of experience, impressive!`, medium: `So you are an intermediate investor!`, false: `No problem, there are also great strategies for beginners!`},
    {true: `Okay so you are a risk taker!`, medium:`Medium risk, nice choice!`, false: `Just a tiny bit of risk, okay!`},
    {true: `Okay, so you are an active investor!`, medium:`Then let's go with investing passivly!`, false: `Passive investing, nice choice!`},
    {true: `So you don't mind getting your hands dirty!`, medium:`Medium effort it is!`, false: `So you would rather chill at the beach than look through company reports!`},
    {true: `Looks like you're looking for quick money!`, medium:`Okay, we're going with mediumterm investing!`, false: `All things come to him who waits!`},
  ];

  preferencesArray = ['experience', 'risk', 'active', 'effort', 'duration'];
  
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  handleChitChat(answer) {
    const botMessage = this.createChatBotMessage(answer);
      
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  handleAnswer(answer, questionNr) {
    console.log(questionNr);
    if (questionNr === -1) {
      const botAnswer = this.createChatBotMessage(`Hi! I'm Benchi! Are you interested in finding the right investment strategy for you together?`);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botAnswer],
      }));
      questionNr = questionNr + 1;
      return;
    }
    if (questionNr > 0 && questionNr < 5) {
      this.saveUserPreference(answer, );
    } else {
      if (answer === 'false') {
        questionNr = -2;
      }
    }
    const botAnswer = this.createChatBotMessage(this.answerAfterQuestion[questionNr][answer]);
    questionNr = questionNr + 1;
    if (preference === 'active') {
      answer = answer === 'medium' ? false : answer;
    }
    const botNewQuestion = this.createChatBotMessage(this.questions[questionNr]);
      
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botAnswer, botNewQuestion],
      questionNr: questionNr,
      userPreferences: {...userPreferences, [this.preferencesArray[questionNr-1]]: answer}
    }));
  }

  findStrategyForUser() {

  }

  handleNoAnswer() {
    const botMessage = this.createChatBotMessage(`Sorry, but I didn't understand you.`);
      
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    this.messageCnt = this.messageCnt + 1;
  }
}
  
  export default ActionProvider;