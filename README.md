# DocAI

DocAI is a comprehensive solution designed to streamline the documentation process in medical consultations. Our platform consists of a mobile application developed with Flutter and a web application built using React JS. Leveraging advanced Machine Learning (ML) technologies, DocAI automates the generation of SOAP notes from doctor-patient consultations, enhancing efficiency and accuracy in medical record-keeping.

## Features

- *Mobile App*: Allows users to record the entire consultation between a doctor and a patient. Developed with Flutter, our mobile app is designed for both Android and iOS devices, offering a seamless and intuitive user experience.

- *Web App*: Built using React JS, the web app interfaces with the MongoDB cloud to fetch the consultation transcripts recorded by the mobile app. It serves as a dashboard for managing and reviewing consultation records.

- *ML Model Integration*: Our proprietary ML model processes the consultation transcripts to generate SOAP notes automatically. These notes can be reviewed and edited through the web app, ensuring that the medical records are accurate and comprehensive.

- *Cloud Storage*: All data, including recorded consultations and generated SOAP notes, are securely stored in the MongoDB cloud, ensuring data integrity and confidentiality.

## Getting Started

### Prerequisites

- For the mobile app:
  - Flutter installed on your development machine
  - Android Studio or Xcode for mobile app emulation

- For the web app:
  - Node.js and npm installed
  - MongoDB account for cloud storage

### Installation

1. *Mobile App*:
   - Clone the repository and navigate to the mobile app directory
   - Run flutter pub get to install dependencies
   - Start the emulator and run flutter run to launch the app

2. *Web App*:
   - Clone the repository and navigate to the web app directory
   - Run npm install to install dependencies
   - Run npm start to launch the web app on your local server

### Usage

1. *Recording Consultations*:
   - Open the mobile app and start a new consultation recording. Once completed, the recording will be automatically uploaded to the MongoDB cloud.

2. *Generating SOAP Notes*:
   - Access the web app dashboard to view the list of recorded consultations.
   - Select a consultation to generate the SOAP note by passing the transcript to the ML model's API.
   - Review and edit the generated SOAP note as needed.

## Contributing

We welcome contributions to DocAI! If you have suggestions for improvements or bug fixes, please feel free to fork the repository and submit a pull request.

## License

DocAI is open-source software.

## Contact

For any questions or feedback, please contact us at docai@gmail.com.
