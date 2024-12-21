import { useState } from "react";
import { useRouter } from "next/router";
import authService from "../service/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(email, password);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response));
            router.push("/");
        } catch (err) {
            setError("Credenciais inválidas. Tente novamente.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Bem-vindo(a)!</h2>
                <p>Por favor, insira suas credenciais para continuar.</p>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
