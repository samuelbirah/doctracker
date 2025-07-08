import { auth } from "../services/firebase";
import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom"; // Importez useNavigate

export default function Login() {
  const navigate = useNavigate(); // Initialisez le hook de navigation

  const handleLogin = async (values: { email: string; password: string }) => {
  try {
    // Connexion avec Firebase Auth
    const userCredential = await auth.signInWithEmailAndPassword(values.email, values.password);
    const user = userCredential.user;

    message.success(`Connecté avec ${user.email}`);
    console.log("Connexion réussie :", user);

    // Redirection vers le dashboard
    navigate("/dashboard");
  } catch (error: any) {
    message.error("Échec de la connexion : " + error.message);
    console.error("Erreur Firebase :", error);
  }
};

  return (
    <Card title="Connexion" style={{ width: 300, margin: "100px auto" }}>
      <Form onFinish={handleLogin}>
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