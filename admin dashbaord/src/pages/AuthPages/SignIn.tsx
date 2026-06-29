import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Admin Login | Hospital Dashboard"
        description="Hospital Admin Dashboard Login Page"
      />

      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}