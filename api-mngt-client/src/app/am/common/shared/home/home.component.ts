import { Component, OnInit } from '@angular/core';
import { ApiUsage } from '../../../statistics/api-usage/api-usage';
import { LogdataService } from '../../../statistics/logdata/logdata.service';
import { ApiLastAccessTime } from '../../../statistics/api-last-access-time/api-last-access-time';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUpdatedBarChart: boolean;
  barChartOptions = {
    chart: {
      type: 'column'
    },
    title: { text: 'API VERSION OF THE MOST USED' },
    series: [{
      name: 'Request Number',
      colorByPoint: true,
      data: []
    }],
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Request Number'
      }
    },
    xAxis: {
      type: 'category'
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    width: null,
    height: null
  };
  apiVersionTheMostUsedList: ApiUsage[];
  apiVersionLastAccessedList: ApiLastAccessTime[];

  constructor(
    private logdataService: LogdataService
  ) { }

  ngOnInit() {
    this.getApiVersionTheMostUsed();
    this.getApiVersionLastAccessed();
  }

  public getApiVersionTheMostUsed() {
    this.isUpdatedBarChart = false;
    this.logdataService.getApiVersionUsageTimeForDashboard()
      .then(response => {
        this.apiVersionTheMostUsedList = response;
        console.log(this.apiVersionTheMostUsedList);
        // let barChartLables: Array<String> = [];
        let barChartData = [];
        let barChartDataItems: Array<BarChartDataItem> = [];
        this.apiVersionTheMostUsedList.forEach(apiVersionStatisticResponseItem => {
          let barChartDataItem = new BarChartDataItem();
          barChartDataItem.name =
            apiVersionStatisticResponseItem.apiName + " v"
            + apiVersionStatisticResponseItem.apiVersion + ", ID: "
            + apiVersionStatisticResponseItem.apiVersionId;
          barChartDataItem.y = apiVersionStatisticResponseItem.requestCount;
          barChartDataItems.push(barChartDataItem);
        });
        this.isUpdatedBarChart = true;
        this.barChartOptions.series[0].data = JSON.parse(JSON.stringify(barChartDataItems));
      })
      .catch(error => console.log(error));
  }

  public getApiVersionLastAccessed() {
    this.logdataService.getApiLastAccessTimeForDashboard()
      .then(response => {
        this.apiVersionLastAccessedList = response;
      })
      .catch(error => console.log(error));
  }

}

class BarChartDataItem {
  name: string;
  y: number;
}


