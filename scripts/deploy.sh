#!/bin/bash

echo "Starting deployment..."

# Stop if any command fails
set -e

echo "Pulling latest code..."
git pull origin main

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Running database migrations..."
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Restarting Apache..."
sudo systemctl restart apache2

echo "Deployment complete!"