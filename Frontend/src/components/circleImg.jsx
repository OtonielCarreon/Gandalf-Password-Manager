import React from 'react';
import './Circleimgstyles.css';
import oats from '../images/oats.jpeg';

const CircleImg = (imag) => {
    return (
        <div>
            <img class="circlepfp" src={oats}/*{imag.url}*/ alt="nopfp" />
        </div>
    );
};

export default CircleImg;
