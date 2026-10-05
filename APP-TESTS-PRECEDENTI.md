# Verifiche effettuate

## Web — Chromium
Eseguiti con Playwright, Chromium di sistema, nessun account e nessun invio di ordini o prenotazioni.

- Caricamento senza errori JavaScript e senza risposte HTTP di errore.
- Schermi 1440, 768, 390 e 360 px: nessuno scorrimento orizzontale del documento. Controllato anche il layout del dialogo prenotazione a 360 e 390 px.
- Verificata separazione tra pulsanti e fascia inferiore della hero su mobile.
- Menù iniziale: 6 voci visualizzate; pulsante per visualizzarne altre.
- Menù completo: 207 voci in 24 categorie.
- Ricerca «regina margherita»: voce corretta, prezzo € 7,50.
- Filtro senza glutine: 71 voci con indicazione esplicita nella fonte.
- Ricerca senza corrispondenze: stato vuoto e pulsante per ripristinare i filtri.
- Selezione categorie, menù rapido dalle fotografie e apertura navigazione mobile.
- Aggiunta ai preferiti e persistenza dopo ricaricamento.
- Vini: visualizzati prezzi distinti bottiglia e calice, ad esempio € 15,00 / € 5,00 per Otello Ceci.
- Richiesta prenotazione: composto testo con data, ora, nome e persone; resa disponibile la copia del messaggio. Nessuna email effettivamente inviata.
- Dialoghi prenotazioni e app: apertura e chiusura.
- Offline: dopo prima visita e attivazione del service worker, la pagina si ricarica e mostra il menù anche con rete disattivata.
- Caricamento file://: sei voci iniziali, nessun errore JavaScript, immagini caricate, area installazione nascosta e collegamenti esterni senza target nuova finestra.

## Android
- `assembleDebug` completato con successo.
- `apksigner verify`: firma valida v1/v2.
- `aapt dump badging`: package it.reginasofia.preview, min SDK 23, target SDK 35, launcher Regina Sofia.
- `aapt dump permissions`: nessun permesso applicativo richiesto.
- Confrontati byte per byte HTML, CSS, JavaScript, menù e icone del bundle APK con la versione finale del sito.

## Limiti dei test
Non è stato possibile collaudare l’APK su un telefono Android o emulatore. I test Chromium/file:// non equivalgono a un test dell’Activity e degli Intent su Android. Non sono state effettuate installazioni sul Play Store, prove di pagamento, invii email, ordini, verifiche di disponibilità tavoli o test di sistemi gestionali esterni.
