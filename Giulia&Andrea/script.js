// Countdown
const countdownDate = new Date("Jul 18, 2026 16:00:00").getTime();

const countdownFunction = setInterval(function() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("timer").innerHTML = "Il grande giorno è arrivato!";
  }
}, 1000);

// Form RSVP
const form = document.getElementById("rsvp-form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  
  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    attendance: formData.get("attendance"),
    allergies: formData.get("allergies"),
    notes: formData.get("notes"),
  };

  // Invia dati al foglio Google
  fetch("https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec", {
    method: "POST",
    body: JSON.stringify(data),
  }).then(response => {
    if (response.ok) {
      document.getElementById("form-status").innerHTML = "RSVP inviato con successo!";
      form.reset();
    } else {
      document.getElementById("form-status").innerHTML = "Errore nell'invio, riprova!";
    }
  });
});
