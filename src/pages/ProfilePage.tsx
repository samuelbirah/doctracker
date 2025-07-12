import { Card, Avatar, Form, Input, Button, Upload, Divider, Row, Col, Typography, Tag, Tabs, Switch } from 'antd';
import App from 'antd/es/app';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, LockOutlined, CameraOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { firebaseAuth, updateUserProfile } from '../services/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function ProfilePage() {
  const { message : antdMessage} = App.useApp();
  const { currentUser } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
  try {
    setLoading(true);
    await updateUserProfile({
      displayName: values.name,
      phoneNumber: values.phone
    });
    
    // Force un rechargement des données utilisateur
    const updatedUser = firebaseAuth.currentUser;
    if (updatedUser) {
      // Mettez à jour le formulaire avec les nouvelles valeurs
      form.setFieldsValue({
        name: updatedUser.displayName,
        phone: updatedUser.phoneNumber
      });
    }
    
    antdMessage.success('Profil mis à jour avec succès', 3); // 3 secondes de durée
    setEditMode(false);
  } catch (error) {
    console.error('Erreur mise à jour:', error);
    antdMessage.error('Erreur lors de la mise à jour du profil', 3);
  } finally {
    setLoading(false);
  }
};

  const handleLogout = async () => {
    await firebaseAuth.signOut();
    navigate('/login');
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        antdMessage.error('Vous ne pouvez uploader que des images!');
      }
      return isImage || Upload.LIST_IGNORE;
    },
    onChange: (info: any) => {
      if (info.file.status === 'done') {
        antdMessage.success(`${info.file.name} image téléversée avec succès`);
        // Ici vous ajouteriez la logique pour sauvegarder la photo de profil
      }
    },
    showUploadList: false,
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Row gutter={24}>
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <Upload {...uploadProps}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Avatar 
                  size={150} 
                  icon={<UserOutlined />} 
                  src={currentUser?.photoURL}
                  style={{ 
                    backgroundColor: '#09459C',
                    fontSize: 60,
                    cursor: 'pointer'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 20,
                  background: '#09459C',
                  borderRadius: '50%',
                  padding: 8,
                  color: 'white',
                  cursor: 'pointer'
                }}>
                  <CameraOutlined />
                </div>
              </div>
            </Upload>
            
            <Title level={4} style={{ marginTop: 16 }}>
              {currentUser?.displayName || 'Utilisateur'}
            </Title>
            <Text type="secondary">{currentUser?.email}</Text>
            
            <Divider />
            
            <div style={{ textAlign: 'left', padding: '0 16px' }}>
              <div style={{ marginBottom: 12 }}>
                <Text strong><PhoneOutlined /> Téléphone:</Text>
                <Text style={{ display: 'block' }}>
                  {currentUser?.phoneNumber || 'Non renseigné'}
                </Text>
              </div>
              
              <div style={{ marginBottom: 12 }}>
                <Text strong><EnvironmentOutlined /> Service:</Text>
                <Text style={{ display: 'block' }}>
                  {currentUser?.department || 'Non spécifié'}
                </Text>
              </div>
              
              <div>
                <Text strong>Rôle:</Text>
                <div style={{ marginTop: 4 }}>
                  <Tag color="blue" style={{ marginRight: 4 }}>Utilisateur</Tag>
                  <Tag color="green">Verifié</Tag>
                </div>
              </div>
            </div>
          </Col>
          
          <Col xs={24} md={16}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Informations personnelles" key="1">
                <Form
                  form={form}
                  initialValues={{
                    name: currentUser?.displayName,
                    email: currentUser?.email,
                    phone: currentUser?.phoneNumber
                  }}
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Form.Item
                    name="name"
                    label="Nom complet"
                    rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}
                  >
                    <Input 
                      prefix={<UserOutlined />} 
                      disabled={!editMode}
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="email"
                    label="Email"
                  >
                    <Input 
                      prefix={<MailOutlined />} 
                      disabled 
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="phone"
                    label="Téléphone"
                  >
                    <Input 
                      prefix={<PhoneOutlined />} 
                      disabled={!editMode}
                    />
                  </Form.Item>
                  
                  {editMode ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        icon={<SaveOutlined />}
                        loading={loading}
                      >
                        Enregistrer
                      </Button>
                      <Button onClick={() => setEditMode(false)}>
                        Annuler
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      type="primary" 
                      ghost 
                      icon={<EditOutlined />}
                      onClick={() => setEditMode(true)}
                    >
                      Modifier le profil
                    </Button>
                  )}
                </Form>
              </TabPane>
              
              <TabPane tab="Sécurité" key="2">
                <Card bordered={false} style={{ marginBottom: 16 }}>
                  <Title level={5} style={{ marginBottom: 16 }}>
                    <LockOutlined /> Changer le mot de passe
                  </Title>
                  <Form layout="vertical">
                    <Form.Item
                      name="currentPassword"
                      label="Mot de passe actuel"
                      rules={[{ required: true }]}
                    >
                      <Input.Password />
                    </Form.Item>
                    
                    <Form.Item
                      name="newPassword"
                      label="Nouveau mot de passe"
                      rules={[{ required: true, min: 8 }]}
                    >
                      <Input.Password />
                    </Form.Item>
                    
                    <Form.Item
                      name="confirmPassword"
                      label="Confirmer le mot de passe"
                      dependencies={['newPassword']}
                      rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject('Les mots de passe ne correspondent pas!');
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    
                    <Button type="primary">
                      Mettre à jour le mot de passe
                    </Button>
                  </Form>
                </Card>
                
                <Card bordered={false}>
                  <Title level={5} style={{ marginBottom: 16 }}>
                    Sessions actives
                  </Title>
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>Cette session</Text>
                    <Text type="secondary" style={{ display: 'block' }}>
                      Connecté depuis {new Date().toLocaleDateString()}
                    </Text>
                  </div>
                  <Button danger onClick={handleLogout}>
                    Se déconnecter de tous les appareils
                  </Button>
                </Card>
              </TabPane>
              
              <TabPane tab="Préférences" key="3">
                <Card bordered={false}>
                  <Title level={5} style={{ marginBottom: 16 }}>
                    Paramètres de notification
                  </Title>
                  
                  <Form layout="vertical">
                    <Form.Item
                      name="emailNotifications"
                      label="Notifications par email"
                      valuePropName="checked"
                    >
                      <Switch checkedChildren="Activé" unCheckedChildren="Désactivé" defaultChecked />
                    </Form.Item>
                    
                    <Form.Item
                      name="appNotifications"
                      label="Notifications dans l'application"
                      valuePropName="checked"
                    >
                      <Switch checkedChildren="Activé" unCheckedChildren="Désactivé" defaultChecked />
                    </Form.Item>
                    
                    <Button type="primary">
                      Sauvegarder les préférences
                    </Button>
                  </Form>
                </Card>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </div>
  );
}