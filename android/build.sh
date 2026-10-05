#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$(cd .. && pwd)"
: "${ANDROID_HOME:=/tmp/rs-tooling/sdk}"
: "${GRADLE_BIN:=/tmp/rs-tooling/gradle/gradle-8.7/bin/gradle}"
export ANDROID_HOME
printf 'sdk.dir=%s\n' "$ANDROID_HOME" > local.properties
WWW="$PWD/app/src/main/assets/www"
rm -rf "$WWW"
mkdir -p "$WWW/data"
for f in index.html style.css app.js manifest.webmanifest sw.js; do cp "$ROOT/$f" "$WWW/$f"; done
cp "$ROOT/data/menu.js" "$WWW/data/menu.js"
cp -R "$ROOT/assets" "$WWW/assets"
"$GRADLE_BIN" --no-daemon assembleDebug
mkdir -p "$ROOT/downloads"
cp app/build/outputs/apk/debug/app-debug.apk "$ROOT/downloads/Regina-Sofia-anteprima.apk"
echo 'APK creato: downloads/Regina-Sofia-anteprima.apk'
