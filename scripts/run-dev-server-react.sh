#!/bin/bash

cd ../surveyjs/survey-library
echo "-----------------------------------------"
echo "INSTALLING survey-library DEPENDENCIES..."
echo "-----------------------------------------"
npm i
echo "BUILDING survey-library SOURCES..."
npm run build_core
npm run build_react
npm run build_react_ui

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
echo "-----------------------------------------"
echo "BUILDING survey-creator-core SOURCES..."
echo "-----------------------------------------"
npm run build

cd ../survey-creator-react
echo "-----------------------------------------"
echo "INSTALLING survey-creator-react DEPENDENCIES..."
echo "-----------------------------------------"
npm i
echo "-----------------------------------------"
echo "STARTING React DEV SERVER..."
echo "-----------------------------------------"
npm run start 