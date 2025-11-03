const pageButtons = document.querySelectorAll('.page-btn');
const pages = document.querySelectorAll('.page');
const copyFeedback = document.getElementById('copyFeedback');
let copyFeedbackTimeout;

pageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = button.dataset.page;
        
        if (button.classList.contains('active')) return;
        
        pageButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        pages.forEach(page => {
            const isTarget = page.id === targetPage + '-page';
            page.classList.toggle('active', isTarget);
        });
    });
});

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

    copyToClipboard(template, '✓ Шаблон скопирован!');
}

async function copyToClipboard(text, message) {
    try {
        await navigator.clipboard.writeText(text);
        showCopyFeedback(message);
    } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.cssText = 'position:fixed;opacity:0;left:-9999px;top:-9999px;pointer-events:none;';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback(message);
        } catch (copyErr) {
            console.error('Ошибка при копировании:', copyErr);
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

function showCopyFeedback(message) {
    if (copyFeedbackTimeout) {
        clearTimeout(copyFeedbackTimeout);
    }
    
    copyFeedback.textContent = message;
    copyFeedback.classList.add('show');
    
    copyFeedbackTimeout = setTimeout(() => {
        copyFeedback.classList.remove('show');
    }, 2000);
}