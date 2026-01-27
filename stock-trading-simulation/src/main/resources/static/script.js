let walletBalance = 100000;
document.getElementById("balance").innerText = walletBalance;

function addStock() {
    let name = document.getElementById("name").value;
    let price = parseInt(document.getElementById("price").value);

    if (name === "" || isNaN(price) || price <= 0) {
        alert("❌ Enter valid stock name & price");
        return;
    }

    fetch("http://localhost:8080/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            stockName: name,
            price: price
        })
    }).then(() => {
        loadStocks();
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
    });
}

function loadStocks() {
    fetch("http://localhost:8080/stocks")
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("stockList");
            list.innerHTML = "";

            data.forEach(stock => {
                let li = document.createElement("li");

                li.innerHTML = `
                    <div class="stock-row">
                        <div class="stock-info">
                            <strong>${stock.stockName}</strong>
                            <span>₹${stock.price}</span>
                        </div>

                        <div class="actions">
                            <button class="buy-btn" onclick="buyStock(${stock.price})">Buy</button>
                            <button class="sell-btn" onclick="sellStock(${stock.price})">Sell</button>
                        </div>
                    </div>
                `;

                list.appendChild(li);
            });
        });
}

loadStocks();

function buyStock(price) {
    let qty = parseInt(document.getElementById("quantity").value);

    if (isNaN(qty) || qty <= 0) {
        alert("❌ Enter valid quantity");
        return;
    }

    let totalCost = price * qty;

    if (walletBalance >= totalCost) {
        walletBalance -= totalCost;
        document.getElementById("balance").innerText = walletBalance;
        alert(`✅ Bought ${qty} stocks for ₹${totalCost}`);
    } else {
        alert("❌ Insufficient balance");
    }
}

function sellStock(price) {
    walletBalance += price;
    document.getElementById("balance").innerText = walletBalance;
    alert("✅ Stock Sold");
}
