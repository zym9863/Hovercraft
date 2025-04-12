// 特效控制器
class EffectController {
    constructor() {
        this.init();
        this.loadFromUrl();
        this.loadFromStorage();
        this.bindEvents();
        this.updateEffects();
        this.generateCode();
    }

    init() {
        // 获取DOM元素
        this.speedInput = document.getElementById('effect-speed');
        this.scaleInput = document.getElementById('effect-scale');
        this.typeSelect = document.getElementById('effect-type');
        this.timingSelect = document.getElementById('effect-timing');
        this.exportCode = document.getElementById('export-code');
        this.copyButton = document.getElementById('copy-code');
        this.effectItems = document.querySelectorAll('.effect-item');

        // 初始化状态
        this.state = {
            speed: this.speedInput.value,
            scale: this.scaleInput.value,
            type: this.typeSelect.value,
            timing: this.timingSelect.value
        };
    }

    loadFromUrl() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('type')) this.typeSelect.value = params.get('type');
        if (params.has('speed')) this.speedInput.value = params.get('speed');
        if (params.has('scale')) this.scaleInput.value = params.get('scale');
    }

    loadFromStorage() {
        const saved = localStorage.getItem('hovercraft-settings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.speedInput.value = settings.speed;
            this.scaleInput.value = settings.scale;
            this.typeSelect.value = settings.type;
        }
    }

    saveToStorage() {
        localStorage.setItem('hovercraft-settings', JSON.stringify(this.state));
    }

    bindEvents() {
        // 监听控制面板变化
        this.speedInput.addEventListener('input', () => this.updateEffects());
        this.scaleInput.addEventListener('input', () => this.updateEffects());
        this.typeSelect.addEventListener('change', () => this.updateEffects());
        this.timingSelect.addEventListener('change', () => this.updateEffects());

        // 复制代码按钮
        this.copyButton.addEventListener('click', () => this.copyCode());

        // 特效项目点击
        this.effectItems.forEach(item => {
            item.addEventListener('click', () => {
                const effect = item.dataset.effect;
                this.typeSelect.value = effect;
                this.updateEffects();
            });
        });
    }

    updateEffects() {
        // 更新状态
        this.state = {
            speed: this.speedInput.value,
            scale: this.scaleInput.value,
            type: this.typeSelect.value,
            timing: this.timingSelect.value
        };

        // 更新CSS变量
        document.documentElement.style.setProperty('--effect-speed', `${this.state.speed}s`);
        document.documentElement.style.setProperty('--effect-timing', this.state.timing);
        document.documentElement.style.setProperty('--effect-scale', this.state.scale);

        // 更新选中的特效
        this.effectItems.forEach(item => {
            item.style.opacity = item.dataset.effect === this.state.type ? '1' : '0.6';
        });

        // 保存设置
        this.saveToStorage();

        // 更新URL参数
        const url = new URL(window.location);
        Object.entries(this.state).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        window.history.replaceState({}, '', url);

        // 生成代码
        this.generateCode();
    }

    generateCode() {
        const code = `/* Hovercraft 悬浮特效 */
.hover-element {
    transition: all ${this.state.speed}s ease-in-out;
}

.hover-element:hover {
    ${this.getEffectCode()}
}`;

        this.exportCode.textContent = code;
    }

    getEffectCode() {
        switch (this.state.type) {
            case 'scale':
                return `transform: scale(${this.state.scale});`;
            case 'rotate':
                return `transform: rotate(${(this.state.scale - 1) * 360}deg);`;
            case 'glow':
                return `box-shadow: 0 0 ${20 * this.state.scale}px rgba(74, 144, 226, 0.6);`;
            case 'blur':
                return `filter: blur(${2 * this.state.scale}px);`;
            case 'skew':
                return `transform: skew(${-15 * this.state.scale}deg);`;
            case 'border':
                return `border-color: white;
    box-shadow: 0 0 ${10 * this.state.scale}px rgba(255, 255, 255, 0.5);`;
            default:
                return '';
        }
    }

    async copyCode() {
        try {
            await navigator.clipboard.writeText(this.exportCode.textContent);
            this.copyButton.textContent = '已复制！';
            setTimeout(() => {
                this.copyButton.textContent = '复制代码';
            }, 2000);
        } catch (err) {
            console.error('复制失败:', err);
            this.copyButton.textContent = '复制失败';
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new EffectController();
});