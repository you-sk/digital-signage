/**
 * @jest-environment jsdom
 */

describe('Digital Signage Basic Tests', () => {
    beforeEach(() => {
        // 最小限のDOM要素をセットアップ
        document.body.innerHTML = `
            <div id="display"></div>
            <div id="control-panel">
                <textarea id="display-text">テストテキスト</textarea>
                <select id="animation-type">
                    <option value="horizontal">横スクロール</option>
                    <option value="vertical">縦スクロール</option>
                    <option value="typewriter">タイプライター</option>
                </select>
                <button id="apply-settings">適用</button>
            </div>
        `;
    });

    // 基本的なDOM要素の存在テスト
    test('基本的なDOM要素が存在すること', () => {
        expect(document.getElementById('display')).toBeTruthy();
        expect(document.getElementById('control-panel')).toBeTruthy();
        expect(document.getElementById('display-text')).toBeTruthy();
        expect(document.getElementById('animation-type')).toBeTruthy();
        expect(document.getElementById('apply-settings')).toBeTruthy();
    });

    // テキスト入力のテスト
    test('テキストエリアに入力できること', () => {
        const textArea = document.getElementById('display-text');
        const newText = 'こんにちは、世界！';
        textArea.value = newText;
        expect(textArea.value).toBe(newText);
    });

    // アニメーションタイプの選択テスト
    test('アニメーションタイプを選択できること', () => {
        const select = document.getElementById('animation-type');
        select.value = 'vertical';
        expect(select.value).toBe('vertical');
    });
});