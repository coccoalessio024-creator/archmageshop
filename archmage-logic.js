/* --- ARCHMAGE ADVENTURER HUD: 3 AVATARS & GEMS --- */
const initArchmageHUD = () => {
    // 1. Logica Livello (XP da Esplorazione)
    let lvl = parseInt(localStorage.getItem('hero_lvl')) || 1;
    if (!sessionStorage.getItem('lvl_counted')) {
        lvl++;
        localStorage.setItem('hero_lvl', lvl);
        sessionStorage.setItem('lvl_counted', 'true');
    }

    // 2. Setup Avatar (I tuoi 3 eroi)
    const avatars = ['axeman.png', 'knight.png', 'actualmage.png'];
    let idx = localStorage.getItem('hero_avatar_idx') || 0;

    // 3. Tracciamento Trial (CoinGems)
    // Nota: Nelle pagine dei Trial dovrai chiamare: localStorage.setItem('trial_1', 'true') al completamento.
    const trialGems = [
        localStorage.getItem('trial_1') === 'true',
        localStorage.getItem('trial_2') === 'true',
        localStorage.getItem('trial_3') === 'true'
    ];

    const pathPrefix = window.location.pathname.includes('emporium/') ? '../archives/' : 'archives/';

    if (document.getElementById('hero-scroll-container')) return;
    
    const hud = document.createElement('div');
    hud.id = 'hero-scroll-container';
    hud.style = `position:fixed; top:10px; left:10px; z-index:10000; font-family:'MedievalSharp',serif;`;

    // Creazione HTML con Gemme e Pergamena 8-bit
    hud.innerHTML = `
        <div id="gem-container" style="display:flex; gap:5px; margin-bottom:5px; height:20px;">
            ${trialGems.map(unlocked => `
                <img src="${pathPrefix}coingem.png" style="width:18px; height:18px; filter:${unlocked ? 'drop-shadow(0 0 5px #00fbff)' : 'grayscale(1) opacity(0.3)'}; transition: 0.5s;">
            `).join('')}
        </div>
        
        <div id="scroll-body" style="
            background: #d4af37; border: 3px solid #050505; border-radius: 2px;
            image-rendering: pixelated; padding: 8px; width: 90px;
            box-shadow: 4px 4px 0px #8b4513; display: flex; flex-direction: column; align-items: center;">
            
            <img src="${pathPrefix}${avatars[idx]}" id="avatar-toggle" 
                 style="width: 55px; height: 55px; border: 3px solid #050505; 
                        background: #333; cursor: pointer; image-rendering: pixelated;">
            
            <div style="text-align: center; margin-top: 5px; color: #050505;">
                <div style="font-size: 9px; font-weight: bold;">LVL</div>
                <div style="font-size: 22px; line-height: 18px;">${lvl}</div>
            </div>

            <button id="toggle-scroll-btn" style="
                margin-top: 8px; background: #050505; color: #d4af37; 
                border: none; cursor: pointer; font-family: 'MedievalSharp';
                font-size: 9px; padding: 2px; width: 100%;">[ CLOSE ]</button>
        </div>

        <div id="scroll-handle" style="
            display: none; cursor: pointer; background: #d4af37; 
            padding: 8px; border: 3px solid #050505; border-radius: 2px;
            font-size: 11px; font-weight: bold; color: #050505; box-shadow: 3px 3px 0px #8b4513;">
            📜 STATUS
        </div>
    `;

    document.body.appendChild(hud);

    // --- INTERAZIONI ---
    const scrollBody = document.getElementById('scroll-body');
    const scrollHandle = document.getElementById('scroll-handle');
    const gemContainer = document.getElementById('gem-container');

    document.getElementById('toggle-scroll-btn').onclick = () => {
        scrollBody.style.display = 'none';
        gemContainer.style.display = 'none';
        scrollHandle.style.display = 'block';
    };

    scrollHandle.onclick = () => {
        scrollBody.style.display = 'flex';
        gemContainer.style.display = 'flex';
        scrollHandle.style.display = 'none';
    };

    document.getElementById('avatar-toggle').onclick = () => {
        let nextIdx = (parseInt(idx) + 1) % avatars.length;
        localStorage.setItem('hero_avatar_idx', nextIdx);
        location.reload();
    };
};

initArchmageHUD();
