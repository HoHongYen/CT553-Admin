import { useState } from "react";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import FormRowVertical from "@/components/ui/FormRowVertical";
import SpinnerMini from "@/components/ui/SpinnerMini";
import GoogleIcon from "@/components/icons/GoogleIcon";

import app from "../../firebase";
const auth = getAuth(app);
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useLogin } from "@/hooks/auth/useLogin";
import { useLoginWithGoogle } from "@/hooks/profile/useLoginWithGoogle";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading: isLoading1 } = useLogin();
  const { loginWithGoogle, isLoading: isLoading2 } = useLoginWithGoogle();

  const images = {
    eyeOn:
      "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/576/eye-64.png",
    eyeOff:
      "https://cdn3.iconfinder.com/data/icons/mix-pack-6/44/Asset_25-64.png",
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  // LOGIN WITH GOOGLE

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    console.log("Login with Google");

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = {
        fullName: result.user.displayName,
        email: result.user.email,
        phone: result.user.phoneNumber,
      };
      loginWithGoogle(user);
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading1 || isLoading2}
        />
      </FormRowVertical>
      <FormRowVertical label="Mật khẩu">
        <div id="password" className="w-full relative">
          <Input
            className="w-full"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading1 || isLoading2}
          />
          {/* show password begin  */}
          <div className="absolute right-3 top-[50%] translate-y-[-50%]">
            <img
              onClick={() => setShowPassword((show) => !show)}
              src={showPassword ? images.eyeOn : images.eyeOff}
              className="hover:cursor-pointer h-8 w-8"
            />
          </div>
          {/* show password end  */}
        </div>
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading1 || isLoading2}>
          {!isLoading1 ? "Đăng nhập" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <div className="flex justify-center">hoặc</div>
      <FormRowVertical>
        <Button
          onClick={handleLoginWithGoogle}
          size="large"
          variation="secondary"
          disabled={isLoading1 || isLoading2}
        >
          {!isLoading2 ? (
            <div className="flex gap-10 justify-center items-center">
              <GoogleIcon />
              <span>Đăng nhập bằng Google</span>
            </div>
          ) : (
            <SpinnerMini />
          )}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
