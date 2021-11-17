import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class Navbar extends React.Component{
    render() {
        return (
            <nav className="pt-4 pb-4 navbar navbar-expand-lg navbar-light  rounded "
                 aria-label="Twelfth navbar example">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">GALERIA</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/upload">ENVIAR FOTOS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/moderation">ÁREA DOS NOIVOS</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}


ReactDOM.render(
  <React.StrictMode>
      <main>
          <div className="container">
              <div className="col text-center pt-5"><img src="/logo-dark.png" alt="" className="brand-logo" /></div>
          </div>
          <Navbar />
          <div className="container">
              <div>
                  <div className=" rounded mt-3">
                      <div className="mx-auto">
                          <App />
                      </div>
                  </div>
              </div>
          </div>
      </main>

      <footer className="text-muted py-5">
          <div className="container">
              <p className="text-center mb-1">
                  <a href="#">voltar para o topo</a>
              </p>
          </div>
      </footer>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
