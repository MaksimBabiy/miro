import { Link } from "react-router";
import AuthWrapper from "./authwrapper";
import { ROUTES } from "@/shared/model/routes";
import { LoginForm } from "./login.form";

const LoginPage = () => {
  return (
    <AuthWrapper
      title="Login"
      description="Login to your account"
      footer={
        <div className="m-auto">
          <span>Dont have an account?</span>{" "}
          <Link to={ROUTES.REGISTER}>Register</Link>
        </div>
      }
    >
      <LoginForm />
    </AuthWrapper>
  );
};

export const Component = LoginPage;
