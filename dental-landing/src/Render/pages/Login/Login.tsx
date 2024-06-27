import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import "./Login.css";

function Login() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <section className="min-h-screen min-w-full login-bg-img flex items-center justify-center">
      <div className="login-form w-[350px] md:w-[500px] lg:w-[929px] h-[495px] mx-auto my-2 bg-lightgray bg-opacity-60 p-5 lg:p-8 rounded-xl border border-slate-700">
        <div>
          <Link to="/">
            <button className="flex items-center bg-transparent poppins-medium">
              <ChevronLeftIcon
                className="h-5 w-5 flex-none text-black"
                aria-hidden="true"
              />
              Atrás
            </button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="my-5 mx-auto w-[90%] lg:w-[50%]">
          <h2 className="text-center lg:text-left poppins-medium text-xl mb-8">Inicio de sesión</h2>
          <div className="flex flex-col poppins-regular">
            <label htmlFor="email">
              <p className="font-medium text-slate-700">Usuario</p>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow mb-3"
                placeholder="Ejemplo@gmail.com "
              />
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700">Contraseña</p>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow mb-8"
                placeholder="*******"
              />
            </label>
            <div className="text-center lg:text-left">
              <div>
                <a href="#" className="font-medium text-[#4053FF]">
                  Olvidé mi contraseña
                </a>
              </div>
            </div>
            <button type="submit" className="poppins-semibold text-lg w-[40%] lg:w-[30%] p-2 text-black bg-acento rounded-xl hover:shadow items-center justify-center mx-auto lg:mx-0 mt-14">
              <span>Continuar</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
