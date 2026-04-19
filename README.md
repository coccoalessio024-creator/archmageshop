📜 THE ARCHMAGE'S SANCTUM - TECHNICAL MANIFEST
1. ARCHITETTURA FILE (Gerarchia)
text
[root]
│
├── index.html              <-- Main Hub (Porta d'ingresso)
├── secret.html             <-- Trial of Shadows (Indovinello)
├── trial.html              <-- Trial of Ancients (Mini-game Drag & Drop)
├── style.css               <-- Estetica globale e animazioni
│
├── archives/               <-- Il "Caveau" degli Asset
│   ├── Archmage.png.png    <-- Ritratto principale
│   ├── logo_archmage.png   <-- Sigillo Brand (Secret link)
│   ├── potionmini.png      <-- Cursore globale (32x32px)
│   └── [asset_gioco].png   <-- (axe, crown, knight, etc.)
│
└── emporium/               <-- Cartella Negozio
    ├── index.html          <-- Emporio (Griglia prodotti)
    ├── bulletins.html      <-- Bollettini (Oracolo)
    └── cart.html           <-- Checkout (Parchment & PayPal link)
   

3. LOGICA DELLE PAGINE (Core Features)
A. INDEX (The Gateway)
Intro a tempo: Le pergamene laterali (.welcome-scroll) si chiudono dopo 15s (translateY(-92%)). Sono cliccabili per riaprirle.
Navigazione: 3 Bottoni paralleli + Logo segreto fisso in basso a DX.
FX: Pioggia di emoji fantasy (window.onload) leggera e senza librerie.
Cursore: Inserito tramite CSS * { cursor: url(...) }.
B. TRIAL.HTML (The Mini-Game)
Meccanica: HTML5 Drag & Drop API.
Condizioni di Vittoria: 4 slot da riempire (Axe, Crown, Scroll, CoinGem).
Mana Bar: div blu spettrale che aumenta del 25% a ogni drop corretto.
Output: Sblocco del codice finale al raggiungimento di solved === 4.
C. EMPORIUM & CART
Carrello: Gestito tramite localStorage (persiste al refresh).
Checkout: Trasforma il valore del carrello in un link PayPal.me dinamico.
Layout: Griglia flessibile (CSS Grid) che si stringe per far spazio alla Sidebar del carrello.
4. GUIDA AL DEBUG (Risoluzione Problemi)
Problema	Causa Probabile	Soluzione
Sito Bianco / 404	Percorso file errato o Case Sensitivity	Controlla che i nomi file siano tutti minuscoli e i link corrispondano.
Cursore non appare	Immagine troppo grande	Ridimensiona potionmini.png a 32x32px esatti.
Il carrello non somma	Errore nel parseFloat	Controlla che i prezzi negli articoli siano numeri puri (senza "Gold").
Deploy GitHub fallito	Troppe build in sequenza	Aspetta 60 secondi tra un Commit e l'altro.
5. NOTE PER IL COLLABORATORE
Font: Il font MedievalSharp è forzato su ogni elemento tramite il selettore universale * nell'head.
Color Palette:
#140f0a (Sfondo Scuro)
#d4af37 (Oro primario)
#7a1515 (Rosso Sangue/Bottoni)
#00bfff (Blu Mana/Spettrale)
Scalabilità: Per aggiungere un nuovo prodotto, basta inserire un nuovo oggetto nell'array dello script dell'Emporio.
