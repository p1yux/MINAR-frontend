import React from "react";
import ForgotPasswordForm from "@/components/custom/forms/auth/ForgotPasswordForm";

export const metadata = {
  title: "Verify OTP | Minar - The One Stop Shopping Experience",
  description: "Verify your identity to access your Minar account.",
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
