import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Layout, Spin, Drawer } from "antd";
import { useState } from "react";
import AppHeader from "./Header";
import AppSider from "./AppSider";
import AppFooter from "./Footer";
import { useWindowSize } from "../hooks/useWindowSize"; // Créez ce hook

const { Content } = Layout;

const ProtectedLayout = () => {
  const { currentUser, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const { width } = useWindowSize(); // Hook personnalisé pour détecter la taille de l'écran
  const isMobile = width < 768; // 768px est le breakpoint pour tablette

  if (loading) {
    return <Spin size="large" fullscreen />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        toggleDrawer={() => setMobileDrawerVisible(!mobileDrawerVisible)}
      />
      
      <Layout>
        {/* Version desktop */}
        {!isMobile && (
          <AppSider 
            collapsed={collapsed} 
            onCollapse={setCollapsed}
          />
        )}
        
        {/* Version mobile */}
        {isMobile && (
          <Drawer
            placement="left"
            closable={true}
            onClose={() => setMobileDrawerVisible(false)}
            open={mobileDrawerVisible}
            width={250}
            bodyStyle={{ padding: 0 }}
          >
            <AppSider 
              collapsed={false}
              isMobile={true}
              onItemClick={() => setMobileDrawerVisible(false)}
            />
          </Drawer>
        )}

        <Layout style={{ background: '#f0f2f5' }}>
          <Content style={{ 
            margin: '24px 16px', 
            padding: 24, 
            minHeight: 280,
            background: '#fff',
            borderRadius: 8
          }}>
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;