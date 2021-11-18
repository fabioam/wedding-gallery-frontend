import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Auth, { useAuthActions } from "use-eazy-auth"
import { AuthRoute, GuestRoute } from "use-eazy-auth/routes"
import { ConfigureRj } from "react-rocketjump"
import { map } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import Login from "./pages/Login"
import Moderation from "./pages/Moderation"
import Gallery from "./pages/Gallery"
import Upload from "./pages/Upload"
import React from "react";
import "./styles.css";


const login = (credentials = {}) =>
    ajax({
        url: `${process.env.REACT_APP_API_URL}/token/`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: credentials,
    }).pipe(
        map(({ response }) => ({
            accessToken: response.access,
            refreshToken: response.refresh,
        }))
    )

const me = token =>
    ajax.getJSON(`${process.env.REACT_APP_API_URL}/me/`, {
        Authorization: `Bearer ${token}`,
    })

const refresh = refreshToken =>
    ajax({
        url: `${process.env.REACT_APP_API_URL}/token/refresh/`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: { refresh: refreshToken },
    }).pipe(
        map(({ response }) => ({
            refreshToken,
            accessToken: response.access,
        }))
    )

function ConfigureAuth({ children }) {
    const { callAuthApiObservable } = useAuthActions()
    return (
        <ConfigureRj effectCaller={callAuthApiObservable}>{children}</ConfigureRj>
    )
}


export default function App() {
    return (
        <Auth loginCall={login} meCall={me} refreshTokenCall={refresh}>
            <ConfigureAuth>
                <Router>
                    <Switch>
                        <Route path="/upload">
                            <Upload />
                        </Route>
                        <Route path="/gallery">
                            <Gallery />
                        </Route>

                        <AuthRoute path="/moderation" exact redirectTo="/login">
                            <Moderation />
                        </AuthRoute>

                        <GuestRoute path="/login" redirectTo="/moderation">
                            <Login />
                        </GuestRoute>

                        <GuestRoute path="/" redirectTo="/gallery">
                            <Gallery />
                        </GuestRoute>
                        <AuthRoute path="/" redirectTo="/gallery">
                            <Gallery />
                        </AuthRoute>
                    </Switch>
                </Router>
            </ConfigureAuth>
        </Auth>
    )
}