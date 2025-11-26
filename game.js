document.addEventListener('DOMContentLoaded', function() {
    // ==============================================
    // === 1. DEKLARASI VARIABEL GLOBAL & DATA TEME ===
    // ==============================================

    let player1Score = 0;
    let player2Score = 0;
    let timeLeft = 300; // 5 menit default
    let gameActive = true;
    let timerInterval;
    let selectedTiles = {
        player1: [],
        player2: []
    };
    let currentTheme = 'buah';
    const WINNING_SCORE_LIMIT = 30; 
    const TILES_PER_PLAYER = 30; 
    let isAnimating = false; 
    let bgmEnabled = true; 
    let sfxEnabled = true;

    // Data untuk setiap tema
    const themeData = {
        buah: [
            { id: 'apel', name: 'Apel', icon: '🍎' },
            { id: 'pisang', name: 'Pisang', icon: '🍌' },
            { id: 'jeruk', name: 'Jeruk', icon: '🍊' },
            { id: 'anggur', name: 'Anggur', icon: '🍇' },
            { id: 'semangka', name: 'Semangka', icon: '🍉' },
            { id: 'stroberi', name: 'Stroberi', icon: '🍓' },
            { id: 'nanas', name: 'Nanas', icon: '🍍' },
            { id: 'ceri', name: 'Ceri', icon: '🍒' },
            { id: 'pepaya', name: 'Pepaya', icon: '🍈' },
            { id: 'mangga', name: 'Mangga', icon: '🥭' },
            { id: 'kiwi', name: 'Kiwi', icon: '🥝' },
            { id: 'kelapa', name: 'Kelapa', icon: '🥥' },
            { id: 'pir', name: 'Pir', icon: '🍐' },
            { id: 'persik', name: 'Persik', icon: '🍑' },
            { id: 'lemon', name: 'Lemon', icon: '🍋' }
        ],
        transportasi: [
            { id: 'mobil', name: 'Mobil', icon: '🚗' },
            { id: 'bis', name: 'Bis', icon: '🚌' },
            { id: 'truk', name: 'Truk', icon: '🚚' },
            { id: 'sepeda', name: 'Sepeda', icon: '🚲' },
            { id: 'motor', name: 'Motor', icon: '🏍️' },
            { id: 'pesawat', name: 'Pesawat', icon: '✈️' },
            { id: 'kereta', name: 'Kereta', icon: '🚂' },
            { id: 'kapal', name: 'Kapal', icon: '🚢' },
            { id: 'helikopter', name: 'Helikopter', icon: '🚁' },
            { id: 'ambulans', name: 'Ambulans', icon: '🚑' },
            { id: 'pemadam', name: 'Pemadam', icon: '🚒' },
            { id: 'sepeda_motor', name: 'Sepeda Motor', icon: '🛵' },
            { id: 'skuter', name: 'Skuter', icon: '🛴' },
            { id: 'perahu', name: 'Perahu', icon: '⛵' },
            { id: 'metro', name: 'Metro', icon: '🚇' }
        ],
        hewan: [
            { id: 'kucing', name: 'Kucing', icon: '🐱' },
            { id: 'anjing', name: 'Anjing', icon: '🐶' },
            { id: 'burung', name: 'Burung', icon: '🐦' },
            { id: 'ikan', name: 'Ikan', icon: '🐠' },
            { id: 'kelinci', name: 'Kelinci', icon: '🐰' },
            { id: 'beruang', name: 'Beruang', icon: '🐻' },
            { id: 'panda', name: 'Panda', icon: '🐼' },
            { id: 'gajah', name: 'Gajah', icon: '🐘' },
            { id: 'jerapah', name: 'Jerapah', icon: '🦒' },
            { id: 'singa', name: 'Singa', icon: '🦁' },
            { id: 'harimau', name: 'Harimau', icon: '🐯' },
            { id: 'monyet', name: 'Monyet', icon: '🐵' },
            { id: 'koala', name: 'Koala', icon: '🐨' },
            { id: 'katak', name: 'Katak', icon: '🐸' },
            { id: 'kuda', name: 'Kuda', icon: '🐴' }
        ],
        rumah: [
            { id: 'kursi', name: 'Kursi', icon: '🪑' },
            { id: 'meja', name: 'Meja', icon: '🪑' },
            { id: 'tempat_tidur', name: 'Tempat Tidur', icon: '🛏️' },
            { id: 'lampu', name: 'Lampu', icon: '💡' },
            { id: 'tv', name: 'TV', icon: '📺' },
            { id: 'kulkas', name: 'Kulkas', icon: '🧊' },
            { id: 'telepon', name: 'Telepon', icon: '📱' },
            { id: 'komputer', name: 'Komputer', icon: '💻' },
            { id: 'buku', name: 'Buku', icon: '📚' },
            { id: 'jam', name: 'Jam', icon: '⏰' },
            { id: 'cermin', name: 'Cermin', icon: '🪞' },
            { id: 'sapu', name: 'Sapu', icon: '🧹' },
            { id: 'ember', name: 'Ember', icon: '🪣' },
            { id: 'pintu', name: 'Pintu', icon: '🚪' },
            { id: 'jendela', name: 'Jendela', icon: '🪟' }
        ],
        tulis: [
            { id: 'pensil', name: 'Pensil', icon: '✏️' },
            { id: 'pulpen', name: 'Pulpen', icon: '🖊️' },
            { id: 'penghapus', name: 'Penghapus', icon: '🧼' },
            { id: 'penggaris', name: 'Penggaris', icon: '📏' },
            { id: 'buku_tulis', name: 'Buku Tulis', icon: '📓' },
            { id: 'pengikat', name: 'Pengikat', icon: '📎' },
            { id: 'gunting', name: 'Gunting', icon: '✂️' },
            { id: 'lem', name: 'Lem', icon: '🧴' },
            { id: 'stapler', name: 'Stapler', icon: '📌' },
            { id: 'kalkulator', name: 'Kalkulator', icon: '🧮' },
            { id: 'map', name: 'Map', icon: '📁' },
            { id: 'spidol', name: 'Spidol', icon: '🖍️' },
            { id: 'pena', name: 'Pena', icon: '🖋️' },
            { id: 'kertas', name: 'Kertas', icon: '📄' },
            { id: 'klip', name: 'Klip', icon: '🖇️' }
        ],
        warna: [
            { id: 'merah', name: 'Merah', icon: '🔴', color: '#FF0000' },
            { id: 'biru', name: 'Biru', icon: '🔵', color: '#0000FF' },
            { id: 'hijau', name: 'Hijau', icon: '🟢', color: '#00FF00' },
            { id: 'kuning', name: 'Kuning', icon: '🟡', color: '#FFFF00' },
            { id: 'ungu', name: 'Ungu', icon: '🟣', color: '#800080' },
            { id: 'jingga', name: 'Jingga', icon: '🟠', color: '#FFA500' },
            { id: 'pink', name: 'Pink', icon: '🌸', color: '#FFC0CB' },
            { id: 'coklat', name: 'Coklat', icon: '🟤', color: '#A52A2A' },
            { id: 'hitam', name: 'Hitam', icon: '⚫', color: '#000000' },
            { id: 'putih', name: 'Putih', icon: '⚪', color: '#FFFFFF' },
            { id: 'abu', name: 'Abu-abu', icon: '⚫', color: '#808080' },
            { id: 'emas', name: 'Emas', icon: '⭐', color: '#FFD700' },
            { id: 'perak', name: 'Perak', icon: '💎', color: '#C0C0C0' },
            { id: 'navy', name: 'Navy', icon: '🌊', color: '#000080' },
            { id: 'teal', name: 'Teal', icon: '🦢', color: '#008080' }
        ],
        bentuk: [
            { id: 'lingkaran', name: 'Lingkaran', icon: '⭕' },
            { id: 'segitiga', name: 'Segitiga', icon: '🔺' },
            { id: 'persegi', name: 'Persegi', icon: '⬛' },
            { id: 'persegi_panjang', name: 'Persegi Panjang', icon: '📏' },
            { id: 'bintang', name: 'Bintang', icon: '⭐' },
            { id: 'hati', name: 'Hati', icon: '❤️' },
            { id: 'wajik', name: 'Wajik', icon: '♦️' },
            { id: 'oval', name: 'Oval', icon: '🥚' },
            { id: 'trapesium', name: 'Trapesium', icon: '📐' },
            { id: 'segi_lima', name: 'Segi Lima', icon: '⬟' },
            { id: 'segi_enam', name: 'Segi Enam', icon: '⬢' },
            { id: 'silang', name: 'Silang', icon: '❌' },
            { id: 'plus', name: 'Plus', icon: '➕' },
            { id: 'panah', name: 'Panah', icon: '➡️' },
            { id: 'bulan_sabit', name: 'Bulan Sabit', icon: '🌙' }
        ],
        angka: [
            { id: '1', name: '1', text: '1' },
            { id: '2', name: '2', text: '2' },
            { id: '3', name: '3', text: '3' },
            { id: '4', name: '4', text: '4' },
            { id: '5', name: '5', text: '5' },
            { id: '6', name: '6', text: '6' },
            { id: '7', name: '7', text: '7' },
            { id: '8', name: '8', text: '8' },
            { id: '9', name: '9', text: '9' },
            { id: '10', name: '10', text: '10' },
            { id: '11', name: '11', text: '11' },
            { id: '12', name: '12', text: '12' },
            { id: '13', name: '13', text: '13' },
            { id: '14', name: '14', text: '14' },
            { id: '15', name: '15', text: '15' }
        ],
        huruf: [
            { id: 'A', name: 'A', text: 'A' },
            { id: 'B', name: 'B', text: 'B' },
            { id: 'C', name: 'C', text: 'C' },
            { id: 'D', name: 'D', text: 'D' },
            { id: 'E', name: 'E', text: 'E' },
            { id: 'F', name: 'F', text: 'F' },
            { id: 'G', name: 'G', text: 'G' },
            { id: 'H', name: 'H', text: 'H' },
            { id: 'I', name: 'I', text: 'I' },
            { id: 'J', name: 'J', text: 'J' },
            { id: 'K', name: 'K', text: 'K' },
            { id: 'L', name: 'L', text: 'L' },
            { id: 'M', name: 'M', text: 'M' },
            { id: 'N', name: 'N', text: 'N' },
            { id: 'O', name: 'O', text: 'O' }
        ]
    };

    // Nama tema untuk display
    const themeNames = {
        buah: 'Buah-buahan',
        transportasi: 'Alat Transportasi',
        hewan: 'Hewan',
        rumah: 'Benda di Rumah',
        tulis: 'Alat Tulis',
        warna: 'Warna',
        bentuk: 'Bentuk Geometri',
        angka: 'Angka',
        huruf: 'Huruf'
    };

    // Elemen DOM
    const mainMenu = document.getElementById('main-menu');
    const menuBtn = document.getElementById('menu-btn');
    const themeBtns = document.querySelectorAll('.theme-btn');
    const player1Grid = document.getElementById('player1-grid');
    const player2Grid = document.getElementById('player2-grid');
    const player1ScoreElement = document.getElementById('player1-score');
    const player2ScoreElement = document.getElementById('player2-score');
    const timerElement = document.getElementById('timer');
    const themeDisplay = document.getElementById('theme-display');
    const winnerPopup = document.getElementById('winner-popup');
    const winnerTitle = document.querySelector('#winner-popup .winner-title');
    const winnerMessage = document.getElementById('winner-message');
    const popupPlayer1Score = document.getElementById('popup-player1-score');
    const popupPlayer2Score = document.getElementById('popup-player2-score');
    const bgmToggle = document.getElementById('bgm-toggle');
    const sfxToggle = document.getElementById('sfx-toggle');

    // ==============================================
    // === 2. FUNGSI GENERATOR DAN LOGIKA TILE ===
    // ==============================================

    /**
     * Menghasilkan array item yang sudah di-shuffle untuk satu set 30 ubin (15 pasang).
     */
    function generateBalancedTileSet(theme) {
        const items = themeData[theme];
        if (!items || items.length === 0) {
            console.error('Tema tidak ditemukan:', theme);
            return [];
        }

        const requiredPairs = 15;
        const allPairs = [];
        
        // Duplikasi setiap item untuk membuat pasangan
        items.forEach(item => {
            allPairs.push(item, item);
        });

        // Jika jumlah item kurang dari 15, tambahkan item secara berulang
        while (allPairs.length < requiredPairs * 2) {
            items.forEach(item => {
                if (allPairs.length < requiredPairs * 2) {
                    allPairs.push(item, item);
                }
            });
        }

        // Potong ke 30 item jika lebih
        const finalItems = allPairs.slice(0, requiredPairs * 2);
        
        // Acak array
        if (typeof shuffleArray === 'function') {
            return shuffleArray(finalItems);
        } else {
            return finalItems;
        }
    }

    /**
 * Membuat 30 ubin (kartu) untuk grid pemain tertentu dari array item yang sudah balance.
 */
function createTiles(player, items) {
    const grid = player === 'player1' ? player1Grid : player2Grid;
    grid.innerHTML = '';
    
    items.forEach((item, index) => {
        const colorIndex = (index % 20) + 1;

        const tile = document.createElement('div');
        tile.className = `tile card-variant-${colorIndex}`;
        tile.dataset.id = item.id;
        tile.dataset.value = item.name;

        tile.innerHTML = ''; // Clear existing content

        if (item.icon) {
            tile.classList.add('with-icon');
            const iconDiv = document.createElement('div');
            iconDiv.className = 'tile-icon';
            iconDiv.textContent = item.icon;
            iconDiv.style.fontSize = '1.8rem';
            // Atur shadow putih untuk ikon
            iconDiv.style.textShadow = '1px 1px 0 #FFFFFF, -1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, 0 0 4px #FFFFFF';
            
            const labelDiv = document.createElement('div');
            labelDiv.className = 'tile-label';
            labelDiv.textContent = item.name;
            // Atur warna hitam dan shadow putih untuk label
            labelDiv.style.color = '#000000';
            labelDiv.style.textShadow = '1px 1px 0 #FFFFFF, -1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, 0 0 4px #FFFFFF';
            labelDiv.style.fontWeight = 'bold';
            
            tile.appendChild(iconDiv);
            tile.appendChild(labelDiv);
            
            // Untuk tema warna, atur background color
            if (currentTheme === 'warna' && item.color) {
                tile.style.background = item.color;
                // Tetap gunakan teks hitam dengan shadow putih
            }
        } else if (item.text) {
            tile.classList.add('with-text');
            tile.textContent = item.text;
            // Atur warna hitam dan shadow putih untuk teks
            tile.style.color = '#000000';
            tile.style.textShadow = '1px 1px 0 #FFFFFF, -1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, 0 0 4px #FFFFFF';
            tile.style.fontWeight = 'bold';
        }

        // Tambahkan listener klik
        tile.addEventListener('click', () => handleTileClick(player, tile));
        grid.appendChild(tile);
    });
}

    /**
     * Fungsi helper untuk menentukan warna teks kontras
     */
    function getContrastColor(hexColor) {
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#FFFFFF';
    }

    /**
     * Menangani klik pada ubin.
     */
    function handleTileClick(player, tile) {
        if (!gameActive || isAnimating || tile.classList.contains('is-hidden')) return;

        if (typeof playSelectSound === 'function') playSelectSound();

        // Toggle selected state
        if (tile.classList.contains('selected')) {
            tile.classList.remove('selected');
            selectedTiles[player] = selectedTiles[player].filter(t => t !== tile);
        } else {
            // Memastikan pemain hanya dapat memilih maksimal 2 ubin miliknya sendiri
            if (selectedTiles[player].length < 2) {
                tile.classList.add('selected');
                selectedTiles[player].push(tile);
            }
        }

        // Cek pasangan jika sudah ada 2 ubin terpilih
        if (selectedTiles[player].length === 2) {
            checkMatch(player);
        }
    }
    
    /**
     * Memeriksa apakah ubin yang dipilih cocok.
     */
    function checkMatch(player) {
        isAnimating = true;
        const [tile1, tile2] = selectedTiles[player];
        const id1 = tile1.dataset.id;
        const id2 = tile2.dataset.id;

        if (id1 === id2) {
            // Match
            if (typeof playMatchSound === 'function') playMatchSound(); 
            
            tile1.classList.add('matched');
            tile2.classList.add('matched');
            
            // Perbarui Skor
            if (player === 'player1') {
                player1Score++;
                player1ScoreElement.textContent = player1Score;
                player1ScoreElement.classList.add('score-update');
                setTimeout(() => player1ScoreElement.classList.remove('score-update'), 500);
            } else {
                player2Score++;
                player2ScoreElement.textContent = player2Score;
                player2ScoreElement.classList.add('score-update');
                setTimeout(() => player2ScoreElement.classList.remove('score-update'), 500);
            }
            
            // Sembunyikan ubin tanpa menghapus dari DOM
            setTimeout(() => {
                tile1.classList.add('is-hidden');
                tile2.classList.add('is-hidden');
                tile1.classList.remove('selected', 'matched');
                tile2.classList.remove('selected', 'matched');
                
                selectedTiles[player] = [];
                isAnimating = false;
                checkGameEnd();
            }, 500);

        } else {
            // Wrong Match
            if (typeof playWrongSound === 'function') playWrongSound(); 
            
            tile1.classList.add('wrong');
            tile2.classList.add('wrong');
            
            setTimeout(() => {
                tile1.classList.remove('selected', 'wrong');
                tile2.classList.remove('selected', 'wrong');
                selectedTiles[player] = [];
                isAnimating = false;
            }, 800);
        }
    }

    // ==============================================
    // === 3. FUNGSI UTAMA GAMEFLOW & TIMER ===
    // ==============================================

    /**
     * Membersihkan semua state game
     */
    function cleanupGame() {
        clearInterval(timerInterval);
        gameActive = false;
        isAnimating = false;
        selectedTiles.player1 = [];
        selectedTiles.player2 = [];
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('selected', 'matched', 'wrong', 'is-hidden');
        });
    }

    /**
     * Memulai permainan dengan tema tertentu.
     */
    function startGame(theme) {
        console.log('startGame() called with theme:', theme);
        
        clearInterval(timerInterval);
        
        // Reset variables
        currentTheme = theme;
        player1Score = 0;
        player2Score = 0;
        timeLeft = 300;
        gameActive = true;
        isAnimating = false;
        
        // Reset UI elements
        mainMenu.classList.add('hidden');
        if (document.querySelector('.container')) {
            document.querySelector('.container').style.display = 'flex';
        }
        
        if (winnerPopup) {
            winnerPopup.classList.remove('active');
            winnerPopup.style.display = 'none';
        }
        
        // Update displays
        if (themeDisplay) themeDisplay.textContent = themeNames[theme] || theme;
        if (player1ScoreElement) player1ScoreElement.textContent = player1Score;
        if (player2ScoreElement) player2ScoreElement.textContent = player2Score;
        
        // Clear existing tiles
        if (player1Grid) player1Grid.innerHTML = '';
        if (player2Grid) player2Grid.innerHTML = '';
        
        // Generate new tiles
        const p1Items = generateBalancedTileSet(currentTheme);
        const p2Items = generateBalancedTileSet(currentTheme);
        
        createTiles('player1', p1Items);
        createTiles('player2', p2Items);

        // Start timer
        startTimer();
        
        console.log('Game started successfully with theme:', theme);
    }

    /**
     * Mereset permainan tanpa mengubah tema (untuk "Main Lagi").
     */
    function resetGame() {
        console.log('resetGame() called');
        
        cleanupGame();
        
        if (winnerPopup) {
            winnerPopup.classList.remove('active');
            winnerPopup.style.display = 'none';
        }
        
        setTimeout(() => {
            startGame(currentTheme);
        }, 100);
    }
    
    /**
     * Memulai Timer 5 menit (300 detik).
     */
    function startTimer() {
        clearInterval(timerInterval);
        
        const updateTimerDisplay = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            if (timerElement) {
                timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
        };

        updateTimerDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                gameActive = false;
                showWinner('Waktu Habis!');
            }
        }, 1000);
    }

    /**
     * Memeriksa apakah permainan sudah berakhir.
     */
    function checkGameEnd() {
        const PLAYER_WIN_SCORE = TILES_PER_PLAYER / 2; // 30 / 2 = 15
        const totalScore = player1Score + player2Score;

        if (player1Score >= PLAYER_WIN_SCORE) {
            clearInterval(timerInterval);
            gameActive = false;
            showWinner('Pemain 1 Menang!');
            return;
        }

        if (player2Score >= PLAYER_WIN_SCORE) {
            clearInterval(timerInterval);
            gameActive = false;
            showWinner('Pemain 2 Menang!');
            return;
        }

        if (totalScore >= WINNING_SCORE_LIMIT) {
             clearInterval(timerInterval);
             gameActive = false;
             showWinner('Seri!'); 
             return;
        }
    }

    /**
     * Menampilkan pop-up pemenang.
     */
    function showWinner(message) {
        cleanupGame();
        
        setTimeout(() => {
            if (typeof createConfetti === 'function') createConfetti();
            if (typeof playWinSound === 'function') playWinSound(); 

            if (winnerTitle) winnerTitle.textContent = message.includes('Menang') ? 'SELAMAT!' : message;
            if (winnerMessage) winnerMessage.textContent = message;
            if (popupPlayer1Score) popupPlayer1Score.textContent = player1Score;
            if (popupPlayer2Score) popupPlayer2Score.textContent = player2Score;
            
            if (winnerPopup) {
                winnerPopup.style.display = 'flex';
                void winnerPopup.offsetWidth;
                winnerPopup.classList.add('active');
            }
            
            console.log('Popup activated, buttons should be clickable');
            
        }, 50);
    }
    
    /**
     * Kembali ke menu utama.
     */
    function backToMenu() {
        cleanupGame();
        if (winnerPopup) {
            winnerPopup.classList.remove('active');
        }
        if (mainMenu) {
            mainMenu.classList.remove('hidden');
        }
        if (document.querySelector('.container')) {
            document.querySelector('.container').style.display = 'none';
        }
    }

    // ==============================================
    // === 4. INISIALISASI DAN EVENT LISTENERS ===
    // ==============================================

    function initGame() {
        console.log('Initializing game...');
        
        // Event Listeners untuk Tombol Tema di Menu
        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Theme button clicked:', btn.dataset.theme);
                if (typeof playMenuSound === 'function') playMenuSound(); 
                const theme = btn.dataset.theme;
                startGame(theme);
            });
        });
        
        // Event Listeners untuk Tombol Pop-up Pemenang
        const playAgainBtn = document.getElementById('play-again-btn');
        const backToMenuBtn = document.getElementById('back-to-menu-btn');
        
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Play Again clicked');
                if (typeof playMenuSound === 'function') playMenuSound(); 
                resetGame(); 
            });
        }
        
        if (backToMenuBtn) {
            backToMenuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Back to Menu clicked');
                if (typeof playMenuSound === 'function') playMenuSound(); 
                backToMenu(); 
            });
        }
        
        // Tombol Dalam Game
        if (menuBtn) {
            menuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Menu button clicked');
                if (typeof playMenuSound === 'function') playMenuSound(); 
                backToMenu(); 
            });
        }

        // Kontrol Suara
        if (bgmToggle) {
            bgmToggle.addEventListener('click', function() {
                if (typeof playMenuSound === 'function') playMenuSound();
                if (typeof bgmSound !== 'undefined') {
                    bgmEnabled = !bgmEnabled;
                    this.innerHTML = bgmEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
                    bgmEnabled ? bgmSound.play().catch(e => console.error("BGM Play Error:", e)) : bgmSound.pause();
                }
            });
        }
        
        if (sfxToggle) {
            sfxToggle.addEventListener('click', function() {
                if (typeof playMenuSound === 'function') playMenuSound();
                if (typeof sfxEnabled !== 'undefined') {
                    sfxEnabled = !sfxEnabled;
                    this.innerHTML = sfxEnabled ? '<i class="fas fa-bell"></i>' : '<i class="fas fa-bell-slash"></i>';
                }
            });
        }
        
        // Inisialisasi BGM
        if (typeof bgmSound !== 'undefined') {
            bgmSound.loop = true;
            bgmSound.volume = 0.3;
            if (bgmEnabled) {
                bgmSound.play().catch(e => console.error("BGM Start Error:", e));
            }
        }

        // Mobile orientation handling
        if (typeof checkOrientation === 'function') {
            window.addEventListener('resize', checkOrientation);
            window.addEventListener('orientationchange', checkOrientation);
            checkOrientation();
        }
        
        // Tampilkan menu utama di awal
        if (mainMenu) {
            mainMenu.classList.remove('hidden');
        }
        if (document.querySelector('.container')) {
            document.querySelector('.container').style.display = 'none';
        }
        
        console.log('Game initialization complete');
    }

    // Initialize the game
    initGame();
});