import { AuthService } from './../../authentication/auth/auth-service/auth.service';
import { environment } from './../../../environments/environment.prod';
import { OrderService } from './../../services/order.service';
import { Product } from './../../models/product.model';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];

  options: any;
  razorPay: any;
  placedOrderReceipt: any;
  success: boolean;
  user: any;

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.success = false;
    this.user = this.authService.getUserData();

    this.options = {
      key: environment.razorpayKeyId, // Enter the Key ID generated from the Dashboard
      amount: '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Home Minister',
      description: 'Test Transaction',
      image: '../../../assets/logo.png',
      // tslint:disable-next-line: max-line-length
      order_id: '', // This is a sample Order ID. Pass the `id` obtained in the response of Step 1 order_9A33XWu170gUtm
      handler: (response: any) => {
        this.verifyPayment(response);
      },
      modal: {
        ondismiss: () => {
          this.deleteOrder();
        },
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      notes: {
        address: 'Home Minister',
      },
      theme: {
        color: '#ffc107',
      },
    };

    this.razorPay = new Razorpay(this.options);
  }

  pay() {
    this.razorPay.open();
  }

  generateOrder(order: any) {
    this.orderService.generateOrder(order).subscribe(
      (res: any) => {
        this.placedOrderReceipt = res.receipt;
        // this.options.amount = res.order.amount;
        this.options.amount = '1';
        this.options.order_id = res.order.id;
        this.options.currency = res.order.currency;
        this.options.prefill.name = this.user.name;
        this.options.prefill.email = this.user.email;
        this.options.prefill.contact = this.user.phone;
        this.razorPay = new Razorpay(this.options);
        this.pay();
      },
      (err) => {}
    );
  }

  verifyPayment(payment: any) {
    // this.paymentService.verifyPayment(payment, this.placedOrderReceipt).subscribe(
    //   (res: any) => {
    //     console.log('success');
    //     setTimeout(() => {
    this.cartService.clearCart();
    this.cartItems = [];
    this.success = true;
    //   }, 1000);
    // },
    // (err: any) => {
    //   console.log(err);
    // }
    // );
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.placedOrderReceipt._id).subscribe(
      (res: any) => {
        this.placedOrderReceipt = null;
      },
      (err) => {}
    );
  }

  deleteCartItem(id: string) {
    this.cartService.deleteProductFromCart(id);
    this.ngOnInit();
  }

  getGrandTotal() {
    let total = 0;
    this.cartItems.forEach((cartItem: { product: Product; quantity: number }) => {
      const itemTotal = cartItem.product.price * cartItem.quantity;
      total = total + itemTotal;
    });
    return total;
  }

  onCheckout() {
    const amount = this.getGrandTotal();

    const orderDetails = {
      userId: this.user._id,
      userPhone: this.user.phone,
      userName: this.user.name,
      userEmail: this.user.email,
      amount: amount,
    };

    this.generateOrder(orderDetails);
  }
}
