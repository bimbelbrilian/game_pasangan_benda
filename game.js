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
    let currentMode = 'multiplayer'; // 'multiplayer' atau 'singleplayer'
    const SINGLE_PLAYER_TILES = 50; // 25 pasangan
    const MULTI_PLAYER_TILES = 30; // 15 pasangan
    let isAnimating = false; 
    let bgmEnabled = true; 
    let sfxEnabled = true;
    let selectedTheme = 'buah';

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
    // === 2. FUNGSI UTILITAS ===
    // ==============================================

    /**
     * Mengacak array menggunakan Fisher-Yates algorithm
     */
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    /**
     * Menghasilkan array item yang sudah di-shuffle untuk satu set tile.
     */
    function generateBalancedTileSet(theme, mode) {
        const items = themeData[theme];
        if (!items || items.length === 0) {
            console.error('Tema tidak ditemukan:', theme);
            return [];
        }

        const requiredPairs = mode === 'singleplayer' ? 25 : 15;
        const allPairs = [];
        
        // Duplikat setiap item untuk membuat pasangan
        items.forEach(item => {
            allPairs.push(item, item);
        });

        // Jika masih kurang, tambahkan item secara berulang
        while (allPairs.length < requiredPairs * 2) {
            items.forEach(item => {
                if (allPairs.length < requiredPairs * 2) {
                    allPairs.push(item, item);
                }
            });
        }

        const finalItems = allPairs.slice(0, requiredPairs * 2);
        return shuffleArray(finalItems);
    }

    // ==============================================
    // === 3. FUNGSI SINGLE PLAYER HEADER ===
    // ==============================================

    /**
     * Membuat header untuk single player
     */
    function createSinglePlayerHeader() {
        // Hapus header lama jika ada
        removeSinglePlayerHeader();
        
        const player1Area = document.querySelector('.player-panel.player1');
        if (!player1Area) return;
        
        // Buat header baru
        const header = document.createElement('div');
        header.className = 'player-header';
        header.innerHTML = `
            <div class="player-title">Pemain 1</div>
            <div class="player-stats">
                <div class="player-timer">
                    <i class="fas fa-clock"></i>
                    <span id="single-timer">10:00</span>
                </div>
                <div class="player-score">
                    <i class="fas fa-star"></i>
                    <span id="single-score">0</span>
                </div>
            </div>
        `;
        
        // Sisipkan header sebelum grid
        player1Area.insertBefore(header, player1Grid);
        
        // Update display segera setelah dibuat
        updateSinglePlayerDisplay();
    }

    /**
     * Menghapus header single player
     */
    function removeSinglePlayerHeader() {
        const existingHeader = document.querySelector('.player-header');
        if (existingHeader) {
            existingHeader.remove();
        }
    }

    /**
     * Update display untuk single player
     */
    function updateSinglePlayerDisplay() {
        if (currentMode !== 'singleplayer') return;
        
        const singleTimer = document.getElementById('single-timer');
        const singleScore = document.getElementById('single-score');
        
        if (singleTimer) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            singleTimer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
        
        if (singleScore) {
            singleScore.textContent = player1Score;
        }
    }

    // ==============================================
    // === 4. FUNGSI GENERATOR DAN LOGIKA TILE ===
    // ==============================================

    /**
     * Membuat tile (kartu) untuk grid pemain tertentu dari array item yang sudah balance.
     */
    function createTiles(player, items) {
        const grid = player === 'player1' ? player1Grid : player2Grid;
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const textStyle = {
            color: '#000000',
            textShadow: '1px 1px 0 #FFFFFF, -1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, 0 0 4px #FFFFFF',
            fontWeight: 'bold'
        };
        
        items.forEach((item, index) => {
            const colorIndex = (index % 20) + 1;

            const tile = document.createElement('div');
            tile.className = `tile card-variant-${colorIndex}`;
            tile.dataset.id = item.id;
            tile.dataset.value = item.name;

            if (item.icon) {
                tile.classList.add('with-icon');
                
                const iconDiv = document.createElement('div');
                iconDiv.className = 'tile-icon';
                iconDiv.textContent = item.icon;
                iconDiv.style.fontSize = currentMode === 'singleplayer' ? '1.5rem' : '1.8rem';
                Object.assign(iconDiv.style, textStyle);
                
                const labelDiv = document.createElement('div');
                labelDiv.className = 'tile-label';
                labelDiv.textContent = item.name;
                Object.assign(labelDiv.style, textStyle);
                labelDiv.style.fontSize = currentMode === 'singleplayer' ? '0.6rem' : '0.7rem';
                
                tile.appendChild(iconDiv);
                tile.appendChild(labelDiv);
                
                if (currentTheme === 'warna' && item.color) {
                    tile.style.background = item.color;
                }
            } else if (item.text) {
                tile.classList.add('with-text');
                tile.textContent = item.text;
                Object.assign(tile.style, textStyle);
                tile.style.fontSize = currentMode === 'singleplayer' ? '1.2rem' : '1.5rem';
            }

            tile.addEventListener('click', () => handleTileClick(player, tile));
            grid.appendChild(tile);
        });
    }

    /**
     * Menangani klik pada ubin.
     */
    function handleTileClick(player, tile) {
        if (!gameActive || isAnimating || tile.classList.contains('is-hidden')) return;

        if (typeof playSelectSound === 'function') playSelectSound();

        if (tile.classList.contains('selected')) {
            tile.classList.remove('selected');
            selectedTiles[player] = selectedTiles[player].filter(t => t !== tile);
        } else {
            if (selectedTiles[player].length < 2) {
                tile.classList.add('selected');
                selectedTiles[player].push(tile);
            }
        }

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
            if (typeof playMatchSound === 'function') playMatchSound(); 
            
            tile1.classList.add('matched');
            tile2.classList.add('matched');
            
            if (player === 'player1') {
                player1Score++;
                if (player1ScoreElement) {
                    player1ScoreElement.textContent = player1Score;
                    player1ScoreElement.classList.add('score-update');
                    setTimeout(() => player1ScoreElement.classList.remove('score-update'), 500);
                }
                
                // Update score di header single player
                if (currentMode === 'singleplayer') {
                    updateSinglePlayerDisplay();
                    const singleScore = document.getElementById('single-score');
                    if (singleScore) {
                        singleScore.classList.add('score-update');
                        setTimeout(() => singleScore.classList.remove('score-update'), 500);
                    }
                }
            } else {
                player2Score++;
                if (player2ScoreElement) {
                    player2ScoreElement.textContent = player2Score;
                    player2ScoreElement.classList.add('score-update');
                    setTimeout(() => player2ScoreElement.classList.remove('score-update'), 500);
                }
            }
            
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
    // === 5. FUNGSI UTAMA GAMEFLOW & TIMER ===
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
     * Memulai permainan dengan tema dan mode tertentu
     */
    function startGameWithMode(theme, mode) {
        console.log('Starting game with theme:', theme, 'mode:', mode);
        
        currentTheme = theme;
        currentMode = mode;
        
        clearInterval(timerInterval);
        
        // Reset variables
        player1Score = 0;
        player2Score = 0;
        timeLeft = currentMode === 'singleplayer' ? 600 : 300;
        gameActive = true;
        isAnimating = false;
        
        // Update UI berdasarkan mode
        const container = document.querySelector('.container');
        if (container) {
            if (currentMode === 'singleplayer') {
                container.classList.add('single-player');
            } else {
                container.classList.remove('single-player');
            }
        }
        
        // Reset UI elements
        if (mainMenu) mainMenu.classList.add('hidden');
        if (container) container.style.display = 'flex';
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
        
        // Generate new tiles berdasarkan mode
        if (currentMode === 'singleplayer') {
            const allItems = generateBalancedTileSet(currentTheme, 'singleplayer');
            createTiles('player1', allItems);
            if (player2Grid) player2Grid.innerHTML = '';
            
            // Buat header untuk single player
            createSinglePlayerHeader();
        } else {
            const p1Items = generateBalancedTileSet(currentTheme, 'multiplayer');
            const p2Items = generateBalancedTileSet(currentTheme, 'multiplayer');
            createTiles('player1', p1Items);
            createTiles('player2', p2Items);
            
            // Hapus header single player jika ada
            removeSinglePlayerHeader();
        }

        // Start timer
        startTimer();
        
        console.log('Game started successfully with theme:', theme, 'mode:', mode);
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
            startGameWithMode(currentTheme, currentMode);
        }, 100);
    }
    
    /**
     * Memulai Timer
     */
    function startTimer() {
        clearInterval(timerInterval);
        
        const updateAllTimerDisplays = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            // Update timer di center panel (multiplayer)
            if (timerElement) {
                timerElement.textContent = timeString;
            }
            
            // Update timer di header (singleplayer)
            if (currentMode === 'singleplayer') {
                const singleTimer = document.getElementById('single-timer');
                if (singleTimer) {
                    singleTimer.textContent = timeString;
                }
            }
        };

        updateAllTimerDisplays();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateAllTimerDisplays();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                gameActive = false;
                checkGameEnd();
            }
        }, 1000);
    }

    /**
     * Memeriksa apakah permainan sudah berakhir.
     */
    function checkGameEnd() {
        const totalTiles = currentMode === 'singleplayer' ? SINGLE_PLAYER_TILES : MULTI_PLAYER_TILES;
        const WIN_SCORE = totalTiles / 2;

        if (currentMode === 'singleplayer') {
            if (player1Score >= WIN_SCORE) {
                clearInterval(timerInterval);
                gameActive = false;
                showWinner('Selamat! Anda Menang!');
                return;
            }
        } else {
            if (player1Score >= WIN_SCORE) {
                clearInterval(timerInterval);
                gameActive = false;
                showWinner('Pemain 1 Menang!');
                return;
            }

            if (player2Score >= WIN_SCORE) {
                clearInterval(timerInterval);
                gameActive = false;
                showWinner('Pemain 2 Menang!');
                return;
            }
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameActive = false;
            if (currentMode === 'singleplayer') {
                showWinner('Waktu Habis!');
            } else {
                if (player1Score > player2Score) {
                    showWinner('Pemain 1 Menang!');
                } else if (player2Score > player1Score) {
                    showWinner('Pemain 2 Menang!');
                } else {
                    showWinner('Seri!');
                }
            }
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
        
        // Reset layout single player
        removeSinglePlayerHeader();
        const container = document.querySelector('.container');
        if (container) {
            container.classList.remove('single-player');
        }
        
        currentMode = 'multiplayer';
    }

    // ==============================================
    // === 6. FUNGSI MODAL & INISIALISASI ===
    // ==============================================

    /**
     * Menampilkan modal pemilihan mode
     */
    function showModeSelectionModal() {
        const modeModal = document.getElementById('mode-selection-modal');
        const selectedThemeName = document.getElementById('selected-theme-name');
        
        if (selectedThemeName) {
            selectedThemeName.textContent = themeNames[selectedTheme] || selectedTheme;
        }
        
        if (modeModal) {
            modeModal.style.display = 'flex';
            void modeModal.offsetWidth;
            modeModal.classList.add('active');
        }
    }

    /**
     * Menyembunyikan modal pemilihan mode
     */
    function hideModeSelectionModal() {
        const modeModal = document.getElementById('mode-selection-modal');
        
        if (modeModal) {
            modeModal.classList.remove('active');
            setTimeout(() => {
                modeModal.style.display = 'none';
            }, 300);
        }
    }

    function initGame() {
        console.log('Initializing game...');
        
        // Event Listeners untuk Tombol Tema di Menu - GUNAKAN MODAL
        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Theme button clicked:', btn.dataset.theme);
                if (typeof playMenuSound === 'function') playMenuSound(); 
                
                // Simpan tema yang dipilih dan tampilkan modal mode
                selectedTheme = btn.dataset.theme;
                showModeSelectionModal();
            });
        });

        // Event Listeners untuk Modal Mode Selection
        const modeModal = document.getElementById('mode-selection-modal');
        const modeOptionBtns = document.querySelectorAll('.mode-option-btn');
        const backToThemesBtn = document.getElementById('back-to-themes-btn');

        if (modeOptionBtns) {
            modeOptionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const mode = btn.dataset.mode;
                    console.log('Mode selected:', mode);
                    if (typeof playMenuSound === 'function') playMenuSound();
                    
                    // Tutup modal dan mulai game
                    hideModeSelectionModal();
                    startGameWithMode(selectedTheme, mode);
                });
            });
        }

        if (backToThemesBtn) {
            backToThemesBtn.addEventListener('click', () => {
                if (typeof playMenuSound === 'function') playMenuSound();
                hideModeSelectionModal();
            });
        }

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
                sfxEnabled = !sfxEnabled;
                this.innerHTML = sfxEnabled ? '<i class="fas fa-bell"></i>' : '<i class="fas fa-bell-slash"></i>';
            });
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
