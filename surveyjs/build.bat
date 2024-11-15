@echo off

set ROOT=%~dp0..\
set STATIC_RESOURCES=%ROOT%force-app\main\default\staticresources

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
echo Copying build files to staticresources...
echo -----------------------------------------
xcopy /Y "%~dp0surveyjs\survey-library\build\survey-core\defaultV2.css" "%STATIC_RESOURCES%\"
xcopy /Y "%~dp0surveyjs\survey-library\build\survey-core\survey.core.min.js" "%STATIC_RESOURCES%\"
xcopy /Y "%~dp0surveyjs\survey-creator\packages\survey-creator-core\build\survey-creator-core.css" "%STATIC_RESOURCES%\"
xcopy /Y "%~dp0surveyjs\survey-creator\packages\survey-creator-core\build\survey-creator-core.js" "%STATIC_RESOURCES%\"
xcopy /Y "%~dp0surveyjs\survey-creator\packages\survey-creator-core\build\survey-creator-core.min.js" "%STATIC_RESOURCES%\"
xcopy /Y "%~dp0surveyjs\survey-library\build\survey-js-ui\survey-js-ui.min.js" "%STATIC_RESOURCES%\"

echo -----------------------------------------
echo Build completed and files copied
echo -----------------------------------------
pause