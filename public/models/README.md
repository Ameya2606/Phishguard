# BERT Models Directory

This directory contains the fine-tuned BERT model for URL phishing detection.

## Required Files

### `url_classifier.onnx`
- **Purpose**: Fine-tuned deep learning model for URL phishing detection
- **Size**: ~1-5 MB (depending on architecture)
- **Format**: ONNX (Open Neural Network Exchange)
- **Trained on**: 129,700 URL samples from cybersecurity dataset
- **Features**: Analyzes 111 structural URL features

## How to Generate the Model

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements_training.txt
   ```

2. **Run the training script**:
   ```bash
   python train_url_model.py
   ```

3. **Copy the generated file**:
   ```bash
   copy url_classifier.onnx public\models\
   ```

## Model Performance

After training, you should see:
- **Accuracy**: ~95%+ on test set
- **Precision**: High (low false positives)
- **Recall**: High (catches most phishing URLs)
- **F1 Score**: Balanced performance

## Message Analysis

Message analysis uses pre-trained BERT models from Hugging Face that are automatically downloaded on first use:
- `Xenova/distilbert-base-uncased-mnli` - Zero-shot classification
- `Xenova/distilbert-base-uncased-finetuned-sst-2-english` - Sentiment analysis

These models are cached by the browser after first download (~60-130 MB total).

## Privacy Note

All models run **entirely in the browser**. No data is sent to external servers.
