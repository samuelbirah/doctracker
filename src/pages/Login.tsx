import { auth } from "../services/firebase";
import { Button, Card, Form, Input, Image, Typography, theme } from "antd";
import App from 'antd/es/app';
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import logo from '../assets/images/logo.png';
import backgroundImage from '../assets/images/eau2.jpeg';

const { Title, Text } = Typography
const { useToken } = theme

export default function Login() {
  const { message : antdMessage} = App.useApp();
  const { token } = useToken()

  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(values.email, values.password);
      antdMessage.success(`Bienvenue ${userCredential.user?.email}`);
      navigate("/dashboard");
    } catch (error: any) {
      antdMessage.error("Échec de la connexion : " + error.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `linear-gradient(rgba(9, 69, 156, 0.7), rgba(115, 158, 222, 0.7)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '380px',
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadow,
          border: 'none',
        }}
        bodyStyle={{ 
          padding: '28px',
          paddingBottom: '20px' 
        }}
      >
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '24px',
          padding: '0 8px'
        }}>
          <Image 
            src={logo} 
            preview={false}
            width={80}
            style={{ marginBottom: '12px' }}
          />
          <Title level={4} style={{ 
            color: token.colorPrimary,
            margin: 0,
            fontWeight: 600,
            fontSize: '20px'
          }}>
            DocTracker
          </Title>
          <Text type="secondary" style={{ 
            color: '#284063',
            fontSize: '13px'
          }}>
            Suivi documentaire en temps réel
          </Text>
        </div>

        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item 
            name="email" 
            rules={[
              { required: true, message: 'Email requis' },
              { type: 'email', message: 'Format email invalide' }
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: '#739EDE', fontSize: '14px' }} />}
              placeholder="Email professionnel" 
              size="middle"
              style={{
                borderRadius: token.borderRadius,
                padding: '8px 12px',
                backgroundColor: token.colorBgContainer
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Mot de passe requis' },
              { min: 8, message: 'Minimum 8 caractères' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#739EDE', fontSize: '14px' }} />}
              placeholder="Mot de passe" 
              size="middle"
              style={{
                borderRadius: '6px',
                padding: '8px 12px',
                backgroundColor: '#FBF9F6'
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: '16px', marginBottom: '8px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block
              size="middle"
              style={{
                background: token.colorPrimary,
                border: 'none',
                borderRadius: token.borderRadius,
                height: token.controlHeight,
                fontWeight: 500,
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = token.colorPrimaryHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#09459C';
              }}
            >
              Connexion
            </Button>
          </Form.Item>
        </Form>

        <div style={{
          textAlign: 'center',
          marginTop: '16px',
        }}>
          <Text style={{ 
            color: '#ACAEB0',
            fontSize: '12px'
          }}>
            <a href="./Login.tsx" style={{ color: '#739EDE', fontWeight: 500 }}>
              Assistance technique
            </a> • Version 1.0.0
          </Text>
        </div>
      </Card>
    </div>
  );
}