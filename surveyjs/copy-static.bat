@echo off

set ROOT=%~dp0..\
set STATIC_RESOURCES=%ROOT%force-app\main\default\staticresources

echo -----------------------------------------
echo Starting file copy to staticresources...
echo Target directory: %STATIC_RESOURCES%
echo -----------------------------------------

echo Copying defaultV2.css...
xcopy /Y /F "%~dp0survey-library\build\survey-core\defaultV2.css" "%STATIC_RESOURCES%\defaultV2.css*" && echo SUCCESS || echo FAILED

echo Copying surveycore.js...
xcopy /Y /F "%~dp0survey-library\build\survey-core\survey.core.min.js" "%STATIC_RESOURCES%\surveycore.js*" && echo SUCCESS || echo FAILED

echo Copying surveycreatorcorecss.css...
xcopy /Y /F "%~dp0survey-creator\packages\survey-creator-core\build\survey-creator-core.css" "%STATIC_RESOURCES%\surveycreatorcorecss.css*" && echo SUCCESS || echo FAILED

echo Copying surveycreatorcorejs.js...
xcopy /Y /F "%~dp0survey-creator\packages\survey-creator-core\build\survey-creator-core.js" "%STATIC_RESOURCES%\surveycreatorcorejs.js*" && echo SUCCESS || echo FAILED

echo Copying surveycreatormin.js...
xcopy /Y /F "%~dp0survey-creator\packages\survey-creator-core\build\survey-creator-core.min.js" "%STATIC_RESOURCES%\surveycreatormin.js*" && echo SUCCESS || echo FAILED

echo Copying surveyjsui.js...
xcopy /Y /F "%~dp0survey-library\build\survey-js-ui\survey-js-ui.min.js" "%STATIC_RESOURCES%\surveyjsui.js*" && echo SUCCESS || echo FAILED

echo -----------------------------------------
echo Copy operations completed
echo Source directory: %~dp0
echo -----------------------------------------
pause