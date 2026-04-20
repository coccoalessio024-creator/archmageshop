/* --- ARCHMAGE ADVENTURER HUD: XP & NOTIFICATIONS --- */
const initArchmageHUD = () => {
    // 1. Logica Livello (Senza Cap)
    let lvl = parseInt(localStorage.getItem('hero_lvl')) || 0;
    
    // Bonus Gemme: +1 livello per ogni gemma conquistata
    const gemsCount = ['trial_1', 'trial_2', 'trial_3'].filter(g => localStorage.getItem(g) === 'true').length;
    
    // Incremento XP Pagina
    lvl++; 
    localStorage.setItem('hero_lvl', lvl);
    const finalLvl = lvl + gemsCount;

    // 2. Notifica XP e LVL UP (Centro Pagina)
    const showNotice = () => {
        const notice = document.createElement('div');
        notice.style = `position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:20000; text-align:center; pointer-events:none; font-family:'MedievalSharp', serif;`;
        notice.innerHTML = `
            <div style="color:#ff4500; font-size:24px; animation: fadeUp 1.5s forwards;">+XP</div>
            <div style="color:#c0c0c0; font-size:42px; text-shadow:0 0 10px #fff; animation: fadeUp 2s forwards; margin-top:10px;">LEVEL UP</div>
        `;
        document.body.appendChild(notice);
        setTimeout(() => notice.remove(), 2000);
    };

    // Stile animazione notifica
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `@keyframes fadeUp { 0% { opacity:0; transform:translateY(20px); } 50% { opacity:1; } 100% { opacity:0; transform:translateY(-50px); } }`;
    document.head.appendChild(styleSheet);

    if (!sessionStorage.getItem('visited_this_session')) {
        showNotice();
        sessionStorage.setItem('visited_this_session', 'true');
    }

    // 3. Setup Avatar & Percorsi
    const avatars = ['axeman.png', 'knight.png', 'actualmage.png'];
    let idx = localStorage.getItem('hero_avatar_idx') || 0;
    const pathPrefix = window.location.pathname.includes('emporium/') ? '../archives/' : 'archives/';

    if (document.getElementById('hero-scroll-container')) return;
    
    const hud = document.createElement('div');
    hud.id = 'hero-scroll-container';
    hud.style = `position:fixed; top:10px; left:10px; z-index:10000; font-family:'MedievalSharp', serif;`;

    // 4. HTML (Gemme + Pergamena con Zoom Avatar)
    const trialGems = [
        localStorage.getItem('trial_1') === 'true',
        localStorage.getItem('trial_2') === 'true',
        localStorage.getItem('trial_3') === 'true'
    ];

    hud.innerHTML = `
        <div id="gem-container" style="display:flex; gap:5px; margin-bottom:5px;">
            ${trialGems.map(unlocked => `<img src="${pathPrefix}coingem.png" style="width:18px; height:18px; filter:${unlocked ? 'drop-shadow(0 0 5px #00fbff)' : 'grayscale(1) opacity(0.3)'};">`).join('')}
        </div>
        
        <div id="scroll-body" style="background:#d4af37; border:3px solid #050505; padding:8px; width:95px; box-shadow:4px 4px 0px #8b4513; display:flex; flex-direction:column; align-items:center;">
            
            <div style="width:60px; height:60px; border:3px solid #050505; background:#333; overflow:hidden; cursor:pointer;">
                <img src="${pathPrefix}${avatars[idx]}" id="avatar-toggle" 
                     style="width:100%; height:100%; object-fit:cover; transform:scale(1.35); image-rendering:pixelated;">
            </div>
            
            <div style="text-align:center; margin-top:5px; color:#050505;">
                <div style="font-size:10px; font-weight:bold;">LEVEL</div>
                <div style="font-size:24px;">${finalLvl}</div>
            </div>

            <button id="toggle-scroll-btn" style="margin-top:8px; background:#050505; color:#d4af37; border:none; cursor:pointer; font-family:'MedievalSharp'; font-size:9px; padding:2px; width:100%;">[ CLOSE ]</button>
        </div>

        <div id="scroll-handle" style="display:none; cursor:pointer; background:#d4af37; padding:8px; border:3px solid #050505; color:#050505; font-size:11px;">📜 STATUS</div>
    `;

    document.body.appendChild(hud);

    // 5. Interazioni
    const scrollBody = document.getElementById('scroll-body');
    const scrollHandle = document.getElementById('scroll-handle');
    const gemContainer = document.getElementById('gem-container');

    document.getElementById('toggle-scroll-btn').onclick = () => {
        scrollBody.style.display = 'none'; gemContainer.style.display = 'none'; scrollHandle.style.display = 'block';
    };

    scrollHandle.onclick = () => {
        scrollBody.style.display = 'flex'; gemContainer.style.display = 'flex'; scrollHandle.style.display = 'none';
    };

    document.getElementById('avatar-toggle').onclick = () => {
        let nextIdx = (parseInt(idx) + 1) % avatars.length;
        localStorage.setItem('hero_avatar_idx', nextIdx);
        location.reload();
    };
};

initArchmageHUD();
