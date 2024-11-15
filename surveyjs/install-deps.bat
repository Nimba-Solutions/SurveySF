@echo off

cd surveyjs/survey-library
echo -----------------------------------------
echo INSTALLING survey-library DEPENDENCIES...
echo -----------------------------------------
call npm i

cd ../survey-creator
echo -----------------------------------------
echo INSTALLING survey-creator DEPENDENCIES...
echo -----------------------------------------
call npm i

cd packages/survey-creator-core
echo -----------------------------------------
echo INSTALLING survey-creator-core DEPENDENCIES...
echo -----------------------------------------
call npm i

cd ../survey-creator-js
echo -----------------------------------------
echo INSTALLING survey-creator-js DEPENDENCIES...
echo -----------------------------------------
call npm i

echo -----------------------------------------
echo All dependencies installed
echo -----------------------------------------
pause