import { Card, Tabs, Form, Input, Button, Switch, Select } from 'antd';
import App from 'antd/es/app';
import { 
  LockOutlined, 
  NotificationOutlined, 
  GlobalOutlined,
  UserOutlined,
  MailOutlined 
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const { TabPane } = Tabs;
const { Option } = Select;

export default function SettingsPage() {
  const { message : antdMessage} = App.useApp();
  const { currentUser } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    // Ici vous ajouteriez la logique pour sauvegarder les paramètres
    setTimeout(() => {
      antdMessage.success('Paramètres mis à jour avec succès');
      setLoading(false);
    }, 1000);
  };

  return (
    <Card 
      title="Paramètres" 
      bordered={false}
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
      <Tabs defaultActiveKey="1">
        {/* Onglet Compte */}
        <TabPane tab={<span><UserOutlined /> Compte</span>} key="1">
          <Form
            form={form}
            initialValues={{
              email: currentUser?.email,
              name: currentUser?.displayName
            }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Nom complet"
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
            >
              <Input prefix={<MailOutlined />} disabled />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Mettre à jour
            </Button>
          </Form>
        </TabPane>

        {/* Onglet Notifications */}
        <TabPane tab={<span><NotificationOutlined /> Notifications</span>} key="2">
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

            <Form.Item
              name="notificationFrequency"
              label="Fréquence des notifications"
            >
              <Select defaultValue="immediate">
                <Option value="immediate">Immédiates</Option>
                <Option value="daily">Quotidiennes</Option>
                <Option value="weekly">Hebdomadaires</Option>
              </Select>
            </Form.Item>

            <Button type="primary">
              Sauvegarder
            </Button>
          </Form>
        </TabPane>

        {/* Onglet Sécurité */}
        <TabPane tab={<span><LockOutlined /> Sécurité</span>} key="3">
          <Form layout="vertical">
            <Form.Item
              name="currentPassword"
              label="Mot de passe actuel"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="Nouveau mot de passe"
              rules={[{ min: 8, message: 'Minimum 8 caractères' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirmer le mot de passe"
              dependencies={['newPassword']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Les mots de passe ne correspondent pas');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button type="primary" danger>
              Changer le mot de passe
            </Button>
          </Form>
        </TabPane>

        {/* Onglet Préférences */}
        <TabPane tab={<span><GlobalOutlined /> Préférences</span>} key="4">
          <Form layout="vertical">
            <Form.Item
              name="language"
              label="Langue"
            >
              <Select defaultValue="fr">
                <Option value="fr">Français</Option>
                <Option value="en">English</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="timezone"
              label="Fuseau horaire"
            >
              <Select defaultValue="Africa/Kinshasa">
                <Option value="Africa/Kinshasa">Kinshasa (UTC+1)</Option>
                <Option value="Africa/Lubumbashi">Lubumbashi (UTC+2)</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="theme"
              label="Thème"
            >
              <Select defaultValue="light">
                <Option value="light">Clair</Option>
                <Option value="dark">Sombre</Option>
              </Select>
            </Form.Item>

            <Button type="primary">
              Sauvegarder
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </Card>
  );
}