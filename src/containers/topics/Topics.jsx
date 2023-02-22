import React from 'react';
import './topics.css';
import Feature from "C:/Users/Vlad/Desktop/langarts/src/components/feature/Feature.jsx";

const Topics = () => {
  const sportsItems = ['football', 'hokkey', 'baseball'];
  const musicItems = ['Composers', 'Rock history', 'My favourite music'];
  const hobbyItems = ['Reading', 'Cycling', 'Yoga'];
  const attactionsItems = ['cinima', 'cafee', 'bars'];
  const countriesItems = ['Italy', 'Norway', 'Irland'];
  const professionItems = ['IT', 'Analitics', 'Developer'];

  return (
    <div>
      <div className="langarts__topics section__padding gradient__bg" id="topics">
        <div className="langarts__topics-heading">
          <h1 className="gradient__text">Choose the topic/situation you want to be ready for:</h1>
          <p>Create your own topic</p>
        </div>
        <div className="langarts__topics__topics">
          <Feature title="Sports" items={sportsItems} />
          <Feature title="Music" items={musicItems} />
          <Feature title="Hobby" items={hobbyItems} />
          <Feature title="Attractions" items={attactionsItems} />
          <Feature title="Countries" items={countriesItems} />
          <Feature title="Profession" items={professionItems} />
        </div>
      </div>
    </div>
  );
};

export default Topics;