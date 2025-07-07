import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom"; // Importez useNavigate

export default function Login() {
  const navigate = useNavigate(); // Initialisez le hook de navigation

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      // Simulation de connexion
      await new Promise(resolve => setTimeout(resolve, 500)); // Petit délai pour le réalisme
      
      message.success(`Connecté avec ${values.email}`);
      console.log("Connexion simulée !");
      
      // Redirection vers le dashboard
      navigate("/dashboard"); 
    } catch (error) {
      message.error("Échec de la connexion");
      console.error("Erreur", error);
    }
  };

  return (
    <Card title="Connexion" style={{ width: 300, margin: "100px auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item 
          name="email" 
          rules={[
            { required: true, message: 'Email requis' },
            { type: 'email', message: 'Email invalide' }
          ]}
        >
          <Input placeholder="exemple@email.com" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Mot de passe requis' },
            { min: 6, message: '6 caractères minimum' }
          ]}
        >
          <Input.Password placeholder="••••••" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Se connecter
        </Button>
      </Form>
    </Card>
  );
}