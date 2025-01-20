let products = [
    {
        name: "Eti Burçak Sütlü Çikolatalı",
        price: 32,
        stock: 10
    },
    {
        name: "Eti Popkek Muzlu",
        price: 15,
        stock: 20
    },
    {
        name: "Didi Şeftali 500Ml",
        price: 30,
        stock: 15
    },
    {
        name: "Eti Canga",
        price: 20,
        stock: 20
    },
    {
        name: "Çiftçi Baldo Pirinç 1KG",
        price: 90,
        stock: 50
    }
];

let balance = 0;
let cart = [];

const addMoney = document.querySelector("#add-balance");
const productList = document.querySelector("#lists");
const buyProduct = document.querySelector("#buy");
const showCart = document.querySelector("#show-cart");
const order = document.querySelector("#order");

function listProduct() {
    const content = document.querySelector("#content");
    content.innerHTML = "<h2>Ürünler</h2>";
    products.forEach(product => {
        content.innerHTML += `<p>${product.name} - Fiyat: ${product.price} TL, Stok: ${product.stock}</p>`;
    });
}

productList.addEventListener("click", listProduct);

function addBalance() {
    const content = document.querySelector("#content");
    content.innerHTML = `
        <h2>Bakiye Ekle</h2>
        <input type="number" id="balance-input" placeholder="Eklemek istediğiniz miktarı girin" />
        <button id="add-balance-submit">Bakiye Yükle</button>
    `;

    document.querySelector("#add-balance-submit").addEventListener("click", () => {
        const money = Number(document.querySelector("#balance-input").value);
        if (money > 0) {
            balance += money;
            alert(`Bakiyenize ${money} TL eklendi. Bakiyeniz: ${balance} TL.`);
        } else {
            alert("Geçersiz bakiye miktarı.");
        }
    });
}

addMoney.addEventListener("click", addBalance);

function buyingProduct() {
    const content = document.querySelector("#content");
    content.innerHTML = "<h2>Ürünler</h2>";

    // Ürünleri listeleme
    products.forEach((product, index) => {
        content.innerHTML += `
            <div>
                <p>${product.name} - Fiyat: ${product.price} TL, Stok: ${product.stock}</p>
                <button class="buying-btn" data-index="${index}">Sepete Ekle</button>
            </div>
        `;
    });

    // Sepete ekleme butonlarına click listener ekleme
    const buttons = document.querySelectorAll('.buying-btn');
    buttons.forEach(button => {
        button.removeEventListener("click", handleProductClick);  // Önceki dinleyicileri temizle
        button.addEventListener("click", handleProductClick);     // Yeni listener ekle
    });
}

function handleProductClick(event) {
    const button = event.target;
    const index = button.dataset.index;
    const product = products[index];

    if (balance >= product.price && product.stock > 0) {
        balance -= product.price;
        product.stock -= 1;

        const cartItem = cart.find(item => item.name === product.name);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ name: product.name, price: product.price, quantity: 1 });
        }

        alert(`${product.name} sepete eklendi. Kalan Bakiye: ${balance} TL`);
    } else if (product.stock === 0) {
        alert("Ürün stokta kalmadı!");
    } else {
        alert("Yetersiz bakiye!");
    }

    // Ürün listesini güncelle
    buyingProduct();
}


buyProduct.addEventListener("click", buyingProduct);

function showingCart() {
    const content = document.querySelector("#content");
    content.innerHTML = "<h2>Sepet</h2>";
    if (cart.length === 0) {
        content.innerHTML += "<p>Sepet boş.</p>";
    } else {
        let cartList = "";
        for (let i = 0; i < cart.length; i++) {
            cartList += `
                <p>${cart[i].name} - Fiyat: ${cart[i].price} TL, Miktar: ${cart[i].quantity}</p>
            `;
        }
        content.innerHTML += cartList;
    }
    return;
}

showCart.addEventListener("click", showingCart);

function ordering() {
    if (cart.length === 0) {
        alert("Sepetiniz boş.");
        return
    }
    alert("Siparişiniz alındı. Kuryemiz en kısa sürede siparişinizi kapınıza getirecektir...");
    return
}

order.addEventListener("click", ordering);