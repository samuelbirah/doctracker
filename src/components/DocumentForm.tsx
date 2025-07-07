import { Button, Form, Input } from 'antd';
import { Document } from '../types/document';

export default function DocumentForm() {
  const [form] = Form.useForm();

  const onFinish = (values: Document) => {
    console.log('Document values:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="title" label="Titre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enregistrer
        </Button>
      </Form.Item>
    </Form>
  );
}