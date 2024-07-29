import React, { useState } from "react";
import Accordion from "../Accordion/Accordion";

const Faqs = ({content}) => {
    
    const [activeIndex, setActiveIndex] = useState(null);
    
    const onAccordionClick = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <>
        <div className="accordion">
            {content.map((faq, index) => (
                <Accordion
                    key={index}
                    title={faq.title}
                    content={faq.description}
                    index={index}
                    activeIndex={activeIndex}
                    onAccordionClick={onAccordionClick}
                />
            ))}
        </div>
        </>
    );
    
};

export default Faqs;
