$(document).ready(function () {
    const playerName = localStorage.getItem('playerName') || 'Tamu';
    $('#displayName').text(playerName);

    let startTime, endTime, timerTimeout;
    let scores = [];
    let isPaused = false; // Menyimpan status jeda permainan

    // Inisialisasi tampilan awal tanpa skor
    $('#scoreHistory').html('<p>Belum Ada Skor Yang Tercatat.</p>');

    // Tombol Start
    $('#startBtn').click(function () {
        scores = [];
        $('#scoreHistory').html('<p>Bermain...</p>');
        $('#message').text('Tunggu Saja...');
        $('#gameBox').removeClass('blue').text('Tunggu Ketika Berubah Warna...');

        // Set timeout acak antara 1-4 detik
        timerTimeout = setTimeout(() => {
            if (!isPaused) { // Lanjutkan hanya jika tidak sedang dijeda
                $('#gameBox').addClass('blue').text('Klik Sekarang!');
                startTime = new Date().getTime();
            }
        }, Math.random() * 3000 + 1000);
    });

    // Klik pada Game Box
    $('#gameBox').click(function () {
        if ($('#gameBox').hasClass('blue')) {
            endTime = new Date().getTime();
            const reactionTime = ((endTime - startTime) / 3000).toFixed(3);

            // Simpan skor jika permainan selesai
            scores.push(reactionTime);
            localStorage.setItem('scores', JSON.stringify(scores));

            $('#reactionTime').text(`Reaksi Waktu Adalah: ${reactionTime} seconds`);
            $('#message').text('Game Over!');
            $('#refreshBtn').removeClass('d-none');

            // Tampilkan skor yang baru
            displayScores();
        }
    });

    // Tombol Pause/Resume
    $('#pauseBtn').click(function () {
        if (!isPaused) {
            // Jika tombol Pause ditekan
            isPaused = true;
            clearTimeout(timerTimeout); // Hentikan timeout
            $('#gameBox').removeClass('blue').text('Game Dijeda');
            $('#message').text('Permainan dijeda. Klik Resume untuk melanjutkan.');
            $('#pauseBtn').text('Lanjutkan'); // Ubah teks tombol menjadi Resume
        } else {
            // Jika tombol Resume ditekan
            isPaused = false;
            $('#message').text('Permainan dilanjutkan...');
            $('#pauseBtn').text('Jeda'); // Ubah teks tombol menjadi Pause

            // Lanjutkan permainan
            timerTimeout = setTimeout(() => {
                if (!isPaused) {
                    $('#gameBox').addClass('blue').text('Klik Sekarang!');
                    startTime = new Date().getTime();
                }
            }, Math.random() * 3000 + 1000);
        }
    });

    // Tombol Reset
    $('#resetBtn').click(function () {
        resetGameState();
        localStorage.removeItem('scores');
        $('#scoreHistory').html('<p>Riwayat skor telah diatur ulang.</p>');
    });

    // Tombol Refresh
    $('#refreshBtn').click(function () {
        location.reload();
    });

    // Tombol Back to Home
    $('#backToHomeBtn').click(function () {
        window.location.href = 'index.html';
    });

    // Fungsi untuk menampilkan skor
    function displayScores() {
        if (scores.length === 0) {
            $('#scoreHistory').html('<p>Belum ada skor yang tercatat.</p>');
        } else {
            let scoreList = '<ul>';
            scores.forEach((score) => {
                scoreList += `<li>Reaksi Waktu: ${score} seconds</li>`;
            });
            scoreList += '</ul>';
            $('#scoreHistory').html(scoreList);
        }
    }

    // Fungsi untuk reset state permainan
    function resetGameState() {
        $('#reactionTime').text('');
        $('#message').text('Bersiap...');
        $('#gameBox').removeClass('blue').text('Klik Tombol Warna Hijau Untuk Memulai Game!');
        $('#refreshBtn').addClass('d-none');
        $('#pauseBtn').text('Jeda'); // Pastikan tombol kembali ke teks Pause
        isPaused = false; // Reset status jeda
    }
});
