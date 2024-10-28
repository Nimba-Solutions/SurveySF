@echo off

cd survey-library
echo -----------------------------------------
echo INSTALLING survey-library DEPENDENCIES...
echo -----------------------------------------
call npm i
echo BUILDING survey-library SOURCES...
call npm run build_core
call npm run build_i18n
call npm run build_js_ui

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
echo -----------------------------------------
echo BUILDING survey-creator-core SOURCES...
echo -----------------------------------------
call npm run build

cd ../survey-creator-js
echo -----------------------------------------
echo INSTALLING survey-creator-js DEPENDENCIES...
echo -----------------------------------------
call npm i
echo -----------------------------------------
echo BUILDING survey-creator-js...
echo -----------------------------------------
call npm run build
echo -----------------------------------------
echo Starting development server...
echo -----------------------------------------
call npm run watch:dev
call npm run start

pause