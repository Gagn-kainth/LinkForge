import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(email, password) {
    await signup(email, password);
    navigate("/");
  }

  return (
    <AuthForm
      title="Create an account"
      subtitle="Save every link you shorten to your own dashboard."
      submitLabel="Sign up"
      pendingLabel="Creating account…"
      onSubmit={handleSubmit}
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    />
  );
}
