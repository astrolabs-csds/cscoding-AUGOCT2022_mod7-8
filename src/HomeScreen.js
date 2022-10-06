import React from 'react';
import AppBar from './AppBar.js'
import Hero from './Hero.js'
import Features from './Features.js'
import Footer from './Footer.js'

function HomeScreen() {
    return (
        <React.Fragment>
            <AppBar />
            <Hero />
            <Features />
            <Footer />
        </React.Fragment>
    )
}

export default HomeScreen;