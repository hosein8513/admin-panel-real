import Chart from 'chart.js/auto';

let chart = null;

export const Dashboardchart = (ctx, labels, data) => {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'فروش (میلیون تومان)',
        data: data,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          rtl: true,
          labels: {
            font: {
              family: 'Vazir, sans-serif',
              size: 14
            },
            padding: 20
          }
        },
        tooltip: {
          rtl: true,
          titleFont: {
            family: 'Vazir, sans-serif'
          },
          bodyFont: {
            family: 'Vazir, sans-serif'
          },
          callbacks: {
            label: function(context) {
              return `مبلغ: ${context.parsed.y.toFixed(2)} میلیون تومان`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              family: 'Vazir, sans-serif',
              size: 13
            }
          },
          grid: {
            display: false
          }
        },
        y: {
          ticks: {
            font: {
              family: 'Vazir, sans-serif',
              size: 12
            },
            callback: function(value) {
              return value + 'M';
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          beginAtZero: true
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
};

export const destroyChart = () => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
};
