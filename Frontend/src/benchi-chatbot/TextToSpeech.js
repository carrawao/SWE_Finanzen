class TextToSpeech {

    static ctx = new AudioContext();

    static textToSpeech = async (answer) => {
        
        let audio;
        try {
            const response = await fetch(`${process.env.REACT_APP_BOTBACKENDURL}/textToSpeech?text=${answer}`, {mode:'cors'})
            const arrayBuffer = await response.arrayBuffer();
            TextToSpeech.ctx.close();
            TextToSpeech.ctx = new AudioContext();
            audio = await TextToSpeech.ctx.decodeAudioData(arrayBuffer);
            const playSound = TextToSpeech.ctx.createBufferSource();
            playSound.buffer = audio;
            playSound.connect(TextToSpeech.ctx.destination);
            playSound.start(TextToSpeech.ctx.currentTime);
        } catch (e) {
            console.log('fetching failed === ', e);
        }
    }
}

export default TextToSpeech;
