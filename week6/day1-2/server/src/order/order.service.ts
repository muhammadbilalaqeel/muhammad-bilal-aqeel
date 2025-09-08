import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto, UpdateOrderStatusDto, UpdatePaymentStatusDto } from './dto/create-order.dto';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
import { Product, ProductDocument } from 'src/product/schemas/product.schema';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
      private notificationsGateway: NotificationsGateway
    ,

      private readonly cartService: CartService,
     private readonly notificationsService : NotificationsService,
    @InjectModel(Product.name) private productModel : Model<ProductDocument>
  ) {}

async createOrder(createOrderDto: CreateOrderDto, userId: string) {
  const orderData = {
    ...createOrderDto,
    user: userId,
  };

  const newOrder = new this.orderModel(orderData);
  const savedOrder = await newOrder.save();

  await this.cartService.clearCart(userId);

  // Notify all admins when a new order is placed
  this.notificationsGateway.notifyNewOrder(savedOrder._id as string);;

  return {
    message: 'Order placed successfully!',
    order: savedOrder,
  };
}



  async getAllOrders(): Promise<Order[]> {
    return await this.orderModel
      .find()
      .populate('user')
      .populate('products.product')
      .exec();
  }

  async updatePaymentStatus(orderId: string, updateDto: UpdatePaymentStatusDto): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    order.paymentInfo = {
      ...order.paymentInfo,
      status: updateDto.status,
      transactionId: updateDto.transactionId,
      paidAt: updateDto.paidAt,
    };
    return await order.save();
  }

async updateOrderStatus(orderId: string, updateDto: UpdateOrderStatusDto): Promise<Order> {
  const order = await this.orderModel.findById(orderId);
  if (!order) throw new NotFoundException('Order not found');

  order.status = updateDto.status;
  await order.save();

  // Notify only the user who placed the order about status change
  await this.notificationsService.notifyOrderStatus(
    order.user.toString(),
    `Your order status changed to ${order.status}`
  );

  // If delivered → reduce stock
  if (updateDto.status === 'delivered') {
    for (const item of order.products) {
      const product = await this.productModel.findById(item.product);
      if (product) {
        product.stock = product.stock - item.quantity;
        await product.save();
      }
    }
  }

  return order;
}



  async getOrdersStats() {
   const stats = await this.orderModel.aggregate([
  {
    $facet: {
      totalOrders: [{ $count: "count" }],
      completedOrders: [
        { $match: { status: "delivered" } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$totalAmount" },
            count: { $sum: 1 }
          }
        }
      ],
      activeOrders: [
        { $match: { status: { $in: ["pending", "confirmed", "shipped"] } } },
        { $count: "count" }
      ]
    }
  }
]);

return {
  totalOrders: stats[0].totalOrders[0]?.count || 0,
  totalCompletedOrders: stats[0].completedOrders[0]?.count || 0,
  totalCompletedAmount: stats[0].completedOrders[0]?.totalAmount || 0,
  activeOrdersCount: stats[0].activeOrders[0]?.count || 0
};

  }



  // order.service.ts
async getBestSellers(limit: number = 5) {
  const bestSellers = await this.orderModel.aggregate([
    { $unwind: "$products" }, // break products array into individual docs
    {
      $group: {
        _id: "$products.product", // group by product id
        totalSold: { $sum: "$products.quantity" }, // sum quantities
        totalRevenue: { $sum: { $multiply: ["$products.quantity", "$products.price"] } } // sum revenue
      },
    },
    { $sort: { totalSold: -1 } }, // sort by highest sold
    { $limit: limit }, // limit results
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" }, // get single product object
    {
      $project: {
        _id: 1,
        totalSold: 1,
        totalRevenue: 1,
        "product.name": 1,
        "product.price": 1,
        "product.variants": 1,
      },
    },
  ]);

  return bestSellers;
}



async getOrderById(orderId: string) {
  const order = await this.orderModel
    .findById(orderId)
    .populate('user') 
    .populate('products.product') 
    .exec();

  if (!order) {
    throw new NotFoundException(`Order with ID ${orderId} not found`);
  }

  return order;
}


async getDashboardStats() {
    const matchStage = { status: { $in: ['completed', 'delivered'] } };

    // Yearly aggregation
    const yearly = await this.orderModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { year: { $year: '$createdAt' } },
          totalAmount: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1 } },
    ]);

    // Monthly aggregation
    const monthly = await this.orderModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          totalAmount: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Weekly aggregation
    const weekly = await this.orderModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, week: { $week: '$createdAt' } },
          totalAmount: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.week': 1 } },
    ]);

    return { yearly, monthly, weekly };
  }


}
