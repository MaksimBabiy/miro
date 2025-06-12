import { ROUTES } from "@/shared/model/routes";
import AuthWrapper from "./authwrapper";
import { Link } from "react-router";
import { RegisterForm } from "./register.form";

const RegisterPage = () => {
  return (
    <AuthWrapper
      title="Register"
      description="Register to your account"
      footer={
        <div>
          <span>Do you have an account?</span>{" "}
          <Link to={ROUTES.LOGIN}>Login</Link>
        </div>
      }
    >
      <RegisterForm />
    </AuthWrapper>
  );
};

export const Component = RegisterPage;
