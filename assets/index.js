/* ── Page switcher (disabled while campaigns page is commented out) ──

const pageButtons = document.querySelectorAll('.page-btn');
const pages = document.querySelectorAll('.page');

pageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = button.dataset.page;
        if (button.classList.contains('active')) return;
        pageButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        pages.forEach(page => {
            page.classList.toggle('active', page.id === targetPage + '-page');
        });
    });
});

*/

const copyFeedback = document.getElementById('copyFeedback');
let copyFeedbackTimeout;

function copyLandingTemplate() {
    const template = `ГЕО:
Язык:
Оффер:
Магазин:
Цена:
Старая цена:
Трекер: бином
Префил:
Шаблон:
С коментами и без`;

    copyToClipboard(template, '✓ Шаблон скопирован');
}

async function copyToClipboard(text, message) {
    try {
        await navigator.clipboard.writeText(text);
        showCopyFeedback(message);
    } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;left:-9999px;top:-9999px;pointer-events:none;';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showCopyFeedback(message);
        } catch (err) {
            console.error('Ошибка копирования:', err);
        } finally {
            document.body.removeChild(ta);
        }
    }
}

function showCopyFeedback(message) {
    if (copyFeedbackTimeout) clearTimeout(copyFeedbackTimeout);
    copyFeedback.textContent = message;
    copyFeedback.classList.add('show');
    copyFeedbackTimeout = setTimeout(() => copyFeedback.classList.remove('show'), 2200);
}