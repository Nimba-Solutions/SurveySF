#!/bin/bash

cd ../surveyjs/survey-library
echo "-----------------------------------------"
echo "INSTALLING survey-library DEPENDENCIES..."
echo "-----------------------------------------"
npm i

cd ../survey-creator
echo "-----------------------------------------"
echo "INSTALLING survey-creator DEPENDENCIES..."
echo "-----------------------------------------"
npm i

cd packages/survey-creator-core
echo "-----------------------------------------"
echo "INSTALLING survey-creator-core DEPENDENCIES..."
echo "-----------------------------------------"
npm i

cd ../survey-creator-js
echo "-----------------------------------------"
echo "INSTALLING survey-creator-js DEPENDENCIES..."
echo "-----------------------------------------"
npm i

echo "-----------------------------------------"
echo "All dependencies installed"
echo "-----------------------------------------"

# Wait for user input
read -p "Press Enter to continue..." 