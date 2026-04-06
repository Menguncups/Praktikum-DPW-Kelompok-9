
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
const langLabel = document.getElementById('langLabel');

// Data bahasa
const langData = {
    id: {
        label: 'ID',
        htmlLang: 'id'
    },
    en: {
        label: 'EN',
        htmlLang: 'en'
    }
};

// Apply bahasa
function applyLang(lang) {
    const d = langData[lang];

    document.documentElement.lang = d.htmlLang;
    langLabel.textContent = d.label;
    langBtn.dataset.lang = lang;

    console.log('Bahasa aktif:', lang);
}

// Toggle saat klik
langBtn.addEventListener('click', () => {
    const current = langBtn.dataset.lang;
    const next = current === 'id' ? 'en' : 'id';

    applyLang(next);
});

// Init awal
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


const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;

        const increment = target / 100; // kecepatan animasi

        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target;
        }
    };

    updateCounter();
});
