import React, { useState } from "react";
import "./langSwitch.css";
import swap from "../../assets/swap.png";
import Vocabulary from "../vocabulary/Vocabulary";

const LangSwitch = () => {
  const [selectedValue1, setSelectedValue1] = useState("russian");
  const [selectedValue2, setSelectedValue2] = useState("polish");
  const [showVocabulary, setShowVocabulary] = useState(false);

  const handleSwap = () => {
    const temp = selectedValue1;
    setSelectedValue1(selectedValue2);
    setSelectedValue2(temp);
  };

  return (
    <div className="langarts__langSwitch section__margin">
      <div className="langarts__option1">
        <select
          className="langarts__option1-select"
          id="language1"
          value={selectedValue1}
          onChange={(e) => setSelectedValue1(e.target.value)}
        >
          <option value="russian">russian</option>
          <option value="polish">polish</option>
        </select>
      </div>
      <div className="langarts__changebutton">
        <button type="button" onClick={handleSwap}>
          <img src={swap} alt="swap" />
        </button>
      </div>
      <div className="langarts__option3">
        <select
          className="langarts__option3-select"
          id="language2"
          value={selectedValue2}
          onChange={(e) => setSelectedValue2(e.target.value)}
        >
          <option value="polish">polish</option>
          <option value="russian">russian</option>
        </select>
      </div>
      <button onClick={() => setShowVocabulary(true)}>show Vocabulary</button>
      <Vocabulary showVocabulary={showVocabulary} setShowVocabulary={setShowVocabulary} language={selectedValue1} />
    </div>
  );
};

export default LangSwitch;