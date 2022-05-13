class ActionProvider {
  
  strategies = {
    BuyAndHold : {experience: 'false', risk: 'false', active: 'true', effort: 'false', duration: 'true'}, 
    Index : {experience: 'false', risk: 'false', active: 'false', effort: 'false',duration: 'true'},
    Size : {experience: 'false', risk: 'medium', active: 'true', effort: 'false', duration: undefined}, 
    Growth : {experience: 'true', risk: 'medium', active: 'true', effort: 'true', duration: 'true'}, 
    Value : {experience: 'true', risk: 'medium', active: 'true', effort: 'true', duration: 'true'},
    Long : {experience: 'true', risk: 'medium', active: 'true', effort: 'true', duration: 'true'},
    Short :{experience: 'true', risk: 'true', active: 'true', effort: 'true', duration: 'false'},
    Trend : {experience: 'true', risk: 'medium', active: 'true', effort: 'true', duration: 'medium'} ,
    Dividend : {experience: 'false', risk: 'medium', active: 'true', effort: 'medium', duration: undefined},  
    Anticyclical : {experience: 'true', risk: 'true', active: 'true', effort: 'true', duration: 'false'}, 
    Cyclical : {experience: undefined, risk: 'true', active: 'true', effort: 'true', duration: undefined}
  };

  strategieDescriptions = {
    BuyAndHold : 'In this strategy, you buy individual stocks and hold them for at least five to 20 years. The hope is for long-term growth through diversified single stock purchases. Short-term fluctuations are avoided by the long investment period.', 
    Index : 'You do not invest in individual stocks, but in indices or so-called ETFs (Exchange Traded Fund). This strategy works in principle like the buy and hold method, but ETFs contain many different securities according to certain indices and are therefore already diversified. This saves you a lot of effort before and during your loading investment.',
    Size : 'In the size strategy you go by the size of the company. It is assumed that the larger the company, the more secure the price gain and the smaller the expected fluctuations. Thus, the strategy is based on stability.', 
    Growth : 'In the growth strategy you invest in stocks that are likely to increase in price over the next few years. This is judged on the basis of stock market data.', 
    Value : 'With the Growth strategy you invest in stocks that are likely to rise in price in the next few years. This is judged on the basis of a detailed analysis of the company.',
    Long : 'In the Go-Long strategy you buy a stock and hold it in the hope that it will rise in the long term.',
    Short :'You sell a stock from your holdings and try to buy it again shortly after at the low. The difference can therefore be considered a profit.',
    Trend : 'In the trend determined strategy you try to predict the development of the stock by drawing certain trend lines, average values or by market technical theories.',
    Dividend : 'You bet on dividend payments and price gains.',  
    Anticyclical : 'When everyone is buying, you sell and vice versa. You try to buy at the low and sell at the high, against the current.', 
    Cyclical : 'You try to go with the flow and invest in securities that will predictably perform well.'
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
    {true: `All things come to him who waits!`, medium:`Okay, we're going with mediumterm investing!`, false: `Looks like you're looking for quick money!`},
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

  handleAnswer(answer, questionNr, userPreferences) {
    if (questionNr === undefined) {
      questionNr = 0;
      userPreferences = {experience: '', risk: '', active: false, effort: '', duration: ''};
    }
    if (questionNr === -1) {
      const botAnswer = this.createChatBotMessage(`Hi! I'm Benchi! Are you interested in finding the right investment strategy for you together?`);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botAnswer],
        'questionNr': (questionNr + 1)
      }));
      return;
    }
    if (questionNr === 5) {
      userPreferences = {...userPreferences, duration: answer};
      const Strategy = this.findStrategyForUser(userPreferences);
      const botAnswer = this.createChatBotMessage(this.answerAfterQuestion[questionNr][answer]);
      const botStrategy = this.createChatBotMessage(`The best strategy for you is ${Strategy}`);
      const botStrategyExplanation = this.createChatBotMessage(this.strategieDescriptions[Strategy]);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botAnswer, botStrategy, botStrategyExplanation],
        questionNr: questionNr + 1
      }));
      return;
    }
    if (questionNr > 5) {
      userPreferences = {...userPreferences, duration: answer};
      const Strategy = this.findStrategyForUser(userPreferences);
      const botStrategy = this.createChatBotMessage(`The best strategy for you is ${Strategy}`);
      const botStrategyExplanation = this.createChatBotMessage(this.strategieDescriptions[Strategy]);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botStrategy, botStrategyExplanation],
        questionNr: questionNr + 1
      }));
      return;
    }
    
    if (this.preferencesArray[questionNr-1] === 'active') {
      answer = answer === 'medium' ? false : answer;
    }
    const botAnswer = this.createChatBotMessage(this.answerAfterQuestion[questionNr][answer]);
    const botNewQuestion = this.createChatBotMessage(this.questions[questionNr]);
      
    if (questionNr > 0 && questionNr < 5) {
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botAnswer, botNewQuestion],
        'questionNr': questionNr + 1,
        'userPreferences': {...userPreferences, [this.preferencesArray[questionNr-1]]: answer}
      }));
    } else {
      if (questionNr === 0 && answer === 'false') {
        this.setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botAnswer],
          'questionNr': -1,
        }));  
        return;
      }
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botAnswer, botNewQuestion],
        questionNr: questionNr + 1
      }));
    }
  }

  findStrategyForUser(userPreferences) {
    let strategiesFit = {};
    const strategiesKeys = Object.keys(this.strategies);
    for (let index = 0; index < strategiesKeys.length; index++) {
      const strategieKey = strategiesKeys[index];
      const strategy = this.strategies[strategieKey];
      let fit = 0;
      for (let i = 0; i < this.preferencesArray.length; i++) {
        const preference = this.preferencesArray[i];
        if (strategy[preference] === undefined || strategy[preference] === userPreferences[preference]) {
          fit++;
        }       
      }
      strategiesFit[strategieKey] = fit;
    }
    console.log(strategiesFit);
    let bestStrategy = '';
    let bestFit = 0;
    for (let index = 0; index < strategiesKeys.length; index++) {
      const strategieKey = strategiesKeys[index];
      if (bestFit < strategiesFit[strategieKey]) {
        bestFit = strategiesFit[strategieKey];
        bestStrategy = strategieKey;
      }
    }
    console.log(bestStrategy);
    return bestStrategy;
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