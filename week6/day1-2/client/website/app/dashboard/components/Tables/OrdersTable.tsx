"use client";

import React, { useState } from "react";
import { Table, Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { Order } from "@/types/order.types";

const OrdersTable: React.FC = () => {
  const router = useRouter();
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();

  // Track the selected order
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleCheckboxChange = (orderId: string) => {
    // If same row clicked again, unselect it; otherwise select new row
    setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const columns: ColumnsType<Order> = [
    {
      title: "",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedOrderId === record._id}
          onChange={() => handleCheckboxChange(record._id)}
        />
      ),
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "products",
      key: "products",
      render: (products) => products?.[0]?.product?.name || "N/A",
    },
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => `#${id.slice(-5)}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
    {
      title: "Customer Name",
      key: "customer",
      render: (_, order) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {order.user?.username || "Unknown"}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Delivered"
            ? "green"
            : status === "Canceled"
            ? "red"
            : "blue";
        return (
          <Tag color={color} style={{ borderRadius: "50px" }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `₹${amount.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => router.push(`/dashboard/orderlist/${record._id}`)}
          disabled={selectedOrderId !== record._id} // Only enable when this row is checked
        >
          Details
        </Button>
      ),
    },
  ];

  return (
   <div className="flex flex-col gap-3 w-full bg-[#FAFAFA] rounded-[16px] py-6 px-4">
  <div className="text-xl text-black font-semibold">Recent Orders</div>
  <div className="w-full border-[0.5px] border-[#23232133]"></div>

  {/* Scroll container */}
  <div className="w-full overflow-x-auto">
    <div style={{ minWidth: "900px" }}> 
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={orders}
        loading={isLoading}
        pagination={false}
        bordered={false}
        style={{ borderRadius: "12px", overflow: "hidden" }}
        scroll={{ x: "max-content" }} 
      />
    </div>
  </div>
</div>

  );
};

export default OrdersTable;
