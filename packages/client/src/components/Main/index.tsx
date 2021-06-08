import React from 'react';
import Navbar from '../Navbar';
import About from './About';
import Introduction from './Introduction';

export default function Main() {
  return (
    <React.Fragment>
      <Navbar />
      <Introduction />
      <About />
    </React.Fragment>
  );
}
