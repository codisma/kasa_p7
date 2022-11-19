import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Card from "../components/Cards";
import Footer from "../components/Footer";

const Home = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    const getData = () => {
        fetch("logements.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then(function (response) {
                console.log(response);
                return response.json();
            })

            .then(function (data) {
                console.log(data);
                setData(data);
            })
            .catch(function (error) {
                console.log(error);
                setError(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    if (error) {
        return <p>Oups, il y a eu un problème.</p>;
    }

    return (
        <div>
            <Header />
            <main>
                <Banner />
                <section className="logements">
                    {data.map((logements, index) => (
                        <Link key={index} to={`logements/${logements.id}`}>
                            <Card key={index} logements={logements} />
                        </Link>
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;