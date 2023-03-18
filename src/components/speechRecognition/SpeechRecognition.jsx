import { useCallback, useState } from 'react';


export const useSpeechRecognition = () => {
    const [userInput, setUserInput] = useState('');
  
    const handleSpeechRecognition = useCallback(() => {
      // create a new SpeechRecognition object
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        // SpeechRecognition API is supported
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        // rest of the code that uses recognition object
      } else {
        // SpeechRecognition API is not supported
        console.log('SpeechRecognition is not supported in this browser');
      }
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
  
      // add a 'result' event listener to the recognition object
      recognition.addEventListener('result', (event) => {
        const speechToText = event.results[0][0].transcript;
        setUserInput(speechToText);
      });
  
      // add an 'end' event listener to the recognition object
      recognition.addEventListener('end', recognition.start);
  
      // start the recognition process
      recognition.start();
  
      // return the cleanup function
      return () => {
        recognition.removeEventListener('result', (event) => {
          const speechToText = event.results[0][0].transcript;
          setUserInput(speechToText);
        });
        recognition.removeEventListener('end', recognition.start);
        recognition.abort();
      };
    }, []);
  
    return [handleSpeechRecognition, userInput];
  };