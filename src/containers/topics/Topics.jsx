import React from 'react';
import { useRef, useState, useEffect } from 'react';
import './topics.css';
import Feature from "../../components/feature/Feature.jsx";
import { RiCloseFill} from 'react-icons/ri';

const Topics = () => {
  const sportsItems = ['football', 'hokkey', 'baseball'];
  const musicItems = ['Composers', 'Rock history', 'My favourite music'];
  const hobbyItems = ['Reading', 'Cycling', 'Yoga'];
  const attactionsItems = ['cinima', 'cafee', 'bars'];
  const countriesItems = ['Italy', 'Norway', 'Irland'];
  const professionItems = ['IT', 'Analitics', 'Developer'];

  const scrollContainerRef = useRef(null);
  const [additionalItems, setAdditionalItems] = useState([]);

  const handleAddFeatureItem = () => {
    const newItem = prompt("Enter the name of the topic:");
    if (newItem) {
      const newItemObj = { id: Date.now(), name: newItem };
      setAdditionalItems((prevItems) => [...prevItems, newItemObj]);
    }
  };

  const handleDeleteFeatureItem = (itemId) => {
    setAdditionalItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    localStorage.setItem(
      'additionalItems',
      JSON.stringify(additionalItems.filter((item) => item.id !== itemId))
    );
  };

  useEffect(() => {
    const storedItems = localStorage.getItem('additionalItems');
    if (storedItems) {
      setAdditionalItems(JSON.parse(storedItems));
    }
  }, []);

  // Update additional items in localStorage when they change
  useEffect(() => {
    localStorage.setItem('additionalItems', JSON.stringify(additionalItems));
  }, [additionalItems]);

  const scrollLeft = () => {
    const scrollContainerItems = scrollContainerRef.current;
    const scrollAmount = scrollContainerItems.offsetWidth * 0.3; // Adjust this value as needed
  
    scrollContainerItems.scrollTo({
      left: scrollContainerItems.scrollLeft - scrollAmount,
      behavior: 'smooth',
    });
  };
  
  const scrollRight = () => {
    const scrollContainerItems = scrollContainerRef.current;
    const scrollAmount = scrollContainerItems.offsetWidth * 0.3 + (additionalItems.length * 100); // Adjust this value as needed
  
    scrollContainerItems.scrollTo({
      left: scrollContainerItems.scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };


  return (
      <div className="langarts__topics gradient__bg">
        <div className="langarts__topics-heading">
          <h1 className="gradient__text">Topics:</h1>
            <div className="plus-icon"onClick={handleAddFeatureItem} ></div>
        </div>
          <div className="langarts__topics-content">
          <div className="langarts__topics-content-scroll-left" onClick={scrollLeft}>
              <div className="arrow-top" ></div>
              <div className="arrow-bottom"></div>
          </div>
          <div className="langarts__topics-content-scroll">          
              <div className="langarts__topics-content-scroll-items" ref={scrollContainerRef}>
                <Feature title="Sports" items={sportsItems} />
                <Feature title="Music" items={musicItems} />
                <Feature title="Hobby" items={hobbyItems} />
                <Feature title="Attractions" items={attactionsItems} />
                <Feature title="Countries" items={countriesItems} />
                <Feature title="Profession" items={professionItems} />
                {additionalItems.map((item) => (
  <div key={item.id} className="additional-item">
    <Feature title={item.name} items={[]} />
    <div className="delete-icon" >
      <RiCloseFill color='grey' size={30} onClick={() => handleDeleteFeatureItem(item.id)} />
    </div>
  </div>
))}
              </div>            
          </div>
          <div className="langarts__topics-content-scroll-right" onClick={scrollRight}>                                       
              <div className="arrow-top" ></div>
              <div className="arrow-bottom"></div>
          </div>
          </div>
      </div>
  );
};

export default Topics;