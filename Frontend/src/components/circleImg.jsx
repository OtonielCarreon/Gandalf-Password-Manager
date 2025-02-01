import React from 'react';
import './circleimgstyles.css'
import oats from './oats.jpeg'

const CircleImg = (imag) => {
    return (
        <div>
            <img class="circlepfp" src={oats}/*{imag.url}*/ alt="nopfp" />
        </div>
    );
};

export default CircleImg;
