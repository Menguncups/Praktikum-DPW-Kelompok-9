
        // ============================================================
        // HAMBURGER TOGGLE (mobile)
        // ============================================================
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navWrapper = document.getElementById('navWrapper');
        const hamburgerIcon = hamburgerBtn.querySelector('i');

        hamburgerBtn.addEventListener('click', () => {
            navWrapper.classList.toggle('open');
            hamburgerIcon.className = navWrapper.classList.contains('open')
                ? 'bi bi-x-lg'
                : 'bi bi-list';
        });

        // ============================================================
        // DROPDOWN TOGGLE (mobile — tap untuk buka/tutup)
        // ============================================================
        document.querySelectorAll('.nav-menu > li > a').forEach(link => {
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 991) {
                    const dropdown = this.nextElementSibling;
                    if (dropdown && dropdown.classList.contains('dropdown-menu-custom')) {
                        e.preventDefault();
                        dropdown.classList.toggle('open');
                    }
                }
            });
        });

        // ============================================================
        // LANGUAGE TOGGLE — klik untuk ganti bahasa (toggle ID ↔ EN)
        // Otomatis pakai gambar jika file tersedia, fallback ke emoji
        // ============================================================
        const langBtn = document.getElementById('langToggleBtn');
        const flagImg = document.getElementById('langFlagImg');
        const flagEmoji = document.getElementById('langFlagEmoji');
        const langLabel = document.getElementById('langLabel');

        // Data bahasa
        const langData = {
            id: {
                src: langBtn.dataset.srcId,
                emoji: langBtn.dataset.emojiId,
                label: 'ID',
                htmlLang: 'id'
            },
            en: {
                src: langBtn.dataset.srcEn,
                emoji: langBtn.dataset.emojiEn,
                label: 'EN',
                htmlLang: 'en'
            }
        };

        // Set tampilan bendera awal
        function applyLang(lang) {
            const d = langData[lang];
            document.documentElement.lang = d.htmlLang;

            // Coba pakai gambar dulu
            flagImg.src = d.src;
            flagImg.alt = d.label;

            // Emoji fallback (tampil jika gambar error)
            flagEmoji.textContent = d.emoji;

            langLabel.textContent = d.label;
            langBtn.dataset.lang = lang;

            // Tampilkan emoji placeholder jika src kosong / belum diisi
            if (!d.src || d.src === 'bendera-en.png' || d.src === 'bendera-id.png') {
                // Cek apakah file benar-benar ada dengan Image()
                const tester = new Image();
                tester.onload = () => { flagImg.style.display = 'block'; flagEmoji.style.display = 'none'; };
                tester.onerror = () => { flagImg.style.display = 'none'; flagEmoji.style.display = 'block'; };
                tester.src = d.src;
            }

            console.log('Bahasa aktif:', lang);
            // Tambahkan logika terjemahan konten halaman di sini
        }

        // Toggle saat diklik
        langBtn.addEventListener('click', () => {
            const current = langBtn.dataset.lang;
            const next = current === 'id' ? 'en' : 'id';

            // Animasi flip bendera
            flagImg.classList.add('flipping');
            flagEmoji.style.animation = 'flagFlip 0.4s ease forwards';

            setTimeout(() => {
                applyLang(next);
                flagImg.classList.remove('flipping');
                flagEmoji.style.animation = '';
            }, 200); // ganti di tengah animasi flip
        });

        // Init tampilan awal (bahasa Indonesia)
        applyLang('id');
// ============================================================
// TUTUP MENU MOBILE SAAT KLIK DI LUAR
// ============================================================
document.addEventListener('click', function (e) {
    const isClickInsideMenu = navWrapper.contains(e.target);
    const isClickHamburger = hamburgerBtn.contains(e.target);

    if (!isClickInsideMenu && !isClickHamburger) {
        navWrapper.classList.remove('open');
        hamburgerIcon.className = 'bi bi-list';

        // Tutup semua dropdown
        document.querySelectorAll('.dropdown-menu-custom').forEach(drop => {
            drop.classList.remove('open');
        });
    }
});


// ============================================================
// RESET SAAT RESIZE (desktop ↔ mobile)
// ============================================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
        navWrapper.classList.remove('open');
        hamburgerIcon.className = 'bi bi-list';

        document.querySelectorAll('.dropdown-menu-custom').forEach(drop => {
            drop.classList.remove('open');
        });
    }
});


// ============================================================
// OPTIONAL: CLOSE MENU SETELAH KLIK LINK (mobile UX lebih enak)
// ============================================================
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
            navWrapper.classList.remove('open');
            hamburgerIcon.className = 'bi bi-list';
        }
    });
});