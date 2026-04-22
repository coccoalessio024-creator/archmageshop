/* --- ARCHMAGE ADVENTURER HUD: FULL FUNCTIONALITY UNIFIED --- */
const initArchmageHUD = () => {
    // 1. LOGICA LIVELLO (Senza Cap + Bonus Gemme)
    let lvl = parseInt(localStorage.getItem('hero_lvl')) || 0;
    const gemsList = ['trial_1', 'trial_2', 'trial_3'];
    const gemsCount = gemsList.filter(g => localStorage.getItem(g) === 'true').length;
    
    lvl++; 
    localStorage.setItem('hero_lvl', lvl);
    const finalLvl = lvl + gemsCount;

    // 2. NOTIFICHE VISIVE (XP & LEVEL UP)
    const showNotice = () => {
        const notice = document.createElement('div');
        notice.style = `position:fixed; top:45%; left:50%; transform:translate(-50%, -50%); z-index:99999; text-align:center; pointer-events:none; font-family:'MedievalSharp', serif;`;
        notice.innerHTML = `
            <div style="color:#ff4500; font-size:28px; animation: fadeUp 3s forwards; text-shadow: 2px 2px #000;">+XP COLLECTED</div>
            <div style="color:#c0c0c0; font-size:48px; text-shadow:0 0 15px #fff, 2px 2px #000; animation: fadeUp 3s forwards; margin-top:10px;">LEVEL UP</div>
        `;
        document.body.appendChild(notice);
        setTimeout(() => notice.remove(), 3000);
    };

    if (!document.getElementById('fadeUpStyle')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'fadeUpStyle';
        styleSheet.innerText = `@keyframes fadeUp { 0% { opacity:0; transform:translate(-50%, 20px); } 20% { opacity:1; } 80% { opacity:1; } 100% { opacity:0; transform:translate(-50%, -60px); } }`;
        document.head.appendChild(styleSheet);
    }
    showNotice();

    // 3. SETUP ASSETS
    const avatars = ['axeman.png', 'knight.png', 'actualmage.png'];
    let idx = parseInt(localStorage.getItem('hero_avatar_idx')) || 0;
    const pathPrefix = window.location.pathname.includes('emporium/') ? '../archives/' : 'archives/';
    const trialGems = gemsList.map(g => localStorage.getItem(g) === 'true');

    if (document.getElementById('hero-scroll-container')) return;
    
    const hud = document.createElement('div');
    hud.id = 'hero-scroll-container';
    hud.style = `position: fixed; left: 0; top: 60%; transform: translateY(-50%); z-index: 10000; font-family: 'MedievalSharp', serif; display: flex; flex-direction: column; align-items: flex-start; pointer-events: auto;`;

    const renderGems = (size) => `
        <div style="display:flex; gap:3px; justify-content:center; margin-bottom:5px;">
            ${trialGems.map(unlocked => `<img src="${pathPrefix}coingem.png" style="width:${size}px; height:${size}px; filter:${unlocked ? 'drop-shadow(0 0 5px #00fbff)' : 'grayscale(1) opacity(0.3)'};">`).join('')}
        </div>`;

    hud.innerHTML = `        
        <!-- CORPO HUD (Inizia APERTO) -->
        <div id="scroll-body" style="display:flex; background:#d4af37; border:3px solid #050505; border-left:none; padding:8px; width:95px; box-shadow:4px 4px 0px #8b4513; flex-direction:column; align-items:center; border-radius: 0 5px 5px 0;">
            ${renderGems(16)}
            <div style="width:60px; height:60px; border:3px solid #050505; background:#333; overflow:hidden; cursor:pointer; margin-top:5px;">
                <img src="${pathPrefix}${avatars[idx]}" id="avatar-toggle" 
                     style="width:100%; height:100%; object-fit:cover; transform:scale(1.35); image-rendering:pixelated;">
            </div>
            <div style="text-align:center; margin-top:5px; color:#050505;">
                <div style="font-size:10px; font-weight:bold;">LEVEL</div>
                <div style="font-size:24px;">${finalLvl}</div>
            </div>
            <button id="toggle-scroll-btn" style="margin-top:8px; background:#050505; color:#d4af37; border:none; cursor:pointer; font-family:'MedievalSharp'; font-size:9px; padding:2px; width:100%;">[ CLOSE ]</button>
        </div>

        <!-- LINGUETTA (Inizia CHIUSA) -->
        <div id="scroll-handle" style="display:none; flex-direction:column; cursor:pointer; background:#d4af37; padding:10px 3px; width: 22px; border:3px solid #050505; border-left:none; color:#050505; box-shadow:2px 2px 0px #8b4513; text-align:center; border-radius: 0 5px 5px 0; overflow: hidden;">
            ${renderGems(10)}
            <div style="font-size:10px; font-weight:bold; writing-mode: vertical-rl; text-orientation: mixed; margin-top:5px; line-height: 1;">📜 STATUS 📜</div>
        </div>
    `;

    document.body.appendChild(hud);

    const scrollBody = document.getElementById('scroll-body');
    const scrollHandle = document.getElementById('scroll-handle');

    // Toggle Interaction
    document.getElementById('toggle-scroll-btn').onclick = () => {
        scrollBody.style.display = 'none'; scrollHandle.style.display = 'flex';
    };
    scrollHandle.onclick = () => {
        scrollBody.style.display = 'flex'; scrollHandle.style.display = 'none';
    };

    // LIVE AVATAR SWITCH (No Refresh)
    document.getElementById('avatar-toggle').onclick = () => {
        idx = (idx + 1) % avatars.length;
        localStorage.setItem('hero_avatar_idx', idx);
        
        // Update HUD
        document.getElementById('avatar-toggle').src = pathPrefix + avatars[idx];
        
        // Sync with Legacy Scroll if present
        const legacyAvatar = document.getElementById('legacy-avatar-img');
        if (legacyAvatar) legacyAvatar.src = 'archives/' + avatars[idx];
    };
};

initArchmageHUD();
