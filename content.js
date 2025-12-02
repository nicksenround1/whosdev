// content.js V10.1 - Demo Sniper
const processedUrls = new Set();
const observer = new MutationObserver((mutations) => {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(runSniperScan, 500);
});
observer.observe(document.body, { childList: true, subtree: true });

function runSniperScan() {
    if (!window.location.hostname.includes('pump.fun')) return;
    const allLinks = Array.from(document.querySelectorAll('a[href^="/profile/"]:not(.sniper-checked)'));
    if (allLinks.length === 0) return;
    const targetLink = allLinks[0]; // Only target the first one (Dev)
    if (targetLink.closest('.text-sm') && !targetLink.closest('.flex.gap-2')) return; 
    processLink(targetLink);
}

function processLink(link) {
    link.classList.add('sniper-checked');
    let address = getPumpAddress(link);
    if (!address) return;

    const container = document.createElement('span');
    container.style.cssText = 'display:inline-flex; gap:4px; margin-left:6px; vertical-align:middle;';
    if (link.parentElement) link.parentElement.appendChild(container); else link.appendChild(container);

    const twitterBadge = createBadge('X...', '#ccc');
    const balanceBadge = createBadge('$...', '#ccc');
    container.appendChild(twitterBadge); container.appendChild(balanceBadge);

    chrome.runtime.sendMessage({ type: "CHECK_DEV", address: address }, (data) => {
        if (data) updateUI(data, twitterBadge, balanceBadge, address);
    });
}

function getPumpAddress(link) {
    let rawHref = link.getAttribute('href');
    let potentialAddr = rawHref.replace('/profile/', '');
    if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(potentialAddr)) return potentialAddr; 
    let container = link.closest('.flex') || link.parentElement;
    if (container) {
         let card = link.closest('.flex-col') || container.parentElement;
         if(card) {
            const text = card.innerText || "";
            const daMatch = text.match(/DA:\s*([1-9A-HJ-NP-Za-km-z]{32,44})/);
            if (daMatch) return daMatch[1];
         }
    }
    return null; 
}

function createBadge(text, color) {
    const badge = document.createElement('span');
    badge.innerText = text;
    badge.style.cssText = `background-color:${color}; color:#fff; border-radius:4px; padding:2px 6px; font-size:11px; font-weight:bold; cursor:pointer; white-space:nowrap;`;
    return badge;
}

function updateUI(data, twBadge, solBadge, address) {
    if (data.balance !== "Err") {
        const sol = parseFloat(data.balance);
        solBadge.innerText = `${sol} SOL`;
        solBadge.style.backgroundColor = sol > 50 ? '#00C853' : (sol > 1 ? '#FF9800' : '#D32F2F');
    } else { solBadge.style.display = 'none'; }
    solBadge.onclick = (e) => { e.preventDefault(); e.stopPropagation(); window.open(`https://solscan.io/account/${address}`, '_blank'); };

    if (data.hasRecord === "Limit") {
        twBadge.innerText = "X (点我搜)"; twBadge.style.backgroundColor = '#FBC02D';
    } else if (data.hasRecord === true) {
        twBadge.innerText = "X: 有记录 ✅"; twBadge.style.backgroundColor = '#1DA1F2';
    } else if (data.hasRecord === false) {
        twBadge.innerText = "X: 无记录"; twBadge.style.backgroundColor = '#607D8B';
    } else { twBadge.innerText = "?"; }
    twBadge.onclick = (e) => { e.preventDefault(); e.stopPropagation(); window.open(`https://twitter.com/search?q=${address}&src=typed_query`, '_blank'); };
}