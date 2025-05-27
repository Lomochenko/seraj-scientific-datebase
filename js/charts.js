// Seraj Scientific Database - Charts JavaScript

// Chart configurations and data
const chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                padding: 20,
                usePointStyle: true,
                font: {
                    family: 'Vazirmatn, Inter, sans-serif',
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#1e3a8a',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            titleFont: {
                family: 'Vazirmatn, Inter, sans-serif',
                size: 14,
                weight: 'bold'
            },
            bodyFont: {
                family: 'Vazirmatn, Inter, sans-serif',
                size: 12
            }
        }
    },
    animation: {
        duration: 1500,
        easing: 'easeInOutQuart'
    }
};

// Research Categories Data
const categoriesData = {
    labels: ['علوم و فناوری', 'علوم اجتماعی', 'هنر و ادبیات'],
    datasets: [{
        data: [46779803, 7282517, 3500000],
        backgroundColor: [
            '#1e3a8a',
            '#3b82f6',
            '#f59e0b'
        ],
        borderColor: [
            '#1e40af',
            '#2563eb',
            '#d97706'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
            '#1e40af',
            '#2563eb',
            '#d97706'
        ],
        hoverBorderWidth: 3
    }]
};

// Research Topics Data
const topicsData = {
    labels: ['مهندسی', 'شیمی', 'فیزیک', 'علوم مواد', 'علوم کامپیوتر', 'ریاضی'],
    datasets: [{
        data: [7220578, 4558500, 4072685, 3509581, 3461463, 2800000],
        backgroundColor: [
            '#1e3a8a',
            '#3b82f6',
            '#06b6d4',
            '#10b981',
            '#f59e0b',
            '#ef4444'
        ],
        borderColor: [
            '#1e40af',
            '#2563eb',
            '#0891b2',
            '#059669',
            '#d97706',
            '#dc2626'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
            '#1e40af',
            '#2563eb',
            '#0891b2',
            '#059669',
            '#d97706',
            '#dc2626'
        ],
        hoverBorderWidth: 3
    }]
};

// English translations for charts
const chartTranslations = {
    fa: {
        categories: {
            labels: ['علوم و فناوری', 'علوم اجتماعی', 'هنر و ادبیات'],
            title: 'دسته‌بندی‌های کلی'
        },
        topics: {
            labels: ['مهندسی', 'شیمی', 'فیزیک', 'علوم مواد', 'علوم کامپیوتر', 'ریاضی'],
            title: 'موضوعات تخصصی'
        }
    },
    en: {
        categories: {
            labels: ['Science & Technology', 'Social Sciences', 'Arts & Humanities'],
            title: 'General Categories'
        },
        topics: {
            labels: ['Engineering', 'Chemistry', 'Physics', 'Materials Science', 'Computer Science', 'Mathematics'],
            title: 'Specialized Topics'
        }
    }
};

// Chart instances
let categoriesChart = null;
let topicsChart = null;

// Initialize Charts
function initializeCharts() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createCharts);
    } else {
        createCharts();
    }
}

// Create Charts
function createCharts() {
    // Create Categories Chart
    const categoriesCtx = document.getElementById('categoriesChart');
    if (categoriesCtx) {
        categoriesChart = new Chart(categoriesCtx, {
            type: 'doughnut',
            data: categoriesData,
            options: {
                ...chartConfig,
                cutout: '60%',
                plugins: {
                    ...chartConfig.plugins,
                    legend: {
                        ...chartConfig.plugins.legend,
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Create Topics Chart
    const topicsCtx = document.getElementById('topicsChart');
    if (topicsCtx) {
        topicsChart = new Chart(topicsCtx, {
            type: 'bar',
            data: topicsData,
            options: {
                ...chartConfig,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            font: {
                                family: 'Vazirmatn, Inter, sans-serif',
                                size: 11
                            },
                            callback: function(value) {
                                return formatChartNumber(value);
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Vazirmatn, Inter, sans-serif',
                                size: 11
                            }
                        }
                    }
                },
                plugins: {
                    ...chartConfig.plugins,
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Animate charts on scroll
    observeCharts();
}

// Observe Charts for Animation
function observeCharts() {
    const chartContainers = document.querySelectorAll('.chart-container');

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const canvas = entry.target.querySelector('canvas');
                if (canvas) {
                    animateChart(canvas);
                }
                chartObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    chartContainers.forEach(container => {
        chartObserver.observe(container);
    });
}

// Animate Chart
function animateChart(canvas) {
    const chart = Chart.getChart(canvas);
    if (chart) {
        chart.update('active');
    }
}

// Format Chart Numbers
function formatChartNumber(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
}

// Update Charts Language
function updateChartsLanguage(lang) {
    const translations = chartTranslations[lang];

    if (categoriesChart && translations.categories) {
        categoriesChart.data.labels = translations.categories.labels;
        categoriesChart.update();

        // Update title
        const categoriesTitle = document.getElementById('categories-chart-title');
        if (categoriesTitle) {
            categoriesTitle.textContent = translations.categories.title;
        }
    }

    if (topicsChart && translations.topics) {
        topicsChart.data.labels = translations.topics.labels;
        topicsChart.update();

        // Update title
        const topicsTitle = document.getElementById('topics-chart-title');
        if (topicsTitle) {
            topicsTitle.textContent = translations.topics.title;
        }
    }
}

// Resize Charts
function resizeCharts() {
    if (categoriesChart) {
        categoriesChart.resize();
    }
    if (topicsChart) {
        topicsChart.resize();
    }
}

// Destroy Charts
function destroyCharts() {
    if (categoriesChart) {
        categoriesChart.destroy();
        categoriesChart = null;
    }
    if (topicsChart) {
        topicsChart.destroy();
        topicsChart = null;
    }
}

// Export Chart Data
function exportChartData(chartType) {
    let data = null;
    let filename = '';

    if (chartType === 'categories' && categoriesChart) {
        data = categoriesChart.data;
        filename = 'seraj-categories-data.json';
    } else if (chartType === 'topics' && topicsChart) {
        data = topicsChart.data;
        filename = 'seraj-topics-data.json';
    }

    if (data) {
        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Chart Interaction Handlers
function setupChartInteractions() {
    // Categories chart click handler
    if (categoriesChart) {
        categoriesChart.options.onClick = function(event, elements) {
            if (elements.length > 0) {
                const index = elements[0].index;
                const label = categoriesChart.data.labels[index];
                const value = categoriesChart.data.datasets[0].data[index];

                // Add navigation to category page here
                // TODO: Navigate to category page
            }
        };
    }

    // Topics chart click handler
    if (topicsChart) {
        topicsChart.options.onClick = function(event, elements) {
            if (elements.length > 0) {
                const index = elements[0].index;
                const label = topicsChart.data.labels[index];
                const value = topicsChart.data.datasets[0].data[index];

                // Add navigation to topic page here
                // TODO: Navigate to topic page
            }
        };
    }
}

// Window resize handler
window.addEventListener('resize', debounce(resizeCharts, 250));

// Initialize charts when DOM is ready
initializeCharts();

// Export functions for global use
window.SerajCharts = {
    updateChartsLanguage,
    resizeCharts,
    destroyCharts,
    exportChartData,
    formatChartNumber
};
