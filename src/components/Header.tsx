import { Layout, Dropdown, Avatar, Button } from 'antd';
import { LogoutOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../assets/images/logoGray.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile?: boolean;
  toggleDrawer?: () => void;
}

export default function AppHeader({ collapsed, setCollapsed, isMobile, toggleDrawer }: AppHeaderProps) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Mon Profil',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile')
    },
    {
      key: 'logout',
      label: 'Déconnexion',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout
    }
  ];

  return (
    <Header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: '#09459C',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      zIndex: 1,
      position: 'sticky',
      top: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Bouton menu différent selon mobile/desktop */}
        {isMobile ? (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: 'white'
            }}
          />
        ) : (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: 'white'
            }}
          />
        )}
        
        {/* Logo et nom de l'application */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginLeft: isMobile ? 0 : (collapsed ? 0 : 16),
          transition: 'margin-left 0.2s' 
        }}>
          <img 
            src={logo} 
            alt="Logo REGIDESO" 
            style={{ 
              height: 38, 
              marginRight: isMobile ? 0 : 12,
              display: isMobile && collapsed ? 'none' : 'block'
            }} 
          />
          {(!collapsed || isMobile) && (
            <span style={{ 
              color: 'white',
              fontSize: 18,
              fontWeight: 600,
              display: isMobile ? 'none' : 'block' // Cache le texte sur mobile
            }}>
              DocTracker
            </span>
          )}
        </div>
      </div>

      {/* Section utilisateur */}
      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Avatar 
            icon={<UserOutlined />} 
            src={currentUser?.photoURL}
            style={{ backgroundColor: '#87d068' }}
          />
          {!isMobile && ( // Cache le nom sur mobile
            <span style={{ 
              color: 'white',
              marginLeft: 8,
              fontWeight: 500
            }}>
              {currentUser?.displayName || currentUser?.email?.split('@')[0]}
            </span>
          )}
        </div>
      </Dropdown>
    </Header>
  );
}