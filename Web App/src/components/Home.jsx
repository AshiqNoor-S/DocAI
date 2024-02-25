import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function Navbar() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav class="bg-white dark:bg-gray-900 fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo"/>
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DocAI</span>
        </a>

        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/instructions" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Instructions</a>
            </li>
            <li>
              <a href="/services" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
            <li>
              <a href="/contact" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Team</a>
            </li>
            <li>
              {isAuthenticated ? (
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  {user && (
                    <div class="flex items-center mr-3">
                    <img src={user.picture} alt={user.name} class="w-9 h-9 rounded-full mr-4"/>
                    <span className='text-white'>{user.name}</span>
                    </div>
                  )}
                  <button onClick={() => logout({ returnTo: window.location.origin })} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                </div>
              ) : (
                <button onClick={() => loginWithRedirect()} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


function Home() {

  return (
    <div>
      <Navbar />
      <div className="pt-24 pb-24 bg-gray-900 text-white flex flex-col md:flex-row w-full justify-center items-center">
        <div className='md:w-1/2 px-6 py-8'>
          <h1 className="text-5xl font-bold p-8">Welcome to DocAI</h1>
          <p className="text-xl p-8">We are at the forefront of transforming healthcare consultations through advanced <i>artificial intelligence</i>. Our state-of-the-art web and mobile applications are designed to empower healthcare professionals, enabling them to record, store, and access consultation sessions with unparalleled ease and efficiency. Our mission is to enhance the quality of patient care by making medical consultations more accessible, informative, and secure.</p>
          <div classNem="flex flex-col md:flex-row w-full">
            <h4 className='pl-8 font-bold text-2xl'>Services that we  offer include:</h4>
            <ul className="flex flex-row pl-8">
              <li className="bg-blue-200 rounded-lg p-2 mr-4 mt-5 text-black font-bold">SOAP Note Generation</li>
              <li className="bg-blue-200 rounded-lg p-2 mr-4 mt-5 text-black font-bold">Transcript Generation</li>
              <li className="bg-blue-200 rounded-lg p-2 mr-4 mt-5 text-black font-bold">Patient Record Database</li>
            </ul>
          </div>
          <p className="text-2xl p-8">
            <a href="/services" className="text-blue-700 hover:underline">Learn more</a>
          </p>

          <Link to="/soap-note-generator">
            <button 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-center ml-8"
            >
                Start Generating Soap Note
            </button>
        </Link>

    
        </div>
        <div className="flex justify-center items-center">
          <img src="https://revmaxx.co/wp-content/uploads/2024/02/SOAP-note-generator.jpg" alt="Illustration" className="w-3/4 h-2/4 rounded"/>
        </div> 
     
      </div>
      
    </div>
  );
}

export default Home;
