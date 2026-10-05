# Regina Sofia — sito e app Android, prima versione

Sito responsive statico, web app installabile e app Android di anteprima con risorse locali. Dati reali del sito ufficiale https://www.reginasofia.it/; nessuna modifica al dominio originale.

## Funzioni incluse
- Fotografie, storia, contatti, orari, indirizzo e collegamenti ufficiali.
- Menù completo: 207 voci in 24 categorie, con prezzi e descrizioni.
- Ricerca per piatto/ingrediente, filtro categorie, 71 proposte con indicazione esplicita senza glutine.
- Preferiti memorizzati sul dispositivo.
- Consultazione offline dopo il primo caricamento della web app; risorse già incluse nell’APK Android.
- Chiamata o preparazione di una richiesta email per prenotare, senza simulare una conferma.
- Accesso al delivery, alle indicazioni stradali, ai social e alla Guest House ufficiali.
- Nessun analytics o caricamento di font di terze parti; nessuna registrazione.

## Sito
Pubblicare `index.html`, `style.css`, `app.js`, `sw.js`, `manifest.webmanifest`, `assets/`, `data/` e `downloads/` su hosting HTTPS con i percorsi relativi conservati. La web app richiede HTTPS o localhost. Non esiste una build npm: sono file statici.

Per anteprima locale:
```sh
python3 -m http.server 8080
```
Aprire http://localhost:8080/.

## Aggiornamento menù
Modificare `data/menu.json`, mantenendo prezzi e allergeni verificati dal ristorante, quindi rigenerare il file per browser/Android:
```sh
python3 - <<'PY'
import json
m=json.load(open('data/menu.json'))
open('data/menu.js','w').write('window.REGINA_MENU = '+json.dumps(m,ensure_ascii=False)+';\n')
PY
```
Cambiare la versione `CACHE` in `sw.js` quando cambiano i contenuti. Ricompilare l’APK con `android/build.sh` dopo ogni aggiornamento del sito. Non è presente sincronizzazione automatica col sito WordPress o col delivery.

## Android
Vedere `android/BUILD-NOTES.md` e il download del sorgente. L’APK è una build di sviluppo, non pubblicata su Google Play. Compilazione e firma verificate; non testato su dispositivo Android fisico o emulatore.

## Limitazioni esplicite
Il messaggio del committente era interrotto nella descrizione delle funzioni dell’app. Questa versione non presume di includere ordini interni, carrello, pagamenti, account, pannello gestionale, punti fedeltà o notifiche. Prenotazioni e ordini si completano tramite canali esterni. Nessuna comunicazione è stata realmente inviata durante i test.

Fonti e dettagli sul menù: `data/SOURCES.md`. Test: `TESTS.md`.
