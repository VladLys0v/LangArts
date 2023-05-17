import React, { useState, useEffect, useCallback } from 'react';
import './memoryCards.css';
import { RiCloseFill, RiCheckboxCircleLine, RiMicLine, RiArrowRightSLine, RiArrowLeftSLine, RiSettings4Line, RiHeartLine, RiHeartFill, RiQuestionFill } from 'react-icons/ri';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import {useSpeechRecognition} from '../../components/speechRecognition/SpeechRecognition.jsx';


const MemoryCards = ({ showMemoryCards, setShowMemoryCards, language, language2 }) => {
  
  const [countdown, setCountdown] = useState(3);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWords, setShowWords] = useState(false);
  const history = createBrowserHistory();
  const [userInput, setUserInput] = useState('');
  const [matchingWord, setMatchingWord] = useState('');
  const [showCorrectMessage, setShowCorrectMessage] = useState(false)
  const [handleSpeechRecognition, stopSpeechRecognition, recognizedSpeech, isRecognizing] = useSpeechRecognition();
  const [isFilled, setIsFilled] = useState(false);

  const like = () => {
    setIsFilled(!isFilled);
  }

  useEffect(() => {
    if (showMemoryCards) {
      // Disable scrolling for the body when the MemoryCards is open
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling for the body when the MemoryCards is closed
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMemoryCards]);

  useEffect(() => {
    if (recognizedSpeech) {
      setUserInput(recognizedSpeech);
    }
  }, [recognizedSpeech]);

  const handleMicClick = () => {
    if (isRecognizing) {
      stopSpeechRecognition();
    } else {
      handleSpeechRecognition();
    }
  };

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/${language}`);
        const filteredWords = response.data.filter((wordObj) => wordObj.word.trim() !== ''); //doesn't display empty words
        setWords(filteredWords);
          }     
        catch (error) {
        console.error('Error fetching words: ' + error);
    }
  }; 
    const fetchMatchingWords = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/${language2}`);
        const matchingWords = response.data.filter((wordObj) => wordObj.word.trim() !== '');
        setMatchingWord(matchingWords[currentIndex]?.word || '');
      } catch (error) {
        console.error('Error fetching matching words: ' + error);
      }
    };
    fetchMatchingWords();

//START! DOES NOT APPEAR, NEEDS TO BE FIXED
    if (showMemoryCards && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showMemoryCards && countdown === 0) {
      setCountdown('Start!');
      fetchWords();
      fetchMatchingWords();
    } else if (!showMemoryCards) {
      setCountdown(3);
      setShowWords(false);
      setCurrentIndex(0);
      setWords([]);
      setMatchingWord('');
    }
  }, [showMemoryCards, countdown, language, currentIndex, language2]);

  const handleNextWord = useCallback(() => {
    if (currentIndex + 1 < words.length) {
      setCurrentIndex(currentIndex + 1);
      setMatchingWord(words[currentIndex + 1][language2]);
      setUserInput('');
    }
  }, [currentIndex, words, language2]);

  const handlePreviousWord = useCallback(() => {
  if (currentIndex - 1 >= 0) {
    setCurrentIndex(currentIndex - 1);
    setMatchingWord(words[currentIndex - 1][language2]);
    setUserInput('');
  }
}, [currentIndex, words, language2]);

  useEffect(() => {
    if (countdown === 'Start!') {
      const timer = setTimeout(() => {
        setShowWords(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleCorrectMessage = useCallback((correct) => {
    setShowCorrectMessage(correct);
    if (correct) {
      const timer = setTimeout(() => {
        setShowCorrectMessage(false);
        setUserInput('');
        setCurrentIndex(currentIndex + 1);
        setMatchingWord(words[currentIndex + 1]?.[language2] || '');
      }, 1000);
      return () => clearTimeout(timer);
    }
  },[setCurrentIndex, setMatchingWord, words, currentIndex, language2]);

  const handleSubmitAnswer = useCallback(() => {
    if (userInput === matchingWord) {
      handleCorrectMessage(true);
      setUserInput('');
    } else if (recognizedSpeech === matchingWord) {
      handleCorrectMessage(true);
      setUserInput('');
    } else if (recognizedSpeech) {
      handleCorrectMessage(false);
      setUserInput('');
    } 
  }, [recognizedSpeech,userInput, matchingWord, handleCorrectMessage]);

  const handleClose = () => {
    setShowMemoryCards(false);
    setUserInput('');
    history.push(`/`);
  };

  if (!showMemoryCards) {
    return null;
  }

  return (
    <div className="langarts__memoryCards-overlay">
    <div className="langarts__memoryCards">
      <div className="langarts__memoryCards__header">
        <div className="langarts__memoryCards__header-close">
          <RiCloseFill color="grey" size={35} onClick={() => handleClose(false)} />
        </div>
      </div>

      <div className="langarts__memoryCards__content">
        {countdown !== 'Start!' && (
          <div className="langarts__memoryCards__countdown">{countdown}</div>
        )}
        {showWords && words.length > 0 && (    
          <div className = "langarts__memoryCards__afterCountdown">
            <div className = "langarts__memoryCards__afterCountdown_header">
              <h2>Memory cards</h2>
              <div className = "langarts__memoryCards__afterCountdown-header-buttons">
              <div onClick={like}>
              {isFilled ? <RiHeartFill color="red" size={30} /> : <RiHeartLine color="grey" size={30} />}
              </div>
                <RiQuestionFill color="grey" size={30} />
                <RiSettings4Line color="grey" size={30} />
              </div>
            </div>
            <div className ="langarts__memoryCards__taskWord">
            <div className ="langarts__memoryCards__previousWord">
             {currentIndex > 0 && (
              <RiArrowLeftSLine color="grey" size={35} onClick={handlePreviousWord} />
            )}
            </div>
            <div className ="langarts__memoryCards__word">{words[currentIndex].word}</div>
            <div className ="langarts__memoryCards__nextWord">
            {currentIndex < words.length - 1 && (
              <RiArrowRightSLine color="grey" size={35} onClick={handleNextWord} />
            )}
            </div>
            </div>

            <div className ="langarts__memoryCards__Mic">
            <RiMicLine color={isRecognizing ? "green" : "grey"} size={60} onClick={handleMicClick} />
            </div>
            <div className="langarts__memoryCards__userPart">
              <div className="userInput">
                <input id="userInput" type="text" placeholder={matchingWord} value={userInput} onChange={(e) => setUserInput(e.target.value)} />
              </div>
              <div className="submitIcon">
                <RiCheckboxCircleLine color="grey" size={30} onClick={() => handleSubmitAnswer()} />
              </div>
              
            </div>
            <div className="langarts__memoryCards__count">{currentIndex + 1} of {words.length}</div>
            {showCorrectMessage && (
                <div className="correctIcon">
                  <RiCheckboxCircleLine color="green" size={200} />
                </div>
              )}
              
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MemoryCards;