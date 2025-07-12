import { Table, Tag, Button, Popconfirm, Space, message } from "antd";
import type { ColumnType } from 'antd/es/table';
import { Doc } from "../types/document";
import { Key } from 'react';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../services/firebase";

const statusColors = {
  'Nouveau': 'blue',
  'En traitement': 'orange',
  'Traité': 'green',
  'Archivé': 'gray'
} as const;

interface Props {
  data: Doc[];
  currentUser: string;
}

const DocumentTable = ({ data , currentUser}: Props) => {

  const handleTransmit = async (docId: string) => {
    try {
      await updateDoc(doc(db, "documents", docId), {
        status: "En traitement",
        history: arrayUnion({
          date: new Date(),
          action: "Document transmis",
          by: currentUser
        })
      });
      message.success("Document transmis avec succès");
    } catch (error) {
      console.error("Erreur lors de la transmission:", error);
      message.error("Échec de la transmission");
    }
  };

  const handleClose = async (docId: string) => {
    try {
      await updateDoc(doc(db, "documents", docId), {
        status: "Traité",
        history: arrayUnion({
          date: new Date(),
          action: "Document clôturé",
          by: currentUser
        })
      });
      message.success("Document clôturé avec succès");
    } catch (error) {
      console.error("Erreur lors de la clôture:", error);
      message.error("Échec de la clôture");
    }
  };

  const columns: ColumnType<Doc>[] = [
    {
      title: "Référence",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Titre",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof statusColors) => (
        <Tag color={statusColors[status]}>{status}</Tag>
      ),
      filters: Object.keys(statusColors).map(status => ({
        text: status,
        value: status,
      })),
      onFilter: (value: boolean | Key, record: Doc) => {
        if (typeof value === 'string') {
          return record.status === value;
        }
        return false;
      },
    },
    {
      title: "Émetteur",
      dataIndex: "emitter",
      key: "emitter",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date: Date) => date?.toLocaleDateString(),
      sorter: (a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Doc) => (
        <Space>
          <Button 
            size="small" 
            onClick={() => handleTransmit(record.id)}
            disabled={record.status === 'Traité' || record.status === 'Archivé'}
          >
            Transmettre
          </Button>
          <Popconfirm
            title="Marquer comme traité ?"
            onConfirm={() => handleClose(record.id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button 
              size="small" 
              type="primary" 
              ghost
              disabled={record.status === 'Traité' || record.status === 'Archivé'}
            >
              Clôturer
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const sortedData = [...data].sort(
    (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
  ).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));

  return (
    <Table 
      columns={columns} 
      dataSource={sortedData} 
      rowKey="id"
      bordered
      expandable={{
        expandedRowRender: (record) => (
          <div style={{ padding: '8px 24px' }}>
            <p><strong>Émetteur:</strong> {record.emitter}</p>
            <p><strong>Destinataires:</strong> {record.recipients?.join(', ')}</p>
            <p><strong>Créé le:</strong> {record.createdAt?.toLocaleString()}</p>
            {record.history?.length ? (
              <div style={{ marginTop: 12 }}>
                <strong>Historique:</strong>
                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                  {record.history.map((item, i) => (
                    <li key={i}>
                      {new Date(item.date).toLocaleString()} - {item.action} par {item.by}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ),
        rowExpandable: (record) => !!record.emitter,
      }}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        showTotal: (total) => `Total ${total} documents`,
      }}
    />
  );
};

export default DocumentTable;