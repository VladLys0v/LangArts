import { useCallback, useEffect, useState } from 'react';

export const useSpeechRecognition = () => {
  const [userInput, setUserInput] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const handleSpeechRecognition = useCallback(() => {
    if (recognition && !isRecognizing) {
      recognition.start();
      setIsRecognizing(true);
    }
  }, [recognition, isRecognizing]);

  const stopSpeechRecognition = useCallback(() => {
    if (recognition && isRecognizing) {
      recognition.stop();
      setIsRecognizing(false);
    }
  }, [recognition, isRecognizing]);

  useEffect(() => {
    if (!recognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
       // Add support for Russian language
       recognition.lang = 'ru-RU';
       // Add support for Polish language
       recognition.lang = 'pl-PL';
      recognition.addEventListener('result', (event) => {
        const speechToText = event.results[0][0].transcript;
        setUserInput(speechToText);
      });
      recognition.addEventListener('end', () => {
        setIsRecognizing(false);
      });
      setRecognition(recognition);
    }
  }, [recognition]);

  return [handleSpeechRecognition, stopSpeechRecognition, userInput, isRecognizing];
};