import React, { useState } from 'react';
import Nav from "./NavBar";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Popup from "./Popup";

function Instructions() {
    const { isAuthenticated } = useAuth0();
    const [showPopup, setShowPopup] = useState(false);

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    
    return (
        <div className="pt-20 pb-20 bg-gray-900 text-white w-full">
        <Nav/>
        <p className="text-center">How to Use the App</p>
        <h1 className="w-full text-center text-3xl font-bold">Instructions</h1>
        <div className="md:flex-row flex-col md:flex">
            <div className="md:w-1/2 px-6 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold">Step 1</h2>
                <p className="mt-4"><strong>Launching the App</strong> : Begin by opening [App Name] on your mobile device. You'll be greeted by the home screen, where you can navigate to various features offered by the app. Familiarize yourself with the layout to find functionalities easily.<br/><br/>
                <strong>Initiating Transcription</strong> : To start a new transcription, locate and tap on the <i>Start Transcription</i> button. This button is typically positioned prominently on the screen for easy access. Ensure you're in a quiet environment to improve the accuracy of the transcription.<br/><br/>
                <strong>Completing the Recording</strong> : Once you've conveyed all necessary information, press the "Stop" button to halt the recording process. The app will then automatically begin converting your spoken words into written text, creating a detailed transcript of the session.<br/><br/><br/>

                </p>
            </div>
            </div>
            <div className="md:w-1/2 px-6 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold">Step 2</h2>
                <p className="mt-4"><strong>Viewing Transcripts</strong> :
                After you have completed a recording and the app has processed your audio into text, accessing and managing your transcripts is a straightforward and intuitive process designed for efficiency and convenience. <br/><br/>

                <strong>Immediate Accessibility</strong> : Once the transcription process concludes, the app automatically navigates you to a new page where your freshly generated transcript is displayed. This immediate access allows for a seamless transition from recording to review. <br/><br/>

                <strong>Finding Your Transcripts</strong> : All session transcripts are meticulously organized within the app. To access a past transcript, navigate to the "Transcripts" section from the main menu. Here, transcripts are sorted by date, but you can also use the search function to find transcripts by keywords or specific dates.<br/><br/>
                </p>
            </div>
            </div>
            <div className="md:w-1/2 px-6 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold">Step 3</h2>
                <p className="mt-4"><strong>Starting SOAP Note Creation</strong> : Below the transcription, you'll find the "Start Generating SOAP Note" option. Tapping this button initiates the SOAP note creation process, which utilizes the information from your transcript to craft a structured document.<br/><br/>

                <strong>Waiting for the Note</strong> : The generation of a SOAP note is a sophisticated process that requires a short wait. The app analyzes the transcript data, organizing it into the Subjective, Objective, Assessment, and Plan format that medical professionals use.<br/><br/>

                <strong>Downloading the SOAP Note</strong> : Upon completion, a PDF version of the SOAP note will be made available for download. You can preview the note within the app to ensure it meets your requirements before downloading it to your device for future reference or sharing.<br/><br/><br/>
                </p>
            </div>
            </div>
        </div>
        <div className="flex justify-center text-center">

        <Link to="/soap-note-generator">
            {!isAuthenticated ? (
                <>
                    {showPopup && <Popup onClose={handlePopupClose} />}
                    <button 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-center" 
                        onClick={(e) => { 
                            e.preventDefault(); // Prevent default behavior of Link
                            setShowPopup(true);
                        }}
                    >
                        Start Generating Soap Note
                    </button>
                </>
            ) : (
                <button 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-center"
                >
                    Start Generating Soap Note
                </button>
            )}
        </Link>


        </div>
        </div>
        
    );
    }
    
export default Instructions;