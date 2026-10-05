@echo off
setlocal EnableExtensions DisableDelayedExpansion

cd /d "%~dp0.." || goto :cd_error
set "GITROOT="
for /f "delims=" %%I in ('git rev-parse --show-toplevel 2^>nul') do set "GITROOT=%%I"
if not defined GITROOT goto :not_repo
for %%I in ("%CD%") do set "EXPECTED=%%~fI"
for %%I in ("%GITROOT%") do set "ACTUAL=%%~fI"
if /I not "%ACTUAL%"=="%EXPECTED%" goto :wrong_root

if not exist "downloads\Regina-Sofia-anteprima.apk" goto :no_apk
where gh >nul 2>&1 || goto :no_gh

git remote get-url origin >nul 2>&1 && goto :has_origin
for /f "delims=" %%I in ('git status --porcelain') do goto :dirty

set "BRANCH="
for /f "delims=" %%I in ('git branch --show-current 2^>nul') do set "BRANCH=%%I"
if not "%BRANCH%"=="main" goto :wrong_branch

gh auth status >nul 2>&1 || goto :no_auth

echo ATTENZIONE: verra' creato il repository GitHub PUBBLICO regina-sofia-app e saranno pubblicati i file gia' committati, incluso l'APK se committato.
set "CONFIRM="
set /p "CONFIRM=Digitare esattamente PUBBLICA per confermare: "
if not "%CONFIRM%"=="PUBBLICA" goto :cancel

gh repo create regina-sofia-app --public --source=. --remote=origin --push
if errorlevel 1 goto :create_error
echo Repository creato e push completato con successo.
exit /b 0

:cd_error
echo Errore: impossibile entrare nella root prevista. 1>&2
exit /b 1
:not_repo
echo Errore: questa cartella non e' un repository Git esistente. 1>&2
exit /b 1
:wrong_root
echo Errore: la root Git non coincide con la root prevista; operazione annullata. 1>&2
exit /b 1
:no_apk
echo Errore: manca downloads\Regina-Sofia-anteprima.apk. 1>&2
exit /b 1
:no_gh
echo Errore: GitHub CLI ^(gh^) non disponibile. 1>&2
exit /b 1
:has_origin
echo Errore: il remote origin esiste gia'; non verra' modificato. 1>&2
exit /b 1
:dirty
echo Errore: working tree non pulito. 1>&2
exit /b 1
:wrong_branch
echo Errore: il branch corrente deve essere main. 1>&2
exit /b 1
:no_auth
echo Errore: gh non risulta autenticato; eseguire "gh auth login" separatamente. 1>&2
exit /b 1
:cancel
echo Operazione annullata: conferma esplicita non ricevuta. 1>&2
exit /b 1
:create_error
echo Errore: creazione/push non riusciti. Se il repository esiste gia', non verra' sovrascritto o distrutto. 1>&2
exit /b 1
