const text = "Premium";
const container = document.querySelector('.letter-container');
container.innerHTML = '';

[...text].forEach((char, i) => {
  const span = document.createElement('span');
  span.textContent = char;
  span.className = 'letter';
  span.style.animationDelay = `${i * 0.08}s`;
  container.appendChild(span);
});