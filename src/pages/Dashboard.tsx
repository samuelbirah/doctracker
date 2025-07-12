import { Layout, Tabs, Spin } from "antd";
import DocumentTable from "../components/DocumentTable";
import DocumentForm from "../components/DocumentForm";
import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, firebaseAuth } from "../services/firebase";
import { Doc } from "../types/document";
import { onAuthStateChanged } from "firebase/auth";

const { Content } = Layout;
const { TabPane } = Tabs;

const parseFirestoreDoc = (doc: any): Doc => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    emitter: data.emitter,
    recipients: data.recipients || [],
    status: data.status || 'Nouveau',
    createdAt: data.createdAt?.toDate() || new Date(),
    history: data.history?.map((item: any) => ({
      date: item.date?.toDate() || new Date(),
      action: item.action,
      by: item.by
    })) || []
  };
};

export default function Dashboard() {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setCurrentUser(user.email || "");
        fetchDocuments(user.email || "");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchDocuments = async (userEmail: string) => {
    try {
      setLoading(true);
      
      // Requête pour les documents où l'utilisateur est émetteur OU destinataire
      const q = query(
        collection(db, "documents"),
        where("recipients", "array-contains", userEmail)
      );

      const querySnapshot = await getDocs(q);
      const docsData = querySnapshot.docs.map(parseFirestoreDoc);
      
      // Ajoute aussi les documents où l'utilisateur est émetteur
      const emitterQuery = query(
        collection(db, "documents"),
        where("emitter", "==", userEmail)
      );
      const emitterSnapshot = await getDocs(emitterQuery);
      const emitterDocs = emitterSnapshot.docs.map(parseFirestoreDoc);

      // Fusionne et supprime les doublons
      const mergedDocs = [...docsData, ...emitterDocs].filter(
        (doc, index, self) => index === self.findIndex((d) => d.id === doc.id)
      );

      setDocuments(mergedDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentAdded = (newDoc: Doc) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Mes Documents" key="1">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <Spin size="large" />
              </div>
            ) : (
              <DocumentTable data={documents} currentUser={currentUser} />
            )}
          </TabPane>
          <TabPane tab="Nouveau Document" key="2">
            <DocumentForm onDocumentAdded={handleDocumentAdded} />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}