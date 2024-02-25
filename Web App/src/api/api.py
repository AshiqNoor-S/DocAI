from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fpdf import FPDF
import random
import re
from datetime import datetime
import google.generativeai as genai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
# # Define a simple test route
# @app.get('/')
# async def read_root():
#     return {"message": "Hello, world!"}

GOOGLE_API_KEY = "AIzaSyAt9mpLEfwKCro5h2OLMaFRKeC3CYv3vMI"  
genai.configure(api_key=GOOGLE_API_KEY)
modelAI = genai.GenerativeModel('gemini-pro')


class TranscriptRequest(BaseModel):
    transcription_text: str


class PDFsoap(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, 'SOAP Note', 0, 1, 'C')

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

    def add_transcript(self, transcript):
        self.add_page()
        self.set_left_margin(10)
        self.set_right_margin(10)
        self.set_font('Arial', '', 12)

        for line in transcript.split('\n'):
            self.multi_cell(0, 10, line)


def generate_soap_note(transcription_text):

    response = modelAI.generate_content("""You are a highly skilled professional specialized in creating detailed SOAP notes for electronic medical records. Using the information provided below, generate a well-structured, professional SOAP note suitable for inclusion in a patient's medical record:
        Don't mention confidential details like the patient name, MRN and other details. Just include the Subjective, objective, assessment and plan in the soap note. 
        Maintain patient confidentiality and avoid including any personally identifiable information. Use clear and concise language, and structure the note using the following headings:
        Subjective : Describe the patient's complaints and symptoms expressed during the conversation. Include details such as the onset of symptoms, their duration, intensity, and any factors that alleviate or exacerbate them.
        Objective : Include objective, measurable findings from the physical examination, vital signs, and any relevant diagnostic tests or imaging results discussed in the conversation. Include any past medications taken or treatments taken earlier.
        Assessment : Provide a concise assessment based on the subjective and objective information. This should include a diagnosis or a differential diagnosis list that outlines possible causes for the patient's condition.
        Plan : Outline the treatment plan, including any medications prescribed, therapies initiated, lifestyle modifications advised, and any referrals to specialists. Also, include recommendations for follow-up appointments or additional tests that may be required.
        Ensure the SOAP note is comprehensive, well-organized, and professional, suitable for inclusion in a patient's medical record. Remember to maintain patient confidentiality and avoid including any personally identifiable information. Also make sure not to add any additional made up information as its is crucial that the document made must be original to the conversation.""" + transcription_text)
    api_output = response.parts[0].text
    formatted_text = re.sub(r'\(.*?\)', '', api_output)
    formatted_text = re.sub(r'\n\s*\*\s', '\n', formatted_text)
    formatted_text = re.sub(r'\n\s*\*\s', '\n', formatted_text)
    return formatted_text

@app.get('/')
async def get_transcript():
    return {"message": "Provide the transcript in the response"}

@app.post('/submit_transcript/')
async def submit_transcript(transcript_request: TranscriptRequest):
    global transcript_text
    transcript_text = transcript_request.transcription_text
    return {"message": "Transcript submitted successfully"}

@app.post('/generate_soap_note/')
async def generate_soap_note_api(transcript_request: TranscriptRequest):
    try:
        transcription_text = transcript_request.transcription_text

        # Generate SOAP note
        formatted_text = generate_soap_note(transcription_text)

        # Create PDF from SOAP note
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        pdf_filename = f"SOAP_Note_{timestamp}.pdf"
        
        pdf = PDFsoap()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.multi_cell(0, 10, formatted_text)
        pdf.output(pdf_filename)
        return {"message": "SOAP note generated successfully", "file_path": pdf_filename, "soap_note":formatted_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)