import React from "react";
import "./Accordion.css";

const Accordion = ({ title, content, index, activeIndex, onAccordionClick }) => {
    const isActive = index === activeIndex;
  
    return (
        <div className={`accordion-item`} key={title}>
            <div className={`accordion-title ${isActive ? 'opened' : ''}`} onClick={() => onAccordionClick(index)}>
                <div>{title}</div>
                <div className="plus-minus">{isActive ? "-" : "+"}</div>
            </div>
            {isActive && <div className="accordion-content">{content}</div>}
        </div>
    );
  };

  export default Accordion;