import React from 'react';
import { useRef } from 'react';
import './topics.css';
import Feature from "../../components/feature/Feature.jsx";

const Topics = () => {
  const sportsItems = ['football', 'hokkey', 'baseball'];
  const musicItems = ['Composers', 'Rock history', 'My favourite music'];
  const hobbyItems = ['Reading', 'Cycling', 'Yoga'];
  const attactionsItems = ['cinima', 'cafee', 'bars'];
  const countriesItems = ['Italy', 'Norway', 'Irland'];
  const professionItems = ['IT', 'Analitics', 'Developer'];

  const scrollContainerRef = useRef(null);
  const scrollLeft = () => {
    scrollContainerRef.current.style.transform = `translateX(-80px)`;
  };

  const scrollRight = () => {
    scrollContainerRef.current.style.transform = `translateX(80px)`;
  };

  return (
      <div className="langarts__topics gradient__bg" id="topics">
        <div className="langarts__topics-heading">
          <h1 className="gradient__text">Topics:</h1>
            <div class="plus-icon"></div>
        </div>
          <div className="langarts__topics-content">
          <div className="langarts__topics-content-scroll-left" onClick={scrollLeft}>
              <div class="arrow-top" ></div>
              <div class="arrow-bottom"></div>
          </div>
          <div className="langarts__topics-content-scroll">          
              <div className="langarts__topics-content-scroll-items" ref={scrollContainerRef}>
                <Feature title="Sports" items={sportsItems} />
                <Feature title="Music" items={musicItems} />
                <Feature title="Hobby" items={hobbyItems} />
                <Feature title="Attractions" items={attactionsItems} />
                <Feature title="Countries" items={countriesItems} />
                <Feature title="Profession" items={professionItems} />
              </div>            
          </div>
          <div className="langarts__topics-content-scroll-right" onClick={scrollRight}>                                       
              <div class="arrow-top" ></div>
              <div class="arrow-bottom"></div>
          </div>
          </div>
      </div>
  );
};

export default Topics;