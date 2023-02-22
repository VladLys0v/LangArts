import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Feature = ({ title, items }) => {
  const [showList, setShowList] = useState(false);

  const handleFeatureClick = () => {
    setShowList(!showList);
  };

  return (
    <div>
      <div className="feature" onClick={handleFeatureClick}>
        <h2>{title}</h2>
        {showList && <FontAwesomeIcon icon={faCaretUp} />}
        {!showList && <FontAwesomeIcon icon={faCaretDown} />}
      </div>
      {showList && (
        <ul className="feature-list">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Feature;