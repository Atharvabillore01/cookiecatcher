document.addEventListener('DOMContentLoaded', () => {
  const dummyLink = document.getElementById('dummyLink');
  dummyLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior

      // Track the click and attempt to set a dummy cookie
      setCookie('linkClicked', 'true', 7);

      // Send the current cookies to the server
      sendCookieToServer(document.cookie);

      // Optionally redirect the user after setting the cookie
      window.location.href = dummyLink.href;
  });

  showCookies();
});

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function showCookies() {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  console.log(cookies.length ? cookies.join('\n') : 'No cookies found');
}

function sendCookieToServer(cookie) {
  fetch('/save-cookie', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cookie: cookie }),
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
}
