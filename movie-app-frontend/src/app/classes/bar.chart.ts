
export class BarChart {

  public chartType: string = 'bar';

  public chartDatasets: any[] = [
      { data: [], label: '' }
    ];

  public chartLabels: any[] = [];

  public chartColors: any[] = [
      {
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
      }
  ];

  public chartOptions: any = {
    responsive: true
  };


}
