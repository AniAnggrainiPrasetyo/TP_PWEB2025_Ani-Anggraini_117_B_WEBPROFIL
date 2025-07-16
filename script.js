// Fungsi untuk menampilkan halaman (HOME / ABOUT / CONTACT)
function showSection(id) {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Menampilkan notifikasi selamat datang saat halaman dimuat
window.addEventListener("load", function () {
  const notif = document.getElementById("welcome-notification");
  notif.textContent = "Selamat datang di situs ani!";
  notif.style.display = "block";

  setTimeout(() => {
    notif.style.display = "none";
  }, 5000);
});

// Jalankan saat seluruh DOM sudah siap
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseDiv = document.getElementById("formResponse");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset error & respon sebelumnya
    document.getElementById("errorNama").textContent = "";
    document.getElementById("errorEmail").textContent = "";
    document.getElementById("errorPesan").textContent = "";
    responseDiv.innerHTML = "";

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    let valid = true;

    if (nama === "") {
      document.getElementById("errorNama").textContent = "Nama wajib diisi";
      valid = false;
    }
    if (email === "" || !email.includes("@")) {
      document.getElementById("errorEmail").textContent = "Email tidak valid";
      valid = false;
    }
    if (pesan.length < 10) {
      document.getElementById("errorPesan").textContent = "Pesan minimal 10 karakter";
      valid = false;
    }

    if (!valid) return;

    const formData = new FormData(form);

    fetch("proses.php", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        const msgBox = document.createElement("div");
        msgBox.style.marginTop = "20px";
        msgBox.style.padding = "20px";
        msgBox.style.borderRadius = "10px";
        msgBox.style.backgroundColor = data.status === "success" ? "#e6f9ec" : "#ffe6e6";
        msgBox.style.color = data.status === "success" ? "#2e7d32" : "#c62828";
        msgBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        msgBox.style.textAlign = "center";

        if (data.status === "success") {
          msgBox.innerHTML = `
            <h2 style="color:#2e7d32;">${data.message}</h2>
            <p><strong>Nama:</strong> ${nama}</p>
            <p><strong>Pesan:</strong> ${pesan}</p>
            <a href="#" onclick="showSection('home')" style="
              display: inline-block;
              margin-top: 15px;
              padding: 10px 20px;
              background-color: #007BFF;
              color: white;
              text-decoration: none;
              border-radius: 5px;
            ">&larr; Kembali ke Halaman Utama</a>
          `;
          form.reset();
        } else {
          msgBox.textContent = data.message;
        }

        responseDiv.appendChild(msgBox);
      })
      .catch((error) => {
        console.error("Error:", error);
        responseDiv.innerHTML = `<div style="color:red;">Terjadi kesalahan saat mengirim data.</div>`;
      });
  });
});
