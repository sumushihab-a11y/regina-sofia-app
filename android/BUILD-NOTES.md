# Regina Sofia — Android di anteprima

## Artefatto
- File: `downloads/Regina-Sofia-anteprima.apk` (nel pacchetto pubblicato).
- Applicazione: Regina Sofia.
- ID: `it.reginasofia.preview`.
- Versione: `1.0-preview`, codice 1.
- Android minimo: 6.0 / API 23, con Android System WebView aggiornato; target / compile SDK 35.
- Compilazione debug con firma di sviluppo generata da Android Gradle Plugin. Non è una release Google Play e non è firmata con una chiave di pubblicazione del ristorante.
- La chiave di sviluppo non è inclusa nel sito o nel pacchetto sorgente.

## Architettura
Activity Java con WebView di risorse locali. Le pagine vengono caricate da `file:///android_asset/www/index.html`. Menù, foto e font sono inclusi nel file APK, senza bisogno di Internet per consultarli. I preferiti sono conservati localmente con DOM storage.

I collegamenti HTTPS/HTTP, telefono ed email si aprono con applicazioni esterne tramite Intent. Non vengono caricati siti esterni nel WebView. Nessuna JavascriptInterface; accesso universale da file URL e accesso content disattivati. Nessun permesso Android di rete, telefono, posizione, notifiche, rubrica o archivio. Il pulsante Indietro chiude i dialoghi e poi naviga nella cronologia interna. L’area di download dell’app viene nascosta nel bundle Android.

Nessun backend, pagamento, account, invio automatico di email, disponibilità tavoli in tempo reale, programma fedeltà o push. La richiesta email deve essere inviata dal cliente e confermata dal ristorante. Il delivery è quello ufficiale esterno.

## Ricompilazione
Il pacchetto sorgente include il sito completo alla radice e il progetto nella cartella `android/`.

Prerequisiti:
- JDK 17.
- Gradle 8.7.
- Android SDK con piattaforma API 35 e build-tools compatibili.
- Accesso ai repository Google Maven e Maven Central per Android Gradle Plugin 8.6.1, o cache già presente.

Dalla radice del pacchetto, su Linux/macOS:

```sh
export ANDROID_HOME="/percorso/android-sdk"
export GRADLE_BIN="/percorso/gradle-8.7/bin/gradle"
bash android/build.sh
```

Lo script copia le risorse web in `android/app/src/main/assets/www`, genera `android/local.properties`, compila e scrive `downloads/Regina-Sofia-anteprima.apk`. Le copie generate del sito, i build intermedi, local.properties, cache e chiavi non sono inclusi nello zip. Dopo una prima esecuzione dello script, il progetto `android/` può essere aperto in Android Studio.

In questo computer SDK e Gradle erano disponibili in `/tmp/rs-tooling`; lo script usa questi percorsi come default, sostituibili con le variabili sopra. Non sono requisiti dei computer esterni.

## Verifiche effettivamente eseguite
- Compilazione Gradle riuscita, `assembleDebug`.
- Verifica di firma APK tramite `apksigner`: valida, schemi v1 e v2.
- Verifica metadati con `aapt`: nome, ID, Activity launcher, min SDK 23, target SDK 35.
- Verifica della presenza nel bundle di HTML, JavaScript, CSS, menù e immagini.
- Test Chromium del sito via HTTP e `file://`, inclusa modalità offline, ricerca, filtri, preferiti persistenti, composizione richiesta email e layout a 360/390/768/1440 px.
- Nessun dispositivo Android fisico o emulatore era collegato: l’installazione, gli Intent, il tasto Indietro nativo e il comportamento specifico WebView vanno ancora verificati su un telefono Android. Il test `file://` in Chromium non sostituisce questo collaudo.

## Prima della produzione
Confermare funzioni mancanti dal messaggio iniziale troncato; verificare menù e immagini col ristorante; collaudare Android; scegliere un application ID definitivo e gestire una chiave release del proprietario; predisporre informativa privacy definitiva, eventuali backend e account gestionali; compilare le dichiarazioni richieste da Play Console e sottoporre l’app alla revisione. Non sono state eseguite pubblicazioni su Play Store né modifiche al sito ufficiale.
