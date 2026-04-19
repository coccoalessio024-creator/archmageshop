1. ARCHITETTURA FILE (Gerarchia)

[root]
│
├── index.html              <-- Main Hub (Portale d'ingresso)
├── secret.html             <-- Chamber of Guardians (Indovinello & Guardiani)
├── trial.html              <-- Trial of Ancients (Mini-game PC/Mobile)
├── finaltrial.html         <-- Final Awakening (Rito del Rombo di Luce)
├── style.css               <-- Root Styles (Variabili, Font, Effetti Base)
│
├── archives/               <-- Il "Caveau" (Asset compressi 8-bit/PNG)
│   ├── Archmage.png.png    <-- Ritratto Main (Centerpiece)
│   ├── actualmage.png      <-- Icona Bottoni & Hero Final Trial
│   ├── logo_archmage.png   <-- Sigillo Segreto (Indizio/Link)
│   ├── potionmini.png      <-- Decorazione Bottoni
│   └── [game_assets].png   <-- (axe, crown, coinslot, coingem, etc.)
│
└── emporium/               <-- Sottocartella Negozio
    ├── index.html          <-- Emporio (Prodotti & Certificato Segreto)
    ├── bulletins.html      <-- Oracolo (News Visive)
    └── cart.html           <-- Checkout (PayPal Engine)
    

2. LOGICA DELLE PAGINE (Core Features)
   
A. INDEX & GLOBAL LOGIC

Sigillo Temporale: Script applyCelestialLock blocca l'accesso a Trial e Secret fino al 4 Maggio 2026. I link appaiono "spenti" e mostrano un countdown nell'hover.
Welcome Scrolls: Pergamene laterali larghe che si arrotolano al 92% dopo 15s. Funzionano come toggle cliccabile.
FX Rune: Pioggia di rune dorate/glifi (magic-rune) leggeri, senza librerie esterne.
Stone Buttons: Bottoni neri effetto pietra con decorazione actualmage integrata.
B. TRIAL SYSTEM (Drag & Drop 2.0)

Pixel-Perfect Touch: Gestione manuale delle coordinate (position: fixed) per evitare lo sfasamento tra dito e oggetto su iPad/iPhone.
No Ghost Image: Anteprima nativa del browser disabilitata per mantenere la scala 1:1 durante il trascinamento.
Trial Ancients: Disposizione a scorrimento verticale su mobile per raggiungere tutti gli oggetti.
Final Trial: Sistema SVG dinamico che traccia un rombo di luce tra gli slot. Logica sequenziale: il cuore si sblocca solo dopo i primi 3 incastri.
FX Sismico: Animazione @keyframes earthquake che scuote lo schermo al completamento del rito finale.
C. EMPORIUM & EASTER EGGS

Sidebar Adattiva: Su PC è laterale, su Mobile scivola dal basso (50vh) per facilitare l'uso del pollice.
3D Coin Flip: Il Toilet Token ruota sull'asse Y mostrando testa/croce in loop.
Secret Certificate: Posizionato in fondo allo store, vibra come una Pokéball al tocco e funge da portale per finaltrial.html.

4. GUIDA AL DEBUG (Risoluzione Problemi)
Problema	Causa Probabile	Soluzione
Gemma Sfalsata	Calcolo centro errato	Verificare p.clientX - 42 (metà larghezza asset) nel file finaltrial.html.

No Scroll Mobile	touch-action: none globale	Assicurarsi che lo scroll sia disabilitato solo sull'elemento activeItem durante il drag.

Font Standard	@import mancante	Controllare la presenza dell'URL Google Fonts in cima a style.css.

404 Final Trial	Link relativo errato	Dall'emporio usare ../finaltrial.html per risalire la cartella.


5. NOTE PER IL COLLABORATORE

JS Mesi: Ricorda che new Date(2026, 4, 4) è Maggio (Gennaio=0).
Mobile First: Ogni modifica alla griglia prodotti deve essere testata con flex-direction: column.
Color Palette:
#050505 (Nero Profondo - Trial)
#00fbff (Azzurro Celestiale - Awakening)
#ff4500 (Arancio Fiamma - Emporio/Gemme)




