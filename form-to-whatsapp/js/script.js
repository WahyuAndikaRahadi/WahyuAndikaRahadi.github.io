const nama = document.getElementById('nama');
const pesan = document.getElementById('pesan');

function sendMessageToWhatsapp() {
    const urlToWhatsapp = `https://wa.me/6283816927804?text=Halo, nama saya ${nama.value}, ${pesan.value}`;

    window.open(urlToWhatsapp, "_blank");
}