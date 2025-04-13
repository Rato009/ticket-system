const apiUrl = "https://あなたの-worker-url.workers.dev";

async function issueTicket() {
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ action: "issue" })
  });
  const data = await res.json();
  const info = document.getElementById("ticket-info");
  info.innerText = `あなたの整理券番号: ${data.ticket}`;

  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = ""; // 既存のQRを消す
  new QRCode(qrContainer, `${location.origin}/status.html?ticket=${data.ticket}`);
}
