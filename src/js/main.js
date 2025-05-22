let allProducts = [];  // সব প্রোডাক্ট এখানে রাখবো
let visibleCount = 3;  // কতগুলো প্রোডাক্ট দেখাবে শুরুতে

// JSON থেকে ডেটা ফেচ
fetch('src/data/products.json')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(visibleCount); // শুরুতে ৩টা দেখাবে
  });

function renderProducts(count) {
  const container = document.getElementById('product-list');
  container.innerHTML = ''; // আগেরগুলো ক্লিয়ার করো

  allProducts.slice(0, count).forEach(product => {
    const card = document.createElement('div');
    card.className = "border p-4 rounded shadow-md";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="w-full h-40 object-cover mb-2">
      <h2 class="text-lg font-bold">${product.title}</h2>
      <p class="text-green-600 font-semibold">৳${product.price}</p>
    `;
    container.appendChild(card);
  });

  // Load More button visibility control
  const btn = document.getElementById('load-more-btn');
  if (count >= allProducts.length) {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'block';
  }
}

// Load More বাটনে ক্লিক করলে নতুন করে render করবে
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('load-more-btn');
  btn.addEventListener('click', () => {
    visibleCount += 3;
    renderProducts(visibleCount);
  });
});
