document.addEventListener('DOMContentLoaded', () => {
    // Navigation setup
    const menuItems = document.querySelectorAll('.menu-item');
    const views = document.querySelectorAll('.view');
    const pageTitle = document.getElementById('pageTitle');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    // View Switching Logic
    const switchView = (targetViewId) => {
        // Update active menu item
        menuItems.forEach(item => {
            if (item.getAttribute('data-view') === targetViewId) {
                item.classList.add('active');
                // Update header title
                pageTitle.textContent = item.textContent.trim();
            } else {
                item.classList.remove('active');
            }
        });

        // Show target view section
        views.forEach(view => {
            if (view.id === targetViewId) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });

        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('show');
        }
        
        // Initialize charts or specific view logic
        if (targetViewId === 'dashboard') {
            renderDashboard();
        } else if (targetViewId === 'properties') {
            renderPropertyList();
        } else if (targetViewId === 'revenue') {
            renderRevenueView();
        } else if (targetViewId === 'vacancy') {
            renderVacancyView();
        } else if (targetViewId === 'reports') {
            renderReportsView();
        } else if (targetViewId === 'alerts') {
            renderAlertsView();
        } else if (targetViewId === 'settings') {
            renderSettingsView();
        }
    };

    // Event Listeners for menu items
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = item.getAttribute('data-view');
            switchView(viewId);
            window.location.hash = viewId;
        });
    });

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }

    // Initial load based on hash or default to dashboard
    const initialHash = window.location.hash.replace('#', '') || 'dashboard';
    switchView(initialHash);

    // Dashboard Rendering function
    function renderDashboard() {
        const dashboardView = document.getElementById('dashboard');
        
        // Mock data for Dashboard
        const kpiData = [
            { label: '総収益 (今月)', value: '¥12,450,000', change: '+8.2%', status: 'success', icon: 'fa-coins' },
            { label: '稼働率', value: '94.5%', change: '-0.5%', status: 'danger', icon: 'fa-percentage' },
            { label: '空室数', value: '12 / 218', change: '前月比 -2', status: 'warning', icon: 'fa-key' },
            { label: '平均利回り', value: '5.8%', change: '+0.1%', status: 'success', icon: 'fa-chart-pie' }
        ];

        let html = `
            <div class="kpi-grid">
                ${kpiData.map(kpi => `
                    <div class="card kpi-card">
                        <div class="kpi-icon ${kpi.status}">
                            <i class="fas ${kpi.icon}"></i>
                        </div>
                        <div class="kpi-info">
                            <span class="kpi-label">${kpi.label}</span>
                            <div class="kpi-value-wrap">
                                <span class="kpi-value">${kpi.value}</span>
                                <span class="kpi-change ${kpi.status}">${kpi.change}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="content-grid">
                <div class="card chart-card">
                    <div class="card-header">
                        <h3 class="card-title">収益推移 (過去6ヶ月)</h3>
                        <div class="card-actions">
                            <select class="form-select">
                                <option>全物件合計</option>
                                <option>物件A</option>
                                <option>物件B</option>
                            </select>
                        </div>
                    </div>
                    <div class="chart-container">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>

                <div class="card alert-card">
                    <div class="card-header">
                        <h3 class="card-title">重要アラート</h3>
                        <span class="badge badge-danger">3件の未対応</span>
                    </div>
                    <div class="alert-list">
                        <div class="alert-item high">
                            <div class="alert-icon"><i class="fas fa-exclamation-circle"></i></div>
                            <div class="alert-body">
                                <strong>長期空室アラート</strong>
                                <p>サンライズ六本木 201号室 (空室90日経過)</p>
                                <small>2時間前</small>
                            </div>
                        </div>
                        <div class="alert-item mid">
                            <div class="alert-icon"><i class="fas fa-tools"></i></div>
                            <div class="alert-body">
                                <strong>修繕予定の確認</strong>
                                <p>メゾン・ド・エール 外壁工事見積もり</p>
                                <small>5時間前</small>
                            </div>
                        </div>
                        <div class="alert-item high">
                            <div class="alert-icon"><i class="fas fa-arrow-down"></i></div>
                            <div class="alert-body">
                                <strong>稼働率低下傾向</strong>
                                <p>エリア「渋谷」の平均稼働率が3.5%低下</p>
                                <small>昨日 18:30</small>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-outline" style="width: 100%; margin-top: 1rem;">すべてを見る</button>
                </div>
            </div>

            <div class="card table-card">
                <div class="card-header">
                    <h3 class="card-title">物件別収益状況 (今月)</h3>
                    <a href="#properties" class="btn btn-outline btn-sm">物件管理へ</a>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>物件名</th>
                                <th>稼働率</th>
                                <th>月間収益</th>
                                <th>純利益</th>
                                <th>ステータス</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="property-cell">
                                        <div class="property-img">🏢</div>
                                        <div>
                                            <strong>サンライズ六本木</strong>
                                            <small>東京都港区六本木</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="progress-wrap">
                                        <span>88%</span>
                                        <div class="progress-bar"><div class="progress-fill" style="width: 88%; background: var(--warning);"></div></div>
                                    </div>
                                </td>
                                <td>¥2,450,000</td>
                                <td class="text-success">¥1,850,000</td>
                                <td><span class="badge badge-warning">注意</span></td>
                                <td><button class="btn btn-outline btn-sm">詳細</button></td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="property-cell">
                                        <div class="property-img">🏙️</div>
                                        <div>
                                            <strong>センターレジデンス渋谷</strong>
                                            <small>東京都渋谷区道玄坂</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="progress-wrap">
                                        <span>100%</span>
                                        <div class="progress-bar"><div class="progress-fill" style="width: 100%; background: var(--success);"></div></div>
                                    </div>
                                </td>
                                <td>¥4,120,000</td>
                                <td class="text-success">¥3,200,000</td>
                                <td><span class="badge badge-success">安定</span></td>
                                <td><button class="btn btn-outline btn-sm">詳細</button></td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="property-cell">
                                        <div class="property-img">🏨</div>
                                        <div>
                                            <strong>アーバンヒルズ新宿</strong>
                                            <small>東京都新宿区西新宿</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="progress-wrap">
                                        <span>95%</span>
                                        <div class="progress-bar"><div class="progress-fill" style="width: 95%; background: var(--success);"></div></div>
                                    </div>
                                </td>
                                <td>¥1,890,000</td>
                                <td class="text-success">¥1,250,000</td>
                                <td><span class="badge badge-success">安定</span></td>
                                <td><button class="btn btn-outline btn-sm">詳細</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        dashboardView.innerHTML = html;
        initDashboardCharts();
    }

    function initDashboardCharts() {
        const ctx = document.getElementById('revenueChart').getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['11月', '12月', '1月', '2月', '3月', '4月'],
                datasets: [
                    {
                        label: '収益',
                        data: [11200000, 11500000, 10800000, 12100000, 12300000, 12450000],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: '支出',
                        data: [4200000, 4300000, 4100000, 4400000, 4500000, 4600000],
                        borderColor: '#94a3b8',
                        backgroundColor: 'transparent',
                        borderDash: [5, 5],
                        tension: 0.4,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            callback: function(value) {
                                return '¥' + (value / 1000000) + 'M';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    function renderPropertyList() {
        const propertiesView = document.getElementById('properties');
        
        const properties = [
            { id: 1, name: 'サンライズ六本木', area: '港区六本木', units: 48, occupancy: 88, revenue: '¥2,450,000', status: 'Warning' },
            { id: 2, name: 'センターレジデンス渋谷', area: '渋谷区道玄坂', units: 62, occupancy: 100, revenue: '¥4,120,000', status: 'Success' },
            { id: 3, name: 'アーバンヒルズ新宿', area: '新宿区西新宿', units: 35, occupancy: 95, revenue: '¥1,890,000', status: 'Success' },
            { id: 4, name: 'パークサイド恵比寿', area: '渋谷区恵比寿', units: 28, occupancy: 92, revenue: '¥2,100,000', status: 'Success' },
            { id: 5, name: 'グリーンテラス品川', area: '品川区北品川', units: 45, occupancy: 82, revenue: '¥2,250,000', status: 'Danger' }
        ];

        let html = `
            <div class="view-header">
                <div class="filter-bar card">
                    <div class="filter-group">
                        <label>エリア</label>
                        <select class="form-select">
                            <option>すべて</option>
                            <option>港区</option>
                            <option>渋谷区</option>
                            <option>新宿区</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>ステータス</label>
                        <select class="form-select">
                            <option>すべて</option>
                            <option>安定</option>
                            <option>注意</option>
                            <option>危険</option>
                        </select>
                    </div>
                    <div class="filter-group" style="flex: 1;">
                        <label>検索</label>
                        <input type="text" class="form-control" placeholder="名前で検索...">
                    </div>
                    <button class="btn btn-primary" style="align-self: flex-end;">適用</button>
                </div>
            </div>

            <div class="card table-card" style="margin-top: 1.5rem;">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>物件名 / 所在地</th>
                                <th>戸数</th>
                                <th>稼働率</th>
                                <th>月間収益</th>
                                <th>ステータス</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${properties.map(p => `
                                <tr onclick="viewPropertyDetail(${p.id})">
                                    <td>
                                        <strong>${p.name}</strong><br>
                                        <small class="text-muted">${p.area}</small>
                                    </td>
                                    <td>${p.units}戸</td>
                                    <td>
                                        <div class="progress-wrap">
                                            <span>${p.occupancy}%</span>
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: ${p.occupancy}%; background: ${p.occupancy > 95 ? 'var(--success)' : (p.occupancy > 85 ? 'var(--warning)' : 'var(--danger)')}"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${p.revenue}</td>
                                    <td><span class="badge badge-${p.status.toLowerCase()}">${p.status === 'Success' ? '安定' : (p.status === 'Warning' ? '注意' : '危険')}</span></td>
                                    <td><button class="btn btn-outline btn-sm">詳細</button></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        propertiesView.innerHTML = `
            <div class="flex-between" style="margin-bottom: 2rem;">
                <h2>物件一覧</h2>
                <button class="btn btn-primary"><i class="fas fa-plus"></i> 物件新規登録</button>
            </div>
            ${html}
        `;
    }

    // Global function to access from HTML onclick
    window.viewPropertyDetail = (id) => {
        const detailView = document.getElementById('property-detail');
        const detailContent = document.getElementById('detailContent');
        
        // Find property data (mock)
        const name = id === 1 ? 'サンライズ六本木' : (id === 5 ? 'グリーンテラス品川' : 'センターレジデンス渋谷');
        const occupancyValue = id === 5 ? 82 : (id === 1 ? 88 : 100);
        const occupancyStatus = occupancyValue < 85 ? 'text-danger' : (occupancyValue < 95 ? 'text-warning' : 'text-success');

        switchView('property-detail');
        pageTitle.textContent = '物件詳細';
        
        detailContent.innerHTML = `
            <div class="card detail-header-card">
                <div class="detail-info-main">
                    <div class="big-property-img">${id === 5 ? '🏙️' : '🏢'}</div>
                    <div>
                        <h2 class="detail-name">${name}</h2>
                        <p class="detail-address"><i class="fas fa-map-marker-alt"></i> 東京都港区六本木 3-X-X</p>
                        <div class="detail-tags">
                            <span class="badge badge-success">RC造</span>
                            <span class="badge badge-info">築${id * 3}年</span>
                            <span class="badge badge-info">${id * 10 + 20}戸</span>
                            <span class="badge badge-info">地上10階</span>
                        </div>
                    </div>
                </div>
                <div class="detail-actions">
                    <button class="btn btn-outline"><i class="fas fa-edit"></i> 編集</button>
                    <button class="btn btn-primary"><i class="fas fa-file-download"></i> レポート</button>
                </div>
            </div>

            <div class="tabs" id="propertyTabs">
                <div class="tab active" data-tab="overview">概要</div>
                <div class="tab" data-tab="revenue">収益詳細</div>
                <div class="tab" data-tab="units">入居状況</div>
                <div class="tab" data-tab="history">修繕・履歴</div>
            </div>

            <div class="property-tab-content">
                <div id="overview" class="tab-pane active">
                    <div class="content-grid">
                        <div class="card">
                            <h3 class="card-title">基本物件データ</h3>
                            <table class="data-table">
                                <tr><th>管理開始日</th><td>2021/04/10</td></tr>
                                <tr><th>土地面積</th><td>450.20㎡</td></tr>
                                <tr><th>延床面積</th><td>1,280.15㎡</td></tr>
                                <tr><th>月想定賃料</th><td>¥${(id * 500000 + 1000000).toLocaleString()}</td></tr>
                                <tr><th>用途地域</th><td>第一種住居地域</td></tr>
                            </table>
                        </div>
                        <div class="card">
                            <h3 class="card-title">収益・状況サマリー</h3>
                            <div class="flex-around" style="text-align:center; padding: 1.5rem 0;">
                                <div>
                                    <small class="text-muted">実利回り</small>
                                    <div class="big-number">${(5 + id/2).toFixed(1)}%</div>
                                    <small class="text-success"><i class="fas fa-caret-up"></i> 0.2%</small>
                                </div>
                                <div style="width: 1px; height: 50px; background: var(--border-color);"></div>
                                <div>
                                    <small class="text-muted">稼働率</small>
                                    <div class="big-number ${occupancyStatus}">${occupancyValue}%</div>
                                    <small class="${occupancyStatus}"><i class="fas fa-caret-right"></i> 維持</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card chart-card">
                        <h3 class="card-title">月別キャッシュフロー</h3>
                        <div class="chart-container">
                            <canvas id="propertyRevenueChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Tab switching logic for detail view
        const tabs = document.querySelectorAll('#propertyTabs .tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // Normally switch tab panes here, but mock focuses on overview
            });
        });

        // Small delay to ensure canvas is in DOM
        setTimeout(() => {
            const ctx = document.getElementById('propertyRevenueChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['11月', '12月', '1月', '2月', '3月', '4月'],
                    datasets: [
                        { label: '賃料収入', data: [220, 220, 210, 230, 235, 245], backgroundColor: '#2563eb' },
                        { label: '諸経費', data: [40, 42, 38, 45, 42, 48], backgroundColor: '#ef4444' }
                    ]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true, ticks: { callback: v => '¥' + v + 'k' } } }
                }
            });
        }, 100);
    };

    function renderRevenueView() {
        const view = document.getElementById('revenue');
        view.innerHTML = `
            <div class="flex-between" style="margin-bottom: 2rem;">
                <h2>収益管理</h2>
                <div class="btn-group">
                    <button class="btn btn-outline active">月次</button>
                    <button class="btn btn-outline">年次</button>
                </div>
            </div>
            
            <div class="kpi-grid">
                <div class="card kpi-card">
                    <div class="kpi-info">
                        <span class="kpi-label">総収入 (年間)</span>
                        <div class="kpi-value text-main">¥148,200,000</div>
                    </div>
                </div>
                <div class="card kpi-card">
                    <div class="kpi-info">
                        <span class="kpi-label">総支出 (年間)</span>
                        <div class="kpi-value text-danger">¥52,400,000</div>
                    </div>
                </div>
                <div class="card kpi-card">
                    <div class="kpi-info">
                        <span class="kpi-label">純利益 (年間)</span>
                        <div class="kpi-value text-success">¥95,800,000</div>
                    </div>
                </div>
                <div class="card kpi-card">
                    <div class="kpi-info">
                        <span class="kpi-label">営業利益率</span>
                        <div class="kpi-value text-primary">64.6%</div>
                    </div>
                </div>
            </div>

            <div class="card chart-card">
                <h3 class="card-title">収支詳細分析</h3>
                <div style="height: 400px;">
                    <canvas id="revenueDetailChart"></canvas>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            const ctx = document.getElementById('revenueDetailChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: '純利益',
                        data: [7.2, 7.5, 7.1, 7.8, 8.2, 7.9, 8.5, 8.1, 8.3, 8.6, 8.4, 8.8],
                        borderColor: '#10b981',
                        tension: 0.3,
                        fill: true,
                        backgroundColor: 'rgba(16, 185, 129, 0.1)'
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }, 100);
    }

    function renderVacancyView() {
        const view = document.getElementById('vacancy');
        view.innerHTML = `
            <h2>空室管理</h2>
            <div class="card" style="margin-top: 1.5rem;">
                <div class="flex-between">
                    <h3 class="card-title">現在空室の物件一覧</h3>
                    <span class="badge badge-danger">合計 12戸</span>
                </div>
                <div class="table-responsive" style="margin-top: 1rem;">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>物件名 / 号室</th>
                                <th>空室期間</th>
                                <th>賃料 (現設定)</th>
                                <th>ステータス</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>サンライズ六本木 201</strong></td>
                                <td><span class="text-danger">92日</span></td>
                                <td>¥245,000</td>
                                <td><span class="badge badge-danger">対策優先</span></td>
                                <td><button class="btn btn-outline btn-sm">募集条件変更</button></td>
                            </tr>
                            <tr>
                                <td><strong>グリーンテラス品川 405</strong></td>
                                <td><span class="text-warning">45日</span></td>
                                <td>¥185,000</td>
                                <td><span class="badge badge-warning">内見あり</span></td>
                                <td><button class="btn btn-outline btn-sm">詳細</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function renderReportsView() {
        const view = document.getElementById('reports');
        view.innerHTML = `
            <h2>レポート / 分析</h2>
            <div class="content-grid" style="margin-top: 1.5rem;">
                <div class="card chart-card">
                    <h3 class="card-title">エリア別投資効率</h3>
                    <div style="height: 300px;"><canvas id="areaChart"></canvas></div>
                </div>
                <div class="card">
                    <h3 class="card-title">エグゼクティブサマリー</h3>
                    <div class="report-summary" style="padding: 1rem 0;">
                        <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.8;">
                            当月の全体稼働率は<strong>94.5%</strong>と前月比微減。特に「品川エリア」の退去が重なったことが要因です。
                            一方で「渋谷エリア」の更新時賃料アップにより、収益性は<strong>1.2%向上</strong>しています。
                        </p>
                        <button class="btn btn-primary" style="margin-top: 1.5rem; width: 100%;">PDFレポート作成</button>
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            const ctx = document.getElementById('areaChart').getContext('2d');
            new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: ['港区', '渋谷区', '新宿区', '品川区'],
                    datasets: [{
                        data: [8.5, 7.2, 6.8, 5.4],
                        backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#ef4444']
                    }]
                }
            });
        }, 100);
    }

    function renderAlertsView() {
        const view = document.getElementById('alerts');
        view.innerHTML = `
            <h2>通知 / アラート一覧</h2>
            <div class="card" style="margin-top: 1.5rem;">
                <div class="alert-list full-width">
                    <div class="alert-item high" style="padding: 1.5rem;">
                        <div class="alert-icon"><i class="fas fa-exclamation-triangle"></i></div>
                        <div class="alert-body">
                            <div class="flex-between">
                                <strong>賃料滞納の可能性 (自動検知)</strong>
                                <small>2026/04/06 14:00</small>
                            </div>
                            <p>メゾン・ド・エール 302号室 佐藤様。入金確認期限から3日が経過しています。</p>
                            <div style="margin-top: 1rem;">
                                <button class="btn btn-primary btn-sm">連絡テンプレート送付</button>
                                <button class="btn btn-outline btn-sm">確認済みにする</button>
                            </div>
                        </div>
                    </div>
                    <div class="alert-item mid" style="padding: 1.5rem;">
                        <div class="alert-icon"><i class="fas fa-info-circle"></i></div>
                        <div class="alert-body">
                            <div class="flex-between">
                                <strong>定期点検のお知らせ</strong>
                                <small>2026/04/05 09:30</small>
                            </div>
                            <p>来週月曜日、サンライズ六本木にて消防設備点検が実施されます。通知済みです。</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderSettingsView() {
        const view = document.getElementById('settings');
        view.innerHTML = `
            <h2>設定</h2>
            <div class="card" style="margin-top: 1.5rem; max-width: 800px;">
                <div class="settings-section">
                    <h3 class="card-title" style="margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">ユーザープロフィール</h3>
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label class="form-label">名前</label>
                        <input type="text" class="form-control" value="田中 太郎" style="width: 100%;">
                    </div>
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label class="form-label">メールアドレス</label>
                        <input type="email" class="form-control" value="tanaka@example.com" style="width: 100%;">
                    </div>
                </div>
                
                <div class="settings-section" style="margin-top: 2.5rem;">
                    <h3 class="card-title" style="margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">通知設定</h3>
                    <div class="flex-between" style="padding: 0.5rem 0;">
                        <span>空室発生時の即時通知</span>
                        <input type="checkbox" checked>
                    </div>
                    <div class="flex-between" style="padding: 0.5rem 0;">
                        <span>週間レポートのメール受け取り</span>
                        <input type="checkbox" checked>
                    </div>
                </div>
                
                <button class="btn btn-primary" style="margin-top: 2rem;">変更を保存</button>
            </div>
        `;
    }

    // Back button logic
    document.addEventListener('click', (e) => {
        if (e.target.closest('.back-to-list')) {
            switchView('properties');
        }
    });

    // Helper: Responsive title update
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('show');
        }
    });
});
