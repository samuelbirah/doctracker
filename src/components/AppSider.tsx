import { Layout, Menu, theme } from 'antd';
import {
  DashboardOutlined,
  FileAddOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

interface AppSiderProps {
  collapsed: boolean;
  isMobile?: boolean;
  onItemClick?: () => void;
  onCollapse?: (collapsed: boolean) => void;
}

export default function AppSider({ collapsed, isMobile, onItemClick }: AppSiderProps) {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Tableau de bord',
      onClick: () => {
        navigate('/dashboard');
        onItemClick?.();
      }
    },
    {
      key: 'documents',
      icon: <FileAddOutlined />,
      label: 'Nouveau Document',
      onClick: () => {
        navigate('/documents/new');
        onItemClick?.();
      }
    },
    {
      key: 'team',
      icon: <TeamOutlined />,
      label: 'Équipe',
      onClick: () => {
        navigate('/team');
        onItemClick?.();
      }
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Mon Profil',
      onClick: () => {
        navigate('/profile');
        onItemClick?.();
      }
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Paramètres',
      onClick: () => {
        navigate('/settings');
        onItemClick?.();
      }
    }
  ];

  return (
    <Sider
      collapsible={!isMobile} // Désactive le collapsible sur mobile
      collapsed={isMobile ? false : collapsed} // Toujours étendu sur mobile
      width={isMobile ? '100%' : 250} // Prend toute la largeur sur mobile
      style={{
        background: token.colorBgContainer,
        overflow: 'auto',
        height: '100vh',
        position: isMobile ? 'static' : 'sticky',
        top: 0,
        left: 0,
        borderRight: `1px solid ${token.colorBorderSecondary}`
      }}
    >
      {!isMobile && (
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: token.colorText,
          fontSize: collapsed ? 14 : 18,
          fontWeight: 'bold'
        }}>
          {collapsed ? 'RD' : 'REGIDESO'}
        </div>
      )}
      <Menu
        theme="light"
        mode="inline"
        items={menuItems}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
}