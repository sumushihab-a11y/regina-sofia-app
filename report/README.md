# Report Regina Sofia — metodologia

Snapshot del 05 ottobre 2026. Questa directory contiene un report statico generato dagli artefatti della rilevazione precedente: `catalogo.json`, `catalogo.csv` ed `extra.json`. Non usa API, sessioni o cookie e non contiene HTML sorgente grezzo, stati di sessione o log della rilevazione.

`build-report.py` risolve i file rispetto alla propria directory, quindi può essere eseguito da qualunque working directory con `python3 report/build-report.py`. Genera `index.html` e `supplementi.csv`; le quantità di voci, categorie, voci segnate esaurite e supplementi sono calcolate dai JSON al momento della generazione.

I conteggi dello snapshot sono 98 voci, 9 categorie, 38 voci segnate esaurite e 49 supplementi. Il report conserva i limiti dichiarati dalla verifica precedente: è una fotografia dei dati pubblici e dei test già svolti, non una nuova verifica, un test di produzione o una garanzia di disponibilità/ordinabilità. Le osservazioni su viewport mobile, flusso di ritiro e comportamento dell'interfaccia descrivono soltanto quei test precedenti; checkout, pagamento, invio ordine, WebView/app reale e notifiche non risultano verificati.

Il report include ricerca e filtri locali, azzeramento filtri e stampa via browser. I collegamenti a `../ordina/` e `../regina-sofia/` portano rispettivamente al nuovo frontend demo e all'hub di progetto. Per rigenerare: `python3 report/build-report.py` dalla cartella padre, oppure `python3 build-report.py` dalla directory `report/`.
