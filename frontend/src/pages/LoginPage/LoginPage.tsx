import { useEffect, useRef, useState } from "react";
import WaveBackground from "./components/WaveBackground";
import { DiMagento } from "react-icons/di";
import { useNavigate } from "react-router-dom";
import useUserAPI from "../../hooks/useUserAPI";
import TextFields from "./components/TextFields";

export interface LoginPageProps {
  login: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ login }) => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const popup = useRef<HTMLDivElement>(null);

  const { postLogin, error } = useUserAPI();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault(); // evita recarregar a página
    const data = await postLogin({ email, password });
    if (!data) return;
    login(data.token);
    nav("/user-list");
  };

  useEffect(() => {
    if (error) activatePopUp(error);
  }, [error]);

  function activatePopUp(valor: string) {
    if (popup.current) {
      popup.current.innerText = valor;
      popup.current.className =
        "fixed top-5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-500 ease-in-out z-50 bg-red-100 text-red-700 shadow-md opacity-100";
      setTimeout(() => {
        if (popup.current) {
          popup.current.classList.add("opacity-0");
          popup.current.classList.remove("opacity-100");
        }
      }, 2000);
    }
  }

  return (
    <div className="flex lg:justify-end justify-center items-center w-screen h-screen bg-[linear-gradient(178.05deg,#065D2F_1.65%,#DBEDD6_75.83%)] relative overflow-hidden">
      <div className="bg-base-100 p-12 lg:h-screen h-fit lg:w-1/2 w-3/4 relative z-10 rounded-2xl flex flex-col justify-center items-center">
        <div
          ref={popup}
          className="fixed top-5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-500 ease-in-out z-50 bg-red-100 text-red-700 shadow-md opacity-0 pointer-events-none"
        ></div>

        <DiMagento className="w-full h-full max-w-64 max-h-64 ml-auto mr-auto fill-primary" />
        <h1 className="font-semibold text-4xl mb-8 text-primary">
          SafeMeetings™
        </h1>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md flex flex-col items-center"
        >
          <TextFields
            email={email}
            password={password}
            onChangeEmail={setEmail}
            onChangePassword={setPassword}
          />

          <button type="submit" className="btn btn-primary w-full mt-12">
            Login
          </button>
        </form>
      </div>
      <WaveBackground />
    </div>
  );
};

export default LoginPage;
