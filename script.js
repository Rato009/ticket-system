const apiUrl = "https://mute-snow-d1ea.23610109ks.workers.dev/"; // 

async function getData() {
  const res = await fetch(apiUrl);
  return await res.json();
}

async function updateData(data) {
  await fetch(apiUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

async function getTicket() {
  const data = await getData();
  const last = data.queue.length > 0 ? data.queue[data.queue.length - 1] : data.nowServing;
  const yourNumber = last + 1;
  data.queue.push(yourNumber);
  await updateData(data);

  document.getElementById("nowServing").textContent = data.nowServing;
  document.getElementById("yourNumber").textContent = yourNumber;
  document.getElementById("peopleAhead").textContent = yourNumber - data.nowServing;

  const qr = new QRious({
    element: document.getElementById("qrcode"),
    value: `あなたの番号は ${yourNumber} です`,
    size: 200
  });
}

setInterval(async () => {
  const data = await getData();
  document.getElementById("nowServing").textContent = data.nowServing;
}, 5000);
