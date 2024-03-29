import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { UserService } from "src/app/services/user.service";
import { OrderService } from "src/app/services/order.service";
import { PromoService } from "src/app/services/promo.service";
import { promise } from 'protractor';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent implements OnInit {
  constructor(
    public userService: UserService,
    public orderService: OrderService,
    public promoService: PromoService
  ) {}

  userCounter = 0;
  orderCounter = 0;
  promoCounter = 0;
  grandTotal = 0;
  clientsGraph = 0;
  sucursalGraph = 0;
  repartidoresGraph = 0;

  ngOnInit(): void {

    this.createChart();
  }

  async getStats() {
    this.grandTotal = (await this.orderService.find().toPromise()).reduce((a, b) => a + b.total_price, 0);
    this.userCounter = (await this.userService.find().toPromise()).length;
    this.orderCounter = (await this.orderService.find().toPromise()).length;
    this.promoCounter = (await this.promoService.find({ active: true }).toPromise()).length;
    this.sucursalGraph = (await this.userService.find({ type: "ADMIN" }).toPromise()).length;
    this.repartidoresGraph = (await this.userService.find({ type: "EXPRESS" }).toPromise()).length;
    this.clientsGraph = (await this.userService.find({ type: "CLIENT" }).toPromise()).length;
  }


  async createChart() {
    await this.getStats();
    // Set new default font family and font color to mimic Bootstrap's default styling
    (Chart.defaults.global.defaultFontFamily = "Nunito"),
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = "#858796";
    // Pie Chart
    var myPieChart = new Chart("myPieChart", {
      type: "doughnut",
      data: {
        labels: ["Clientes", "Sucursales", "Repartidores"],
        datasets: [
          {
            data: [this.clientsGraph, this.sucursalGraph, this.repartidoresGraph],
            backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
            hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: "#dddfeb",
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false,
        },
        cutoutPercentage: 80,
      },
    });
  }
}
