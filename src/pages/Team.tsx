import { Table, Avatar, Button, Space, Card, Typography, Input } from 'antd';
import { UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title } = Typography;
const { Search } = Input;

interface TeamMember {
  key: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      key: '1',
      name: 'Jean Kabasele',
      email: 'jean.kabasele@regideso.cd',
      role: 'Administrateur',
      department: 'Direction',
      avatar: 'JK'
    },
    {
      key: '2',
      name: 'Marie Mbuji',
      email: 'marie.mbuji@regideso.cd',
      role: 'Gestionnaire',
      department: 'Finances',
      avatar: 'MM'
    },
    {
      key: '3',
      name: 'Paul Lumumba',
      email: 'paul.lumumba@regideso.cd',
      role: 'Technicien',
      department: 'Maintenance',
      avatar: 'PL'
    },
  ]);

  const columns = [
    {
      title: 'Membre',
      dataIndex: 'name',
      render: (text: string, record: TeamMember) => (
        <Space>
          <Avatar>{record.avatar}</Avatar>
          <div>
            <div>{text}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Département',
      dataIndex: 'department',
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
    },
    {
      title: 'Actions',
      render: () => (
        <Space>
          <Button size="small">Modifier</Button>
          <Button size="small" danger>Supprimer</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 24 
      }}>
        <Title level={4}>Gestion de l'équipe</Title>
        <Space>
          <Search
            placeholder="Rechercher un membre"
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<UserAddOutlined />}>
            Ajouter un membre
          </Button>
        </Space>
      </div>

      <Card bordered={false}>
        <Table 
          columns={columns} 
          dataSource={members} 
          pagination={{ pageSize: 5 }} 
        />
      </Card>

      {/* Section Rôles et Permissions */}
      <Card 
        title="Rôles et Permissions" 
        bordered={false} 
        style={{ marginTop: 24 }}
      >
        <Table
          columns={[
            { title: 'Rôle', dataIndex: 'role' },
            { title: 'Permissions', dataIndex: 'permissions' },
            { title: 'Actions', render: () => <Button size="small">Modifier</Button> }
          ]}
          dataSource={[
            { role: 'Administrateur', permissions: 'Accès complet' },
            { role: 'Gestionnaire', permissions: 'Documents + Rapports' },
            { role: 'Technicien', permissions: 'Documents techniques' },
          ]}
          pagination={false}
        />
      </Card>
    </div>
  );
}