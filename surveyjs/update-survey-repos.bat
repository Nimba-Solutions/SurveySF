@echo off
echo Updating survey repositories...

cd surveyjs

echo.
echo Updating survey-library...
cd survey-library
ren .checkout_git .git
call git pull
ren .git .checkout_git
cd ..

echo.
echo Updating survey-creator...
cd survey-creator
ren .checkout_git .git
call git pull
ren .git .checkout_git
cd ..

echo.
echo Updates complete!
cd ..
pause 