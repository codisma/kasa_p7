import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Error from "./Error";
import Tags from "../components/Tags";
import Host from "../components/Host";
import Rating from "../components/Rating";
import Collapse from "../components/Collapse";

const Logements = () => {
    const { id } = useParams();
    const [logements, setLogements] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchLogements = () => {
            fetch("../logements.json", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (acces) {
                    const logements = acces.find((item) => item.id === id);
                    console.log(logements);
                    setLogements(logements);
                    window.scrollTo(0, 0);
                })
                .catch(function (error) {
                    console.log(error);
                    setError(error);
                });
        };

        fetchLogements();
    }, [id]);

    if (error) {
        return <p>Oups, il y a eu un problème.</p>;
    }

    if (logements === undefined) {
        return <Error />;
    }

    if (!logements) {
        return (
            <div className="loading-spinner">
                <div className="loading-spinner__border"></div>
            </div>
        );

    }

    return (
        <div>
            <Header />
            {logements && (
                <main>
                    <Carousel pictures={logements.pictures} />
                    <section className="logements__info">
                        <div className="logements__details">
                            <h1>{logements.title}</h1>
                            <p>{logements.location}</p>
                            <Tags tags={logements.tags} />
                        </div>
                        <div className="logements__notation">
                            <Host host={logements.host} />
                            <Rating rating={logements.rating} />
                        </div>
                    </section>
                    <section className="logements__collapse">
                        <Collapse title="Description" content={logements.description} />
                        <Collapse title="Equipements" content={logements.equipments} />
                    </section>
                </main>
            )}
            <Footer />
        </div>
    );
};

export default Logements;

