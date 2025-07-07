import { Table, Tag } from "antd";
import { Document } from "../types/document";

const columns = [
  {
    title: "Référence",
    dataIndex: "id",
    key: "id",
    sorter: (a: Document, b: Document) => a.id.localeCompare(b.id),
  },
  {
    title: "Statut",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "Traité" ? "green" : "orange"}>{status}</Tag>
    ),
  },
];

interface Props {
  data: Document[];
}

export default function DocumentTable({ data }: Props) {
  return <Table columns={columns} dataSource={data} rowKey="id" />;
}