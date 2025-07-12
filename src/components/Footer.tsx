import { Layout, Typography, Divider } from 'antd';
import { theme } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

export default function AppFooter() {
  const { token } = theme.useToken();

  return (
    <Footer style={{
      textAlign: 'center',
      padding: '16px 24px',
      background: token.colorPrimary,
      color: 'rgba(255, 255, 255, 0.85)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)', margin: '12px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            © {new Date().getFullYear()} TechAccess - Tous droits réservés
          </Text>
          <div>
            <Text style={{ margin: '0 8px', color: 'rgba(255, 255, 255, 0.65)' }}>Version 1.0.0</Text>
            <Text style={{ margin: '0 8px', color: 'rgba(255, 255, 255, 0.65)' }}>|</Text>
            <Text style={{ margin: '0 8px', color: 'rgba(255, 255, 255, 0.65)' }}>Conditions d'utilisation</Text>
          </div>
        </div>
      </div>
    </Footer>
  );
}