import { Button, Card, Row, Col, Typography, Space, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined, LoginOutlined } from "@ant-design/icons";
import regidesoLogo from "../assets/images/logo.png"; // Remplacez par votre chemin
import documentHero from "../assets/images/eau2.jpeg"; // Ajoutez une image d'illustration

const { Title, Text, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Header */}
      <header style={{ 
        background: "#09459C",
        padding: "16px 24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Space>
            <Image 
              src={regidesoLogo} 
              preview={false} 
              width={40} 
              style={{ verticalAlign: "middle" }} 
            />
            <Text strong style={{ color: "white", fontSize: 20 }}>REGIDESO DocTracker</Text>
          </Space>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        background: "linear-gradient(135deg, #09459C 0%, #1a73e8 100%)",
        color: "white",
        padding: "80px 24px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Title level={1} style={{ color: "white", marginBottom: 16 }}>
            Gestion intelligente des documents
          </Title>
          <Paragraph style={{ 
            fontSize: 18, 
            maxWidth: 800, 
            margin: "0 auto 32px",
            color: "rgba(255, 255, 255, 0.9)"
          }}>
            Optimisez votre flux documentaire avec la solution digitale de REGIDESO. 
            Suivi en temps réel, collaboration simplifiée et sécurité renforcée.
          </Paragraph>
          
          <Space size="large">
            <Button 
              type="primary" 
              size="large"
              icon={<LoginOutlined />}
              onClick={() => navigate("/login")}
              style={{ 
                background: "#fff", 
                color: "#09459C",
                fontWeight: 600
              }}
            >
              Connexion
            </Button>
            <Button 
              type="dashed" 
              size="large"
              onClick={() => navigate("/dashboard")}
              style={{ 
                color: "#fff",
                borderColor: "#fff",
                fontWeight: 600
              }}
            >
              Voir la démo <ArrowRightOutlined />
            </Button>
          </Space>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 60 }}>
          Fonctionnalités clés
        </Title>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card hoverable>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{
                  background: "#09459C20",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ fontSize: 24 }}>📄</span>
                </div>
              </div>
              <Title level={4} style={{ textAlign: "center" }}>Suivi en temps réel</Title>
              <Paragraph>
                Visualisez l'état de chaque document et recevez des notifications 
                pour chaque mise à jour importante.
              </Paragraph>
            </Card>
          </Col>
          
          <Col xs={24} md={8}>
            <Card hoverable>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{
                  background: "#09459C20",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ fontSize: 24 }}>🔒</span>
                </div>
              </div>
              <Title level={4} style={{ textAlign: "center" }}>Sécurité renforcée</Title>
              <Paragraph>
                Protocoles de sécurité avancés pour protéger vos documents sensibles 
                conformément aux normes REGIDESO.
              </Paragraph>
            </Card>
          </Col>
          
          <Col xs={24} md={8}>
            <Card hoverable>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{
                  background: "#09459C20",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ fontSize: 24 }}>🤝</span>
                </div>
              </div>
              <Title level={4} style={{ textAlign: "center" }}>Collaboration simplifiée</Title>
              <Paragraph>
                Travaillez efficacement avec vos collègues grâce à des outils 
                de commentaires et d'approbation intégrés.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Call to Action */}
      <section style={{ 
        background: "#f8f9fa",
        padding: "60px 24px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Title level={2} style={{ marginBottom: 24 }}>
            Prêt à transformer votre gestion documentaire ?
          </Title>
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate("/login")}
            style={{ 
              padding: "0 40px",
              height: 50,
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Commencer maintenant <ArrowRightOutlined />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: "#09459C",
        color: "white",
        padding: "24px",
        textAlign: "center"
      }}>
        <Paragraph style={{ marginBottom: 0 }}>
          © {new Date().getFullYear()} REGIDESO DocTracker. Tous droits réservés.
        </Paragraph>
      </footer>
    </div>
  );
}