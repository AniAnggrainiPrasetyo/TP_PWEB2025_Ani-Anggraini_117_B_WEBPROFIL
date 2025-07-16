<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = trim($_POST["nama"]);
    $email = trim($_POST["email"]);
    $pesan = trim($_POST["pesan"]);

    if (empty($nama) || empty($email) || empty($pesan)) {
        echo json_encode([
            "status" => "error",
            "message" => "Semua field wajib diisi."
        ]);
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "status" => "error",
            "message" => "Email tidak valid."
        ]);
    } elseif (strlen($pesan) < 10) {
        echo json_encode([
            "status" => "error",
            "message" => "Pesan minimal 10 karakter."
        ]);
    } else {
        // Contoh menyimpan pesan ke file (opsional)
        // file_put_contents('pesan.txt', "$nama - $email - $pesan\n", FILE_APPEND);

        echo json_encode([
            "status" => "success",
            "message" => "Terima kasih, pesan Anda telah diterima!"
        ]);
    }
}
?>
