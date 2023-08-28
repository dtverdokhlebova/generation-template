import createCheckbox from '../_ui/ui-checkbox/ui-checkbox'

export default function lineChart() {
  const lineChartElement = $('.line-chart')[0]
  if (lineChartElement) {
    Chart.defaults.font.family = '\'Inter\', \'Arial\', sans-serif'
    const data = $(lineChartElement).hasClass('test-data')
      ? {
        labels: ['Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
        dataset: [
          {
            label: 'Переход из поисковых систем',
            data: [0, 120, 300, 500, 750],
            color: '#4A62F1'
          },
          {
            label: 'Прямые заходы',
            data: [220, 250, 260, 270, 280],
            color: '#ffffff',
            checkColor: '#101010'
          },
          {
            label: 'Переходы по рекламе',
            data: [370, 390, 550, 380, 600],
            color: '#FCA217'
          }
        ]
      }
      : {}

    const chart = new LineChart(lineChartElement, data)
  }
}

class LineChart {
  constructor(holder, data) {
    this._holder = holder
    this._holder.lineChart = this
    this._canvas = this._holder.querySelector('canvas')
    this._isMobile = !window.matchMedia('(min-width: 768px)').matches
    this._data = this._getData(data)
    this._rawData = data

    this._htmlLegendPlugin = {
      afterUpdate: this._updHtmlLegend.bind(this)
    }

    this._chartInstance = new Chart(this._canvas, {
      type: 'line',
      data: this._data,
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: 0
        },
        scales: {
          x: {
            border: {
              width: 0
            },
            ticks: {
              color: '#82848D',
              font: {
                size: this._isMobile ? 8 : 12
              },
              padding: this._isMobile ? 14 : 24
            },
            grid: {
              drawTicks: false,
              lineWidth: 1,
              color: '#2A2A2A'
            }
          },
          y: {
            beginAtZero: true,
            border: {
              width: 1,
              color: '#2A2A2A'
            },
            afterFit: (axis) => {
              axis.paddingRight = 0
            },
            ticks: {
              count: 5,
              precision: 0,
              color: '#82848D',
              align: 'inner',
              padding: this._isMobile ? 17 : 30,
              font: {
                size: this._isMobile ? 8 : 12
              }
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      },
      plugins: [this._htmlLegendPlugin]
    })
  }

  _updHtmlLegend() {
    let legendElement = this._holder.querySelector('.line-chart__legend')

    if (legendElement) {
      legendElement.innerHTML = ''
    } else {
      legendElement = document.createElement('div')
      legendElement.className = 'line-chart__legend'
      this._holder.append(legendElement)
    }

    if (this._rawData.dataset) {
      for (const item of this._rawData.dataset) {
        const checkbox = createCheckbox(`line-${item.color.slice(1)}`, item.label, !item.hidden)
        checkbox.style.setProperty('--bg-color', item.color)
        checkbox.style.setProperty('--check-color', item.checkColor || '#ffffff')
        legendElement.append(checkbox)

        const input = checkbox.querySelector('input')
        input.addEventListener('change', () => {
          const dataIndex = this._rawData.dataset.findIndex(item => item.color === `#${input.id.replace('line-', '')}`)
          const newData = JSON.parse(JSON.stringify(this._rawData))
          newData.dataset[dataIndex].hidden = !input.checked
          this.updateData(newData)
        })
      }
    }
  }

  _getData(data) {
    const _data = {
      labels: data.labels,
      datasets: []
    }
    if (data.dataset) {
      for (const dataItem of data.dataset) {
        _data.datasets.push({
          label: dataItem.label,
          data: dataItem.data,
          borderWidth: 2,
          borderColor: dataItem.color,
          cubicInterpolationMode: 'monotone',
          pointRadius: 0,
          hidden: !!dataItem.hidden
        })
      }
    }
    return _data
  }

  updateData(data) {
    this._rawData = data
    this._data = this._getData(data)

    this._chartInstance.data.labels = this._data.labels
    this._chartInstance.data.datasets = this._data.datasets

    this._chartInstance.update()
  }
}
