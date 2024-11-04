import { formatNumber } from "./helpers";

export const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        drawBorder: true,
        color: "#D4D4D4",
        borderDash: [4, 6],
      },
      showLine: false,
      ticks: {
        precision: 0,
        color: "#999CA0",
        font: {
          size: 10,
        },
        stepSize: 2000000000,
        callback: (value: number | string) => formatNumber(value as number),
        padding: 10,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: 0,
        minRotation: 0,
        color: "#999CA0",
        font: {
          size: 10,
        },
      },
    },
  },
  elements: {
    line: {
      tension: 0,
    },
    point: {
      radius: 3,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: function (context: {
        tooltip: {
          opacity: number;
          body: boolean;
          title: string;
          dataPoints: {
            dataIndex: number;
            datasetIndex: number;
            label: string;
            raw: number | string;
            dataset: {
              labelsData: {
                date: string;
                title: string;
                value: string;
              }[];
            };
          }[];
          caretX: number;
          caretY: number;
        };
        chart: {
          canvas: {
            getBoundingClientRect: () => {
              left: number;
              top: number;
            };
          };
        };
      }) {
        let tooltipEl = document.getElementById("chartjs-custom-tooltip");

        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-custom-tooltip";
          tooltipEl.style.position = "absolute";
          tooltipEl.style.width = "180px";
          tooltipEl.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
          tooltipEl.style.border = "1px solid #D4D4D4";
          tooltipEl.style.padding = "14px";
          tooltipEl.style.borderRadius = "12px";
          tooltipEl.style.pointerEvents = "none";
          tooltipEl.style.transition = "0.4s ease";

          document.body.appendChild(tooltipEl);
        }

        if (context.tooltip.opacity === 0) {
          tooltipEl.style.opacity = "0";
          return;
        }

        if (context.tooltip.body) {
          const title = context.tooltip.title || "";
          const dataPoints =
            context.tooltip.dataPoints[0].dataset.labelsData.filter(
              (item: { date: string }) => item.date == title
            );

          tooltipEl.innerHTML = `<p style="font-size: 12px; font-weight:bold; border-bottom:1px solid #D4D4D4; padding-bottom:6px; color:rgba(0,0,0,0.5); margin-bottom:4px">${title}</p>`;
          dataPoints.forEach((point: { title: string; value: string }) => {
            const div = document.createElement("div");
            div.innerHTML = `
              <div style="font-size: 12px; font-weight:bold; color:rgba(0,0,0,0.5); display:flex; align-items:center; width:100%; justify-content:between; padding:4px 0px">
                <span style="margin-right:auto">${point.title}:</span>
                <span>${point.value}</span>
              </div> 
            `;
            tooltipEl.appendChild(div);
          });
        }

        const position = context.chart.canvas.getBoundingClientRect();
        tooltipEl.style.opacity = "1";
        tooltipEl.style.left =
          position.left + window.pageXOffset + context.tooltip.caretX + "px";
        tooltipEl.style.top =
          position.top + window.pageYOffset + context.tooltip.caretY + "px";
      },
    },
  },
};

export const CHART_DATA = {
  datasets: [
    {
      fill: "start",
      backgroundColor: (context: {
        chart: {
          ctx: CanvasRenderingContext2D;
        };
      }) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#A92EFA33");
        gradient.addColorStop(0.7, "#641B9400");
        return gradient;
      },
      borderColor: "#A72DF7",
      pointRadius: 3,
      pointStyle: "circle",
      pointBackgroundColor: "#A72DF7",
      borderJoinStyle: "round",
      tension: 0.2,
    },
  ],
};

export const DROPDOWN_DATA_OPTIONS = [
  {
    title: "Population",
    value: "SP.POP.TOTL",
  },
  {
    title: "Population Density",
    value: "EN.POP.DNST",
  },
  {
    title: "Growth Rate",
    value: "SP.POP.GROW",
  },
  {
    title: "Life Exp. at birth",
    value: "SP.DYN.LE00.IN",
  },
  {
    title: "Birth Rate",
    value: "SP.DYN.CBRT.IN",
  },
  {
    title: "Death Rate",
    value: "SP.DYN.CDRT.IN",
  },
  {
    title: "Fertility rate",
    value: "SP.DYN.TFRT.IN",
  },
];

export const DROPDOWN_TIME_RANGE_OPTIONS = [
  {
    title: "5 Yrs",
    value: 5,
  },
  {
    title: "10 Yrs",
    value: 10,
  },
  {
    title: "20 Yrs",
    value: 20,
  },
  {
    title: "50 Yrs",
    value: 50,
  },
  {
    title: "100 Yrs",
    value: 100,
  },
];

export const DROPDOWN_YEARS = [
  {
    title: "2021",
    value: 2021,
  },
  {
    title: "2020",
    value: 2020,
  },
  {
    title: "2019",
    value: 2019,
  },
  {
    title: "2018",
    value: 2018,
  },
  {
    title: "2017",
    value: 2017,
  },
];
