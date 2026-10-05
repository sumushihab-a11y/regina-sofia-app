# Verifiche della preparazione del repository pubblico

## Eseguite in questa sessione

- Recuperato l'APK della consegna precedente e verificata la copia identica tramite SHA-256: `b23b6fe083557513704de1fe0552140393aac363531583e37c088e32a85780dc`.
- Dimensione APK: 5.511.498 byte.
- `apksigner verify`: concluso con exit code 0. Avviso del tool su `META-INF/com/android/build/gradle/app-metadata.properties` non protetto dalla firma; l'APK non è stato modificato per rimuoverlo.
- Generato ZIP con sito e sorgenti Android, senza chiavi di firma, build intermedi o configurazioni SDK locali. Il collegamento al sorgente presente nel sito ora ha un file corrispondente.
- Pagina `regina-sofia/` provata via HTTP locale con Playwright / Chromium di sistema, viewport 360, 390, 768 e 1440 px: nessun overflow orizzontale.
- Tutti i link della nuova pagina rispondono HTTP 200 sul server locale.
- Download tramite il pulsante: nome file corretto e SHA-256 identico all'APK recuperato.
- Pulsante condivisione: copia negli appunti dell'URL corrente verificata. Condivisione nativa mobile non collaudata.
- Apertura del sito esistente tramite il relativo pulsante riuscita.
- Nessun errore JavaScript nelle pagine visitate durante questi controlli.
- `bash -n scripts/push-nuovo-repo.sh`: sintassi valida.

## Non eseguite

- Nessun push: mancano un account Git autorizzato e un repository remoto.
- Nessuna nuova pubblicazione prima del push, come richiesto.
- Workflow GitHub Pages predisposto ma non ancora eseguito online.
- Script CMD letto e verificato staticamente, non eseguito su Windows. Gli script di creazione/push non sono stati avviati contro GitHub.
- Nessun test di installazione Android su telefono o emulatore.
- Nessuna modifica al sito ufficiale del ristorante o al repository Sohoj.
