import React from 'react';
import swap from "../../assets/swap.png";
import "./langSwitch.css";

const LangSwitch = ({ selectedValue1, setSelectedValue1, selectedValue2, setSelectedValue2, onSwap, onSelectValue1, onSelectValue2 }) => {
    return (
    <div className="langarts__langSwitch section__margin">
      <div className="langarts__option1">
        <select
          className="langarts__option1-select"
          id="language1"
          value={selectedValue1}
          onChange={(e) => setSelectedValue1(e.target.value)}>
          <option value="russian">russian</option>
          <option value="polish">polish</option>
        </select>
      </div>

      <div className="langarts__changebutton">
        <button type="button" onClick={onSwap}>
          <img src={swap} alt="swap" />
        </button>
      </div>

      <div className="langarts__option3">
        <select
          className="langarts__option3-select"
          id="language2"
          value={selectedValue2}
          onChange={(e) => setSelectedValue2(e.target.value)}>
          <option value="polish">polish</option>
          <option value="russian">russian</option>
        </select>
      </div>
    </div>
    )
}
export default LangSwitch;