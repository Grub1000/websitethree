#!/bin/bash

echo "Starting deployment..."

echo "Moving to project directory..."
cd /website-folder/src/websitethree || exit

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