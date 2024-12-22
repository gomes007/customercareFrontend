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
            setError("Credentials are invalid!");
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Welcome!</h2>
                <p>Please enter your credentials</p>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Type your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Type your password"
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
