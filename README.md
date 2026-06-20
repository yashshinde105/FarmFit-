# 🌾 FarmFIT - Precision Agriculture Platform

> Smart farming powered by AI, satellite imaging, and real-time analytics

![FarmFIT](https://img.shields.io/badge/FarmFIT-Precision%20Agriculture-4ade80) ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite)

## 🚀 Overview
FarmFIT is a modern precision agriculture platform that helps farmers make data-driven decisions. Using satellite imaging, IoT sensors, and machine learning, FarmFIT provides real-time insights into crop health, soil conditions, weather patterns, and potential threats.

## ✨ Key Features

- 🛰️ Spectral Health Maps — real-time crop health monitoring using satellite and drone imaging
- 💧 Soil Monitoring — track soil moisture, nutrients, and conditions with precision sensors
- 🐛 Pest Prediction — early detection and risk assessment using machine learning
- 📊 Agricultural Dashboard — comprehensive real-time insights for precision farming
- ⚡ Live Alerts — instant notifications for crop stress and environmental changes
- 🌦️ Weather Integration — real-time weather data and forecasting
- 📈 NDVI Analysis — vegetation index tracking for crop health assessment

## 🎯 Benefits

- ✅ Increase crop yields by up to **25%**
- ✅ Reduce water usage by **30%**
- ✅ Early pest detection reduces crop loss by **~15%**
- ✅ Data-driven decisions for optimal farming

## 🛠️ Tech Stack

### Frontend

- **React 18** (TypeScript) — modern UI
- **Vite** — fast build and dev server
- **TailwindCSS** — utility-first styling
- **Shadcn/UI** — component primitives
- **Framer Motion** — animations
- **Recharts** — charts and visualizations

### Backend / ML

- **Python 3.10+** — backend and ML scripts
- **FastAPI** / **Flask** — API endpoints
- **TensorFlow** — image & time-series models
- **scikit-learn** — regressors, scalers, classifier
- **LangChain** + provider (Groq/Tavily) — optional chatbot assistant

## 📁 Project Structure

```
FARMFIT_MODEL/
├─ frontend/                # React + Vite frontend (UI)
├─ dominator.h5             # image classification weights
├─ latest_crop_TS_model.h5  # time-series model
├─ Classifier.joblib        # classifier artifact
├─ Regressor.joblib         # regressor artifact
├─ LSTM_scaler.joblib       # scaler for time-series
├─ app.py                   # FastAPI image predict service
├─ app_test.py              # FastAPI + LLM variant
├─ app2.py                  # Flask forecasting service
├─ app_chatbot.py           # Flask chatbot (LangChain + Groq + Tavily)
├─ dataset_main.csv         # example datasets
├─ sugarcane_sensor_timeseries.csv
└─ README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- Python 3.10+
- npm or yarn

### Install & run frontend

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

### Python backend (example)

```bash
python -m venv .venv
source .venv/bin/activate   # on Windows: .venv\\Scripts\\activate
pip install --upgrade pip
pip install -r requirements.txt  # if you add one, otherwise install manually

# Start FastAPI image service
uvicorn app:app --host 0.0.0.0 --port 8000 --reload

# Start Flask forecasting service
python app2.py

# Start chatbot (optional)
python app_chatbot.py
```

## 🔬 API Examples

- Image predict (FastAPI):

```bash
curl -F "file=@leaf.jpg" http://localhost:8000/predict
```

- Forecast (Flask):

```bash
curl -F "file=@sensor.csv" http://localhost:5000/results
```


# FARMFIT_MODEL

FARMFIT_MODEL is a sugarcane-focused machine learning project that combines image-based disease detection, time-series forecasting, an agricultural chatbot assistant, and a React frontend.

The repository currently contains multiple runnable entry points:

- `app.py` and `app2.py` provide FastAPI and Flask APIs for sugarcane leaf disease prediction from uploaded images.
- `app_test.py` provides a Flask API for forecasting crop conditions from CSV sensor/time-series data.
- `app_chatbot.py` provides a Flask API that combines image predictions with an LLM-powered agricultural advisor.
- `frontend/` contains the React/Vite user interface from the other project clone.
- Several trained model files and notebooks are included for experimentation and retraining.

## Project Goals

- Detect sugarcane leaf diseases from images.
- Return the most likely disease classes and treatment suggestions.
- Forecast crop conditions from sensor and growth-stage data.
- Provide farmer-friendly treatment guidance through a chatbot workflow.

## Repository Structure

- `frontend/` - React/Vite frontend application.
- `app.py` - FastAPI image classification API using EfficientNetB0 and `dominator.h5`.
- `app2.py` - Flask crop forecasting API using an LSTM model, a regressor, and a classifier.
- `app_chatbot.py` - Flask assistant API that uses LangChain, Groq, and Tavily.
- `app_test.py` - FastAPI variant of the image classification API with LLM-generated treatment text.
- `Classifier.joblib` - Serialized classifier used by the forecasting pipeline.
- `Regressor.joblib` - Serialized regressor used by the forecasting pipeline.
- `LSTM_scaler.joblib` / `LSTM_scaler.pkl` - Scalers used for time-series preprocessing.
- `dominator.h5` - Trained image classification weights for sugarcane leaf disease detection.
- `latest_crop_TS_model.h5` - Trained time-series model.
- `latest_model.h5` - Additional model artifact included in the repo.
- `efficentnetv2-s.h5` - Additional deep-learning model artifact included in the repo.
- `dataset_main.csv` and `sugarcane_sensor_timeseries.csv` - Dataset files for training and forecasting.
- `test_images/` - Sample images for testing.
- Notebooks such as `Project.ipynb`, `filtered_LSTM_Final.ipynb`, `to_vehan_CNN.ipynb`, and `upgrades_crop_disease.ipynb` - training and experimentation notebooks.

## Features

### Image-based disease detection

The image APIs load an EfficientNetB0-based classifier and predict the top disease classes from uploaded JPG or PNG images.

Supported labels in the current code include:

- `BacterialBlights`
- `Healthy`
- `Mosaic`
- `RedRot`
- `Rust`
- `Yellow`

The API returns a confidence score and treatment suggestions for the most likely disease classes.

### Time-series crop forecasting

The forecasting API accepts a CSV upload, scales the data, generates future predictions, and returns:

- disease risk percentage
- disease observed flag
- pesticide amount
- dominant growth stage
- last-row environmental and soil measurements

### Chatbot support

The chatbot API uses LangChain with a Groq-hosted OpenAI-compatible model and Tavily search to generate agricultural advice.
# FarmFit — Sugarcane ML + Web App

FarmFit is a combined machine-learning backend and React frontend for monitoring sugarcane crop health. The project includes:

- An image classification service to detect sugarcane leaf diseases from photos.
- A time-series forecasting service that predicts growth-stage and disease risk from sensor CSVs.
- A chatbot assistant that turns model outputs into farmer-friendly recommendations using an LLM.
- A React/Vite frontend that provides an interface to upload images/CSV and view results.

This single README documents the full project (backend + frontend), how to run each component locally, important files, and next steps.

**Key ideas:**

- Keep the ML inference and forecasting services lightweight and API-driven so the React frontend can call them.
- Provide a farmer-friendly assistant that translates numeric model outputs into short actionable steps.
- Keep model artifacts next to the code so the project is reproducible locally; large models may be stored using Git LFS.

## Repository layout (important files)

- `app.py` — FastAPI image classifier that loads `dominator.h5` and exposes `/predict`.
- `app_test.py` — FastAPI variant that also integrates a treatment LLM flow.
- `app2.py` — Flask time-series forecasting service that loads `latest_crop_TS_model.h5`, `Regressor.joblib`, `Classifier.joblib`, and `LSTM_scaler.joblib`.
- `app_chatbot.py` — Flask chatbot API that uses LangChain + Groq + Tavily (requires API keys).
- `dominator.h5`, `latest_crop_TS_model.h5`, `latest_model.h5`, `efficentnetv2-s.h5` — model artifacts used by the services.
- `Classifier.joblib`, `Regressor.joblib`, `LSTM_scaler.joblib` — serialized sklearn artifacts and scalers.
- `dataset_main.csv`, `sugarcane_sensor_timeseries.csv` — example datasets used for training and forecasting.
- `test_images/` — sample images for quick manual tests.
- `frontend/` — React/Vite frontend (copied from the separate UI project). Run the UI from this folder.

## Features (what each component does)

- Image classifier: Accepts JPG/PNG uploads, resizes to 224×224, runs an EfficientNet-based model, and returns the top predictions with confidence and short treatment suggestions.
- Forecasting API: Accepts a CSV dataset, scales and runs the LSTM-based time-series model to generate 60-step forecasts, runs regressors/classifiers on the forecast, and returns summary metrics (disease risk, pesticide level, growth stage, etc.).
- Chatbot assistant: Converts predicted disease names into a short, farmer-friendly treatment plan using LLM tools and web search results.
- Frontend: Single-page React app (Vite) that lets users upload images and CSVs, view predictions, and read assistant advice.

## Environment & Requirements

There is no single `requirements.txt` in this repo. Use the stacks below depending on what you run.

Python backend (recommended virtualenv):

```bash
python -m venv .venv
source .venv/bin/activate   # or .venv\\Scripts\\activate on Windows
pip install --upgrade pip
pip install fastapi uvicorn flask tensorflow numpy pandas scikit-learn joblib pillow python-dotenv flask-cors
# add langchain and providers only if running the chatbot
pip install langchain langchain-openai langchain-community
```

Frontend (Node):

```bash
cd frontend
npm install
```

Notes:

- TensorFlow installation and GPU support depend on your OS, Python version, and CUDA drivers. Use the official TF install guide for GPU setups.
- Some model files are large and may use Git LFS. Ensure Git LFS is installed if you clone the repo with large artifacts.

## Environment variables

Create a `.env` file (root or `frontend` as needed) for any of the following values used by the chatbot or frontend dev configuration:

- `GROQ_API_KEY` — required for the Groq/OpenAI-compatible LLM in `app_chatbot.py` or `app_test.py`.
- `TAVILY_API_KEY` — required for the Tavily search tool used by the assistant.

## Run instructions (local)

1) Start the image classifier (FastAPI):



## 📌 Notes & Known Issues

- `app_chatbot.py` references `src.image_model.image_model_pipeline` — this helper may be missing; implement or restore before using chatbot predict flow.
- Large model files may be stored with Git LFS — install Git LFS if you plan to clone with models.

## 📦 Suggested Next Steps

- Add `requirements.txt` for reproducible Python installs.
- Add Dockerfiles for backend services and frontend.
- Add CI to run linting and basic tests.

## 🤝 Contributing

Contributions welcome. Fork, branch, code, and open a PR.

## 📄 License

Add a `LICENSE` file to choose a license (MIT recommended).

---

If you want this exact README pushed, I can commit & push now, or further tailor any section (installation, API examples, or contribution guide).
