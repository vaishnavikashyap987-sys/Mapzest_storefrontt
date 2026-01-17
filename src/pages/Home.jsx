import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Showcase from '../components/Showcase';
import Services from '../components/Services';
import VelocityScroll from '../components/VelocityScroll';
import FeaturesSticky from '../components/FeaturesSticky';

const Home = () => {
    return (
        <main className="relative">
            <Hero />
            <div className="relative z-10">
                <VelocityScroll />
                <About />
                <FeaturesSticky />
                <Showcase />
                <Services />
            </div>
        </main>
    );
};

export default Home;
