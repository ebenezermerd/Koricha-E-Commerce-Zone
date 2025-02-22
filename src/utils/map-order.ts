import { IOrder } from 'src/types/order';

export function mapOrder(order: any): IOrder {
  return {
    ...order,
    createdAt: new Date(order.createdAt),
    items: order.items?.map((item: any) => ({
      ...item,
      coverUrl: item.coverUrl || item.image,
      image: item.image || item.coverUrl
    })),
    payment: order.payment ? {
      ...order.payment,
      txRef: order.payment.tx_ref || order.payment.txRef
    } : undefined,
    delivery: order.delivery ? {
      ...order.delivery,
      deliveredAt: order.delivery.deliveredAt ? new Date(order.delivery.deliveredAt) : undefined
    } : undefined
  };
} 