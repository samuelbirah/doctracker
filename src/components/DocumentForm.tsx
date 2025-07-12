import { Button, message, Form, Input, Select, Card } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Doc } from '../types/document';
import { firebaseAuth, addDocument } from '../services/firebase';
import { useState } from 'react';
import { User } from 'firebase/auth';


type FormValues = {
  title: string;
  recipients: string[];
};

const RECIPIENT_OPTIONS = [
  { value: 'direction@regideso.cd', label: 'Direction Générale' },
  { value: 'finances@regideso.cd', label: 'Service Financier' },
  { value: 'technique@regideso.cd', label: 'Service Technique' },
  { value: 'commercial@regideso.cd', label: 'Service Commercial' },
];

// Ajouter dans les props
interface Props {
  onDocumentAdded: (doc: Doc) => void;
}

export default function DocumentForm({ onDocumentAdded }: Props) {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const currentUser = (firebaseAuth.currentUser as User)?.email || '';
  // ... reste du code existant

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const docData: Doc = {
        ...values,
        id: `DOC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        emitter: currentUser,
        status: 'Nouveau',
        createdAt: new Date(),
        recipients: values.recipients || [],
        history: [{
          date: new Date(),
          action: 'Création du document',
          by: currentUser
        }]
      };

      await addDocument(docData);
      message.success('Document créé avec succès');
      form.resetFields();
      onDocumentAdded(docData); // Notifier le parent
    } catch (error) {
      console.error('Erreur création document:', error);
      message.error('Échec de la création du document');
    } finally {
      setLoading(false);
    }
  };

  // ... reste du code existant
  return (
    <Card 
      title="Nouveau Document" 
      bordered={false}
      headStyle={{ borderBottom: 0 }}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* ... reste du formulaire inchangé ... */}
                <Form.Item 
          name="title" 
          label="Titre du document"
          rules={[
            { required: true, message: 'Le titre est obligatoire' },
            { max: 100, message: 'Maximum 100 caractères' },
            { whitespace: true, message: 'Ne peut pas être vide' }
          ]}
        >
          <Input 
            placeholder="Ex: Rapport financier Q3 2023" 
            maxLength={100}
            showCount
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="recipients"
          label="Destinataires"
          rules={[{ 
            required: true, 
            type: 'array',
            min: 1,
            message: 'Sélectionnez au moins un destinataire' 
          }]}
        >
          <Select
            mode="multiple"
            placeholder="Sélectionnez les services destinataires"
            optionFilterProp="label"
            options={RECIPIENT_OPTIONS}
            showSearch
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            size="large"
            block
            icon={<SaveOutlined />}
          >
            Enregistrer le Document
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}