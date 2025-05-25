let currentAnimation = null;
let typewriterInterval = null;

// DOMContentLoadedイベントで初期化を行う
document.addEventListener('DOMContentLoaded', () => {
    // 初期設定の適用
    loadAvailableFonts();
    applySettings();

    // フォント選択の変更イベント
    document.getElementById('font-select').addEventListener('change', (e) => {
        const customFontContainer = document.getElementById('custom-font-container');
        if (e.target.value === 'custom') {
            customFontContainer.style.display = 'block';
        } else {
            customFontContainer.style.display = 'none';
        }
    });


    // 適用ボタンのイベントリスナー
    document.getElementById('apply-settings').addEventListener('click', applySettings);

    // フルスクリーンボタンのイベントリスナー
    document.getElementById('fullscreen-toggle').addEventListener('click', toggleFullscreen);

    // コントロールパネルの表示/非表示
    document.getElementById('toggle-controls').addEventListener('click', () => {
        const panel = document.getElementById('control-panel');
        panel.classList.toggle('hidden');
    });

    // キーボードショートカット
    document.addEventListener('keydown', (e) => {
        if (e.key === 'c' || e.key === 'C') {
            const panel = document.getElementById('control-panel');
            panel.classList.toggle('hidden');
        } else if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
    });

    // フルスクリーン時の制御
    document.addEventListener('fullscreenchange', () => {
        const toggleBtn = document.getElementById('toggle-controls');
        if (document.fullscreenElement) {
            toggleBtn.style.display = 'block';
        } else {
            toggleBtn.style.display = 'block';
        }
    });
});


// 初期表示
window.onload = () => {
    loadAvailableFonts();
    applySettings();
};

// ローカルフォントの検出
function loadAvailableFonts() {
    const testFonts = [
        'Arial', 'Georgia', 'Times New Roman', 'Courier New',
        'Verdana', 'Impact', 'Comic Sans MS', 'Trebuchet MS',
        'Noto Sans JP', 'Meiryo', 'Yu Gothic', 'Hiragino Kaku Gothic Pro',
        'MS Gothic', 'MS Mincho', 'Helvetica', 'Tahoma',
        'Palatino', 'Garamond', 'Bookman', 'Avant Garde'
    ];

    const fontSelect = document.getElementById('font-select');

    // 追加のフォントを検出して追加
    testFonts.forEach(font => {
        if (!Array.from(fontSelect.options).some(opt => opt.value === font)) {
            if (isFontAvailable(font)) {
                const option = document.createElement('option');
                option.value = font;
                option.textContent = font;
                fontSelect.insertBefore(option, fontSelect.lastElementChild);
            }
        }
    });
}

// フォントが利用可能か確認
function isFontAvailable(fontName) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const text = 'abcdefghijklmnopqrstuvwxyz0123456789';

    context.font = '72px monospace';
    const baselineSize = context.measureText(text).width;

    context.font = `72px '${fontName}', monospace`;
    const newSize = context.measureText(text).width;

    return newSize !== baselineSize;
}


// 設定を適用
function applySettings() {
    const display = document.getElementById('display');
    const text = document.getElementById('display-text').value;
    const animationType = document.getElementById('animation-type').value;
    const fontSelect = document.getElementById('font-select');
    const customFont = document.getElementById('custom-font').value;
    const font = fontSelect.value === 'custom' ? customFont : fontSelect.value;
    const fontSize = document.getElementById('font-size').value;
    const textColor = document.getElementById('text-color').value;
    const bgColor = document.getElementById('bg-color').value;
    const speed = document.getElementById('animation-speed').value;

    // 背景色を設定
    display.style.backgroundColor = bgColor;

    // 既存のアニメーションをクリア
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }
    display.innerHTML = '';

    // テキスト要素を作成
    const textElement = document.createElement('div');
    textElement.textContent = text;
    textElement.style.fontSize = fontSize + 'px';
    textElement.style.color = textColor;
    textElement.style.fontFamily = font;

    // アニメーションタイプに応じて設定
    switch (animationType) {
        case 'horizontal':
            textElement.className = 'text-scroll-horizontal';
            textElement.style.setProperty('--duration', speed + 's');
            display.appendChild(textElement);
            break;

        case 'vertical':
            textElement.className = 'text-scroll-vertical';
            textElement.style.setProperty('--duration', speed + 's');
            display.appendChild(textElement);
            break;

        case 'typewriter':
            textElement.className = 'text-typewriter';
            textElement.innerHTML = '';
            display.appendChild(textElement);
            typewriterEffect(text, textElement, speed);
            break;
    }
}

// タイプライター効果
function typewriterEffect(text, element, totalDuration) {
    const chars = text.split('');
    const delay = (totalDuration * 1000) / chars.length;
    let index = 0;

    function resetAndRestart() {
        if (typewriterInterval) {
            clearInterval(typewriterInterval);
        }
        element.innerHTML = '';
        index = 0;
        typewriterInterval = setInterval(typeNextChar, delay);
    }

    function typeNextChar() {
        if (index < chars.length) {
            const span = document.createElement('span');
            span.className = 'typewriter-char';
            span.textContent = chars[index];
            span.style.animationDelay = '0s';
            element.appendChild(span);
            index++;
        } else {
            // 全文字表示後、インターバルをクリアして2秒後に再開
            clearInterval(typewriterInterval);
            setTimeout(resetAndRestart, 2000);
        }
    }

    typewriterInterval = setInterval(typeNextChar, delay);
}

// フルスクリーン切り替え
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}