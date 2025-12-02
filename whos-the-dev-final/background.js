// background.js V10.1 - Demo Ready
const HELIUS_API_KEY = "2c0a84d7-f121-49e7-9897-217e7ea5ce47".trim();
const GOOGLE_CX = "12099f34ed7794258".trim();
const GOOGLE_API_KEY = "AIzaSyDJk5naT-NFqn8A-fr0SqTX96CtoXTzVWs".trim();

const RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
const resultCache = {}; 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "CHECK_DEV") {
        checkDevStatus(message.address).then(data => sendResponse(data));
        return true; 
    }
});

async function checkDevStatus(address) {
    if (resultCache[address]) return resultCache[address];
    if (!address || address.length < 30) return { balance: "Err", hasRecord: "BadAddr" };

    const [balance, hasRecord] = await Promise.all([
        getSolBalance(address),
        checkTwitterAPI(address)
    ]);

    const result = { balance, hasRecord };
    if (hasRecord !== "Limit") resultCache[address] = result;
    return result;
}

async function getSolBalance(address) {
    try {
        const response = await fetch(RPC_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "jsonrpc": "2.0", "id": "1", "method": "getBalance", "params": [address] })
        });
        const data = await response.json();
        const lamports = data.result?.value || 0;
        return (lamports / 1000000000).toFixed(2);
    } catch (e) { return "Err"; }
}

async function checkTwitterAPI(address) {
    try {
        const query = `"${address}"`; 
        const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        if (res.status === 429) return "Limit"; 
        if (res.status === 403) return "KeyError";
        const data = await res.json();
        if (data.searchInformation && parseInt(data.searchInformation.totalResults) > 0) return true;
        return false;
    } catch (e) { return null; }
}