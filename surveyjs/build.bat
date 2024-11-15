@echo off

cd surveyjs/survey-library
echo -----------------------------------------
echo BUILDING survey-library SOURCES...
echo -----------------------------------------
call npm run build_core
call npm run build_i18n
call npm run build_js_ui

cd ../survey-creator/packages/survey-creator-core
echo -----------------------------------------
echo BUILDING survey-creator-core SOURCES...
echo -----------------------------------------
call npm run build

cd ../survey-creator-js
echo -----------------------------------------
echo BUILDING survey-creator-js...
echo -----------------------------------------
call npm run build

echo -----------------------------------------
echo All builds completed
echo -----------------------------------------
pause