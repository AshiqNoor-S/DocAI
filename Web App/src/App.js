import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './components/Home';
import Services from './components/Services';
import Footer from './components/Footer';
import Instructions from './components/Instructions';
import Generator from './components/Generator';
import Popup from './components/Popup';
import Contact from './components/Contact';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color={'#36D7B7'} loading={isLoading} css={override} size={150} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        {/* Define your Routes within the Routes component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/error" element = {<Popup/>} />
          <Route path="/services" element={<Services />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/soap-note-generator" element={isAuthenticated ? <Generator/> : <Navigate to="/"/>} />
          {/* Redirects and Not Found handling can be added here */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;