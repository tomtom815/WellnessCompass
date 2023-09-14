import React from 'react';
import {Link} from 'react-router-dom';
import '../index.css';

const Public = () => {
    const content = (
        <section>
            <header>
                <h1>Welcome to Wellness Compass</h1>
            </header>
            <main>
                <p>We make following your health and fitness goals easy</p>
                <button class="home-buttons"><a href="/Register">Register</a></button>
                <button class="home-buttons"><a href="/Login">Sign In</a></button>
            </main>
        </section>
    );
    return content;
}
export default Public;