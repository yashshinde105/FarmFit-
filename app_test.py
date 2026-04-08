from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tensorflow as tf
import numpy as np
from PIL import Image
from tensorflow.keras import models, layers, applications
import os
from langchain.messages import HumanMessage
from dotenv import load_dotenv

# LangChain imports
from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain.agents import create_agent
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage
from langchain_core.messages import HumanMessage, SystemMessage

# -----------------------------
# Load ENV
# -----------------------------
load_dotenv()

# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Load Model
# -----------------------------
base = applications.EfficientNetB0(
    include_top=False,
    weights='imagenet',
    input_shape=(224, 224, 3),
    pooling='avg'
)

inputs = layers.Input(shape=(224, 224, 3))
x = base(inputs, training=False)
x = layers.Dropout(0.3)(x)
x = layers.Dense(256, activation='relu')(x)
x = layers.BatchNormalization()(x)
outputs = layers.Dense(6, activation='softmax')(x)

model = models.Model(inputs, outputs)

# Load weights
model.load_weights("dominator.h5")

# -----------------------------
# Labels
# -----------------------------
label_dict = {
    0: 'BacterialBlights',
    1: 'Healthy',
    2: 'Mosaic',
    3: 'RedRot',
    4: 'Rust',
    5: 'Yellow'
}

# -----------------------------
# LLM + Tools Setup
# -----------------------------
llm = ChatOpenAI(
    model="openai/gpt-oss-20b",
    base_url="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
)

search_engine = TavilySearchResults(
    api_key=os.getenv("TAVILY_API_KEY"),
    num_results=3
)

tools = [search_engine]

# -----------------------------
# Agent Setup (Fixed)
# -----------------------------
agent = create_agent(
            model=llm,
            tools=tools,
            system_prompt="""You are an expert agricultural assistant specializing in sugarcane crop diseases.

            Given an image or prediction of a sugarcane leaf disease, generate a clear and structured response with the following:

            1. Disease Summary (7 concise bullet points explaining the condition)
            2. Disease Names : {diseases}
            3. Causes of the Disease (environmental, fungal, bacterial, or viral factors)
            4. Symptoms Observed (visible signs on the leaf)
            5. Severity Level (Low / Moderate / High with justification)
            6. Solutions to Control and Prevent Spread:
            - Organic methods
            - Chemical treatments (if necessary)
            - Farming practices (crop rotation, irrigation control, etc.)
            7. Expected Results After Treatment:
            - Short-term improvements
            - Long-term recovery outcomes

            Guidelines:
            - Keep the explanation simple and farmer-friendly.
            - Avoid technical jargon unless necessary (explain if used).
            - Ensure solutions are practical and actionable.
            - If the disease is uncertain, provide the most probable conditions and mention uncertainty.
            - Prioritize eco-friendly and cost-effective treatments.
            - The output should be of 7 points only .

            Output Format:
            Use clear headings and bullet points for readability.
            """
                    )                           

# -----------------------------
# Home Route
# -----------------------------
@app.get("/", response_class=HTMLResponse)
async def home():
    return """
    <html>
        <body>
            <h2>Upload Sugarcane Leaf Image</h2>
            <form action="/predict" enctype="multipart/form-data" method="post">
                <input name="file" type="file">
                <input type="submit">
            </form>
        </body>
    </html>
    """

# -----------------------------
# Prediction Route
# -----------------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if not file.filename.lower().endswith((".jpg", ".jpeg", ".png")):
        raise HTTPException(status_code=400, detail="Upload JPG/PNG only")

    try:
        # -----------------------------
        # Image Processing
        # -----------------------------
        img = Image.open(file.file).convert("RGB")
        img = img.resize((224, 224))
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)

        # -----------------------------
        # Prediction
        # -----------------------------
        pred = model.predict(img_array)
        pred_sorted = pred.argsort(axis=1)
        top3_indices = pred_sorted[0, -1:-4:-1]
        top_labels = [label_dict[i] for i in top3_indices]

        # -----------------------------
        # LLM Response (Fixed)
        # -----------------------------
        input_labels = ", ".join(top_labels)
        chemicals = "0.002 ppm"

        
        

        response_llm = agent.invoke({
            "messages":[HumanMessage(content=f"""Diseases: {input_labels}
        """)
        ]
        })
        solution_text = response_llm['messages'][1].content
        solution_text = solution_text.replace("\n", " ").strip()

    

        # -----------------------------
        # Final Response
        # -----------------------------
        if top_labels[0] == "Healthy":
            return {
                "Status": "Healthy",
                "message": f"The leaf is {top_labels[0]}",
                "solutions": solution_text,
                "confidence": f"{np.max(pred)*100:.2f}%"
            }

        else:
            return {
                "Status": "Infected",
                "message": f"Infected with {top_labels[0]} and {top_labels[1]}",
                "solutions": solution_text,
                "confidence": f"{np.max(pred)*100:.2f}%"
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# Run Server
# -----------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)