import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(email, password) {
    await login(email, password);
    navigate("/");
  }

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Log in to see the links you've saved."
      submitLabel="Log in"
      pendingLabel="Logging in…"
      onSubmit={handleSubmit}
      footer={
        <>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </>
      }
    />
  );
}
