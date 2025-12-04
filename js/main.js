// 特效控制器
class EffectController {
    constructor() {
        this.init();
        this.loadFromUrl();
        this.loadFromStorage();
        this.bindEvents();
        this.updateEffects();
        this.generateCode();
        this.updateHistoryUI(); // 初始化历史记录UI
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

    // 保存配置到历史记录
    saveToHistory() {
        const historyKey = 'hovercraft-history';
        const maxHistoryItems = 10;

        // 获取现有历史记录
        let history = JSON.parse(localStorage.getItem(historyKey)) || [];

        // 创建新的历史记录项
        const historyItem = {
            timestamp: new Date().toISOString(),
            ...this.state
        };

        // 添加到历史记录开头（最新的在最前面）
        history.unshift(historyItem);

        // 限制历史记录数量
        if (history.length > maxHistoryItems) {
            history = history.slice(0, maxHistoryItems);
        }

        // 保存到localStorage
        localStorage.setItem(historyKey, JSON.stringify(history));

        // 更新UI显示
        this.updateHistoryUI();
    }

    // 获取历史记录
    getHistory() {
        const historyKey = 'hovercraft-history';
        return JSON.parse(localStorage.getItem(historyKey)) || [];
    }

    // 加载历史记录项
    loadFromHistory(item) {
        // 回填参数到控制面板
        this.speedInput.value = item.speed;
        this.scaleInput.value = item.scale;
        this.typeSelect.value = item.type;
        this.timingSelect.value = item.timing;

        // 立即更新特效
        this.updateEffects();
    }

    // 更新历史记录UI
    updateHistoryUI() {
        const historyList = document.getElementById('history-list');
        if (!historyList) return;

        const history = this.getHistory();

        // 清空列表
        historyList.innerHTML = '';

        // 如果没有历史记录
        if (history.length === 0) {
            const emptyItem = document.createElement('div');
            emptyItem.className = 'history-item empty';
            emptyItem.textContent = '暂无历史配置记录';
            historyList.appendChild(emptyItem);
            return;
        }

        // 创建历史记录项
        history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.dataset.index = index;

            // 格式化时间戳
            const date = new Date(item.timestamp);
            const timeString = date.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            // 获取特效类型名称
            const effectTypeNames = {
                'scale': '缩放',
                'rotate': '旋转',
                'glow': '发光',
                'blur': '模糊',
                'skew': '倾斜',
                'border': '边框'
            };

            const effectName = effectTypeNames[item.type] || item.type;

            // 创建内容HTML
            historyItem.innerHTML = `
                <div class="history-time">${timeString}</div>
                <div class="history-details">
                    <span class="history-effect">${effectName}</span>
                    <span class="history-param">速度:${item.speed}s</span>
                    <span class="history-param">幅度:${item.scale}</span>
                    <span class="history-param">曲线:${item.timing}</span>
                </div>
            `;

            // 添加点击事件
            historyItem.addEventListener('click', () => {
                this.loadFromHistory(item);
            });

            historyList.appendChild(historyItem);
        });
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

            // 保存配置到历史记录
            this.saveToHistory();

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