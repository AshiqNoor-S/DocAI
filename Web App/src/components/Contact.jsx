import React from 'react';
import ashiq from "../ashiq.jpg";
import ishita from "../ishita.jpg";
import mathew from "../mathew.jpg";
import jeshma from "../jeshma.jpg";
import NavBar from './NavBar';

function Contact() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <NavBar/>
            <div className="py-8 mt-5 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Team</h2>
                    <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">The team behind this project</p>
                </div> 
                <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                    {/* Team member 1 */}
                    <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                        <img className="w-58 h-58 sm:rounded-none sm:rounded-l-lg" src={ashiq} alt="Ashiq Noor" />
                        </a>
                        <div className="p-5">
                            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                <a href="#">Ashiq Noor Sudheer</a>
                            </h3>
                            <span className="text-gray-500 dark:text-gray-400">(i) Web Development <br /> (ii) Machine Learning</span>
                            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">B.Tech, VIT</p>

                        </div>
                    </div>
                    {/* Team member 2 */}
                    <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="w-58 h-58 sm:rounded-none sm:rounded-l-lg" src={mathew} alt="Mathew" />
                        </a>
                        <div className="p-5">
                            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                <a href="#">Mathew Thomas</a>
                            </h3>
                            <span className="text-gray-500 dark:text-gray-400">(i) App Development <br/> (ii) Machine Learning</span>
                            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">B.Tech, VIT</p>
                        </div>
                    </div>
                    {/* Team member 3 */}
                    <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="w-62 h-62 sm:rounded-none sm:rounded-l-lg" src={ishita} alt="Ishita" />
                        </a>
                        <div className="p-5">
                            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                <a href="#">Ishita Agarwal</a>
                            </h3>
                            <span className="text-gray-500 dark:text-gray-400">(i)Machine Learning <br/> (ii)Data Structures</span>
                            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">B.Tech, VIT</p>
                        </div>
                    </div>
                    {/* Team member 4 */}
                    <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="w-68 h-62 rounded-lg sm:rounded-none sm:rounded-l-lg" src={jeshma} alt="Jeshma" />
                        </a>
                        <div className="p-5">
                            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                <a href="#">Jeshma Ullas</a>
                            </h3>
                            <span className="text-gray-500 dark:text-gray-400">(i) Machine Learning <br/> (ii) Data Analytics</span>
                            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">B.Tech, VIT</p>
                        </div>
                    </div>
                </div>  
            </div>
        </section>
    );
}

export default Contact;
