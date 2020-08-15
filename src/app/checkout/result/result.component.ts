import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";

import { Product } from "../../shared/models/product";
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"],
})
export class ResultComponent implements OnInit {
  products: Product[] = [];
  date: number;
  totalPrice = 0;
  tax = 6.4;
  @ViewChild("receipt") receipt: ElementRef;

  constructor(private cartService: CartService,
              private productService: ProductsService) {  }

  ngOnInit() {
    this.cartService.items.forEach(id => {
      this.products.push(this.productService.getProduct(id));
    })
    
    this.products.forEach((product) => {
      this.totalPrice += product.price;
    });

    this.date = Date.now();
  }

  downloadReceipt() {
    const data = document.getElementById("receipt");
    // console.log(data);

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      // const imgWidth = 208;
      const pageHeight = 295;
      // const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jsPDF(); // A4 size page of PDF
      const position = 0;
      const x_axis= 150;
      const y_axis = 10;

      console.log(this.receipt.nativeElement.offsetHeight);
      const imgHeight = this.receipt.nativeElement.offsetHeight;
      const imgWidth = this.receipt.nativeElement.offsetWidth;
      pdf.addImage(contentDataURL, "PNG", x_axis, y_axis, imgWidth, imgHeight);
      pdf.save("ikismail.pdf"); // Generated PDF
    });
  }
}
