@echo OFF
SETLOCAL
FOR  /d %%i IN (docs\*) DO RD "%%i" /S /Q
FOR %%i IN (docs\*) DO IF /i NOT "%%~nxi"=="CNAME" IF /i NOT "%%~nxi"=="404.html" DEL "%%i"

xcopy /E /I dist\browser\assets docs\assets
copy  dist\browser  docs\
copy dist\*.txt docs\