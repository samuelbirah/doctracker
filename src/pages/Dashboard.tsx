import { Layout, Card } from "antd";
import DocumentTable from "../components/DocumentTable";
import { Document } from "../types/document";

const { Content } = Layout;

export default function Dashboard() {
  // Données temporaires (remplacer par Firestore plus tard)
  const mockData: Document[] = [
    { 
        id: "DOC-001",
        title: "Rapport Financier",
        status: "En traitement",
        emitter: "comptabilite@regideso.cd",
        recipients: ["dg@regideso.cd"],
        createdAt: new Date()
    },
    {
        id: "DOC-002",
        title: "Demande Budget",
        status: "Traité",
        emitter: "comptabilite@regideso.cd",
        recipients: ["dg@regideso.cd"],
        createdAt: new Date()
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Card title="Documents en Cours">
          <DocumentTable data={mockData} />
        </Card>
      </Content>
    </Layout>
  );
}