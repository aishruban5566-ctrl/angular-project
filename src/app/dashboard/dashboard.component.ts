import { Component } from '@angular/core';

// Chart.js (ng2-charts)
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

// ECharts (ngx-echarts)
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor() {}

  // ✅ Example Bar Chart (ng2-charts)
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{}]
    },
    plugins: {
      legend: { position: 'top' }
    }
  };

  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55], label: 'Sales' },
    { data: [28, 48, 40, 19, 86, 27], label: 'Expenses' }
  ];

  // ✅ Example Pie Chart (ECharts)
  pieChartOptions: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Revenue',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false, position: 'center' },
        emphasis: {
          label: { show: true, fontSize: '18', fontWeight: 'bold' }
        },
        labelLine: { show: false },
        data: [
          { value: 1048, name: 'Product A' },
          { value: 735, name: 'Product B' },
          { value: 580, name: 'Product C' },
          { value: 484, name: 'Product D' },
          { value: 300, name: 'Product E' }
        ]
      }
    ]
  };

  // ✅ Logout
  logout() {
    console.log('User logged out');
    // implement your real logout logic here (routing, service, etc.)
  }
}
