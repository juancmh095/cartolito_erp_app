(function() {
  localStorage.removeItem('hs_theme')

  window.onload = function () {


    // INITIALIZATION OF NAVBAR VERTICAL ASIDE
    // =======================================================
    new HSSideNav('.js-navbar-vertical-aside').init()


    // INITIALIZATION OF FORM SEARCH
    // =======================================================
    const HSFormSearchInstance = new HSFormSearch('.js-form-search')

    if (HSFormSearchInstance.collection.length) {
      HSFormSearchInstance.getItem(1).on('close', function (el) {
        el.classList.remove('top-0')
      })

      document.querySelector('.js-form-search-mobile-toggle').addEventListener('click', e => {
        let dataOptions = JSON.parse(e.currentTarget.getAttribute('data-hs-form-search-options')),
          $menu = document.querySelector(dataOptions.dropMenuElement)

        $menu.classList.add('top-0')
        $menu.style.left = 0
      })
    }


    // INITIALIZATION OF BOOTSTRAP DROPDOWN
    // =======================================================
    HSBsDropdown.init()


    // INITIALIZATION OF CHARTJS
    // =======================================================
    HSCore.components.HSChartJS.init('.js-chart')


    // INITIALIZATION OF CHARTJS
    // =======================================================
    HSCore.components.HSChartJS.init('#updatingBarChart')
    const updatingBarChart = HSCore.components.HSChartJS.getItem('updatingBarChart')

    // Call when tab is clicked
    document.querySelectorAll('[data-bs-toggle="chart-bar"]').forEach(item => {
      item.addEventListener('click', e => {
        let keyDataset = e.currentTarget.getAttribute('data-datasets')

        const styles = HSCore.components.HSChartJS.getTheme('updatingBarChart', HSThemeAppearance.getAppearance())

        if (keyDataset === 'lastWeek') {
          updatingBarChart.data.labels = ["Apr 22", "Apr 23", "Apr 24", "Apr 25", "Apr 26", "Apr 27", "Apr 28", "Apr 29", "Apr 30", "Apr 31"];
          updatingBarChart.data.datasets = [
            {
              "data": [120, 250, 300, 200, 300, 290, 350, 100, 125, 320],
              "backgroundColor": styles.data.datasets[0].backgroundColor,
              "hoverBackgroundColor": styles.data.datasets[0].hoverBackgroundColor,
              "borderColor": styles.data.datasets[0].borderColor,
              "maxBarThickness": 10
            },
            {
              "data": [250, 130, 322, 144, 129, 300, 260, 120, 260, 245, 110],
              "backgroundColor": styles.data.datasets[1].backgroundColor,
              "borderColor": styles.data.datasets[1].borderColor,
              "maxBarThickness": 10
            }
          ];
          updatingBarChart.update();
        } else {
          updatingBarChart.data.labels = ["May 1", "May 2", "May 3", "May 4", "May 5", "May 6", "May 7", "May 8", "May 9", "May 10"];
          updatingBarChart.data.datasets = [
            {
              "data": [200, 300, 290, 350, 150, 350, 300, 100, 125, 220],
              "backgroundColor": styles.data.datasets[0].backgroundColor,
              "hoverBackgroundColor": styles.data.datasets[0].hoverBackgroundColor,
              "borderColor": styles.data.datasets[0].borderColor,
              "maxBarThickness": 10
            },
            {
              "data": [150, 230, 382, 204, 169, 290, 300, 100, 300, 225, 120],
              "backgroundColor": styles.data.datasets[1].backgroundColor,
              "borderColor": styles.data.datasets[1].borderColor,
              "maxBarThickness": 10
            }
          ]
          updatingBarChart.update();
        }
      })
    })


    // INITIALIZATION OF CHARTJS
    // =======================================================
    HSCore.components.HSChartJS.init('.js-chart-datalabels', {
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          datalabels: {
            anchor: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return value.r < 20 ? 'end' : 'center';
            },
            align: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return value.r < 20 ? 'end' : 'center';
            },
            color: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return value.r < 20 ? context.dataset.backgroundColor : context.dataset.color;
            },
            font: function (context) {
              var value = context.dataset.data[context.dataIndex],
                fontSize = 25;

              if (value.r > 50) {
                fontSize = 35;
              }

              if (value.r > 70) {
                fontSize = 55;
              }

              return {
                weight: 'lighter',
                size: fontSize
              };
            },
            formatter: function (value) {
              return value.r
            },
            offset: 2,
            padding: 0
          }
        },
      }
    })

    // INITIALIZATION OF SELECT
    // =======================================================
    HSCore.components.HSTomSelect.init('.js-select')


    // INITIALIZATION OF CLIPBOARD
    // =======================================================
    HSCore.components.HSClipboard.init('.js-clipboard')
  }
})()
