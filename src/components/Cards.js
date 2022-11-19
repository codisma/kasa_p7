import React from "react";

const Card = ({ logements }) => {
    return (
        <figure className="card__item">
            <img src={logements.cover} alt={logements.title} />
            <figcaption>{logements.title}</figcaption>
        </figure>
    );
};

export default Card;