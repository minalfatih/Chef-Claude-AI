import React from 'react';
import chef from '../assets/images/chef.jpg'

export default function Hero(props) {
  return (
    <section className="landing-page">
      <div className='info'>
        <h1>Inspiration Starts in Your Kitchen</h1>
        <p>Chef Cluade inspires you to create delicious meals using simple ingredients you already have.
          Turn everyday items into something special and enjoy cooking in a whole new way.
        </p>
        <button onClick={props.onStart}>Start</button>
      </div>

      <div className="image">
        <img src={chef} alt="chef img" />
      </div>
    </section>
  )
}