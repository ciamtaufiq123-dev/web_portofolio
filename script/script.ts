export {};

const contactForm = document.getElementById('contactForm') as HTMLFormElement;
const fullName = document.getElementById('name') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const message = document.getElementById('message') as HTMLTextAreaElement;
const errorBox = document.getElementById('errorBox') as HTMLDivElement;
const whatsappNumber = '6285215095835';

interface ContactMessage {
    fullName: string;
    email: string;
    message: string;
}

let porto: ContactMessage[] = [];

try {
    const savedMessages: unknown = JSON.parse(localStorage.getItem('porto') || '[]');
    if (Array.isArray(savedMessages)) {
        porto = savedMessages;
    }
} catch {
    porto = [];
}

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();
    const isValid = fullNameValue !== '' && emailValue !== '' && messageValue !== '' && email.checkValidity();

    errorBox.style.display = isValid ? 'none' : 'flex';
    if (!isValid) {
        return;
    }

    const newForm: ContactMessage = {
        fullName: fullNameValue,
        email: emailValue,
        message: messageValue
    };

    porto.push(newForm);
    localStorage.setItem('porto', JSON.stringify(porto));

    const whatsappMessage = [
        'Halo, saya ingin menghubungi Anda.',
        `Nama: ${newForm.fullName}`,
        `Email: ${newForm.email}`,
        `Pesan: ${newForm.message}`
    ].join('\n');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    contactForm.reset();
});

const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const primaryNav = document.getElementById('primary-nav');
const navigation = document.querySelector('nav');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', function() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        themeIcon.classList.toggle('fa-moon', !isDarkMode);
        themeIcon.classList.toggle('fa-sun', isDarkMode);
        themeToggle.setAttribute('aria-label', isDarkMode ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
        themeToggle.setAttribute('title', isDarkMode ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
    });
}

if (menuToggle && primaryNav && navigation) {
    menuToggle.addEventListener('click', function() {
        const isOpen = navigation.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
        menuToggle.setAttribute('title', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    });

    primaryNav.addEventListener('click', function(event: MouseEvent) {
        if (event.target instanceof Element && event.target.closest('a')) {
            navigation.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Buka menu navigasi');
        }
    });
}