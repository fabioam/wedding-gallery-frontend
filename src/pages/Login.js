import { useEffect, useState } from "react"
import { useAuthActions, useAuthState } from "use-eazy-auth"

export default function Login() {
    const { loginLoading, loginError } = useAuthState()
    const { login, clearLoginError } = useAuthActions()

    // Clear login error when Login component unmount
    useEffect(() => () => clearLoginError(), [clearLoginError])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <form
            className="row "
            onSubmit={e => {
                e.preventDefault()
                if (username !== "" && password !== "") {
                    login({ username, password })
                }
            }}
        >
            <div className="col-md-4 offset-md-4">
                <div className="form-group">
                    <input
                        placeholder="noivos"
                        className="form-control"
                        type="text"
                        value={username}
                        onChange={e => {
                            clearLoginError()
                            setUsername(e.target.value)
                        }}
                    />
                </div>
                <div className="form-group mt-2">
                    <input
                        placeholder="noivos123"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={e => {
                            clearLoginError()
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <button className="ant-btn ant-btn-light ant-btn-lg mt-3" disabled={loginLoading}>
                    {!loginLoading ? "Login" : "Logged in..."}
                </button>
                {loginError && (
                    <div className="alert alert-danger mt-3">
                        Senha ou usuário inválido.
                    </div>
                )}
            </div>
        </form>
    )
}