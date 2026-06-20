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

## Requirements

This repository does not currently include a `requirements.txt`, so install dependencies manually based on the app you want to run.

Common packages used across the project include:

- `fastapi`
- `flask`
- `uvicorn`
- `tensorflow`
- `numpy`
- `pandas`
- `scikit-learn`
- `joblib`
- `pillow`
- `flask-cors`
- `python-dotenv`
- `langchain`
- `langchain-openai`
- `langchain-community`

## Environment Variables

The chatbot and LLM-based APIs expect these variables:

- `GROQ_API_KEY`
- `TAVILY_API_KEY`

Create a local `.env` file if you want to run `app_chatbot.py` or the LLM-enhanced FastAPI variant in `app_test.py`.

## Running the APIs

### 0. Frontend app

Run the frontend from the `frontend/` folder:

```bash
cd frontend
npm install
npm run dev
```

The app runs with Vite and uses the backend APIs for prediction and assistant features.

### 1. Image prediction API with FastAPI

Run:

```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

Open `http://localhost:8000/` and upload a sugarcane leaf image.

### 2. Crop forecasting API with Flask

Run:

```bash
python app2.py
```

Open `http://localhost:5000/` and upload a CSV file with sensor and growth-stage columns.

### 3. Chatbot API with Flask

Run:

```bash
python app_chatbot.py
```

This starts the advisor API on port `5000`.

### 4. LLM-enhanced FastAPI image API

Run:

```bash
uvicorn app_test:app --host 0.0.0.0 --port 8000 --reload
```

## Data and Model Notes

- The image APIs expect images resized to `224 x 224`.
- The forecasting API expects CSV data with the columns used in `app2.py`.
- The chatbot API currently references `src.image_model.image_model_pipeline`, but that module is not present in this clone. Restore it before running `app_chatbot.py`.

## Example Workflow

1. Start the API you want to test.
2. Upload a sample image or CSV file.
3. Read the returned disease class, confidence score, or forecast summary.
4. Use the chatbot API if you want a natural-language treatment recommendation.

## Suggested Next Steps

- Add a `requirements.txt` so the project can be installed in one command.
- Consolidate the duplicate APIs into a single documented backend.
- Add sample request payloads and response examples to this README.
- Restore or document the missing `src/image_model.py` dependency used by `app_chatbot.py`.