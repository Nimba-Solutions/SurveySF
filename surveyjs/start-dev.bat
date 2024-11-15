@echo off

cd surveyjs/survey-creator/packages/survey-creator-js
echo -----------------------------------------
echo Starting development server...
echo -----------------------------------------

start cmd /k "npm run watch:dev"
start cmd /k "npm run start"

echo -----------------------------------------
echo Dev server starting at http://localhost:8080
echo -----------------------------------------