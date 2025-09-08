"use client";

import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { OrderProduct } from "@/types/order.types";

type OrderProductTableProps = {
  orderProducts: OrderProduct[];
  isLoading: boolean;
};

function OrderProductTable({ orderProducts, isLoading }: OrderProductTableProps) {
const columns: ColumnsType<OrderProduct> = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    render: (product) => product?.name || "N/A",
  },
  {
    title: "Variant",
    dataIndex: "variant",
    key: "variant",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Total Price",
    key: "totalPrice",
    render: (_, record) => `₹${(record.price * record.quantity).toFixed(2)}`,
  },
];


  return (
    <div className="flex flex-col gap-3 w-full bg-[#FAFAFA] rounded-[16px]">
      <div className="text-xl text-black font-semibold">Order Products</div>
      <div className="w-full border-[0.5px] border-[#23232133]"></div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={orderProducts}
        loading={isLoading}
        pagination={false}
        bordered={false}
        style={{ borderRadius: "12px", overflow: "hidden" }}
      />
    </div>
  );
}

export default OrderProductTable;
