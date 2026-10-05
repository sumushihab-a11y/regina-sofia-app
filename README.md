# Regina Sofia — repository indipendente

Sito statico, pagina di download e app Android di anteprima. Questo progetto ha una cronologia Git nuova e autonoma: non è un clone, un fork o un sottoprogetto del repository Sohoj.

## Stato della consegna

- APK precedente recuperato e copiato senza modifiche in `downloads/Regina-Sofia-anteprima.apk`.
- Pagina dedicata pronta in `regina-sofia/index.html`; sito web conservato in `index.html`.
- Sorgenti Android conservati in `android/`, senza chiavi, cache, build intermedi o percorsi SDK locali.
- Nuovo repository Git locale sul branch `main`.
- **Repository remoto, push e nuova pubblicazione non ancora effettuati:** in questa sessione non è disponibile un accesso GitHub/GitLab autorizzato. Non è stato inventato alcun URL pubblico. La pubblicazione va eseguita dopo il push, come richiesto.

## Anteprima locale

Dalla root del progetto:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Aprire `http://localhost:8080/regina-sofia/` per la pagina dedicata oppure `http://localhost:8080/` per il sito. Questi sono indirizzi locali, non link pubblici.

## Creazione del repository GitHub e push

È necessario disporre di Git e GitHub CLI (`gh`) e autorizzare il proprio account tramite il browser. Non inserire password o token nei file del progetto o in chat.

Su Windows CMD, **dentro la cartella di questo nuovo repository**:

```cmd
gh auth login --web --git-protocol https
gh auth setup-git
scripts\push-nuovo-repo.cmd
```

Su Linux/macOS:

```sh
gh auth login --web --git-protocol https
gh auth setup-git
bash scripts/push-nuovo-repo.sh
```

Gli script creano il repository pubblico `regina-sofia-app` nell'account GitHub attivo e fanno il push dei file già committati. Richiedono la conferma `PUBBLICA`. Prima di confermare, verificare l'account attivo con `gh auth status`.

Per un'organizzazione occorre un accesso autorizzato a quella organizzazione e specificarne il nome nel comando di creazione. Il repository viene reso pubblico intenzionalmente: saranno visibili sito, sorgenti e APK. Le chiavi di firma sono escluse.

Gli script passano esplicitamente alla propria cartella, verificano che sia la root Git, richiedono branch `main` e working tree pulito, e si fermano se `origin` esiste già. Non cambiano i remote e non toccano un altro repository. Se la creazione riesce ma il push fallisce, controllare l'errore prima di riprovare: il remote potrebbe essere già stato creato.

## Link pubblico dedicato — dopo il push

È incluso il workflow `.github/workflows/pages.yml` per GitHub Pages. Esporta solo i file del sito: non pubblica metadati Git, sorgenti Android, comandi o file privati nell'hosting statico.

Dopo aver completato il push:

1. Nel **nuovo** repository, aprire **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. In **Actions → Pubblica Regina Sofia su Pages**, avviare **Run workflow** sul branch `main` (o rieseguire la prima esecuzione dopo aver abilitato Pages).
3. Attendere il deploy riuscito. GitHub mostra l'URL reale nell'ambiente `github-pages` e nella sezione Pages.
4. Aprire la sottocartella `regina-sofia/` di quell'URL per la pagina di download dedicata. Verificare pagina e APK in una finestra anonima prima di condividere.

Non è necessario modificare il dominio ufficiale del ristorante né il repository Sohoj. Il workflow non è stato eseguito online in questa sessione.

## APK e sorgenti

- `downloads/Regina-Sofia-anteprima.apk`: stessa anteprima della consegna precedente.
- `downloads/SHA256SUMS.txt`: impronta SHA-256 dell'APK.
- `downloads/regina-sofia-android-source.zip`: sito e sorgenti Android, senza chiavi e build intermedi.
- `android/BUILD-NOTES.md`: istruzioni di build e limiti Android.
- `APP-NOTES.md`, `APP-TESTS-PRECEDENTI.md`: documentazione del lavoro precedente, non nuovi test su dispositivo.
- `CHECKS.md`: controlli svolti per questa preparazione.

**Anteprima, non release di produzione:** l'app non è su Google Play ed è firmata per sviluppo. Non è stata testata su telefono Android reale. Non installabile su iPhone. Questa pagina non elimina i normali avvisi di sicurezza Android sugli APK esterni.
