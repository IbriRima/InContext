#!/bin/bash

echo "Setting up Python environment for YouTube transcription..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install numpy first with correct version
echo "Installing numpy with compatible version..."
pip install "numpy<2.0.0"

# Install other requirements
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Setup complete! To start the server, run:"
echo "source venv/bin/activate"
echo "python ai_server.py" 