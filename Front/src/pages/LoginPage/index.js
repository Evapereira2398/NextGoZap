import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { X } from "react-feather";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Container, Formulario, ImageCustom, Layout, Title } from "./style";
import api, { socket } from "../../services/api";
import { useLocation } from "react-router-dom";
import { login } from "../../services/auth";
import ModalMenu from "../../components/Modal/ModalEsqueceuSenha";
import ErrorModal from "../../components/Modal/ErrorModal";
import BackdropComponent from "../../components/BackdropComponent";
import LoginImage from "../../assets/logoNextGoZap.png";
import { fontSize } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 0,
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: 0,
    width: "100%",
    height: "100%",
  },
}));

export default function LoginPage({ history }) {
  const classes = useStyles();
  const [open] = useState(true);
  const [session, setSession] = useState("");
  const [token, setToken] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const animationRef = useRef(null);
  const layoutRef = useRef(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(null);

  const { state: haveLogin } = useLocation();

  useEffect(() => {
    socket.on("qrCode", (qrCode) => {
      if (session === qrCode.session) {
        setQrCode(qrCode.data);
        handleCloseBackdrop();
        if (animationRef.current !== null) {
          animationRef.current.classList.remove("animation");
        }
      }
    });

    socket.off("session-logged").on("session-logged", (status) => {
      if (status.session === session) {
        if (token) {
          insertLocalStorage();

          setTimeout(() => {
            history.push("/chat");
          }, 500);
        }
      }
    });
  }, [session, token]);

  async function submitSession(e) {
    e.preventDefault();

    if (session === "") {
      handleOpenErrorModal();
      setTitleError("Preencha todos os campos");
      setErrorMessage(
        "Você precisa preencher todos os campos antes de continuar."
      );
    } else {
      handleToggleBackdrop();
      await startSession();
    }
  }

  function insertLocalStorage() {
    login(JSON.stringify({ session: session, token: token }));
  }

  /* Formularios */
  function toggleForm(e) {
    e.preventDefault(); // Isso impede a ação padrão do evento.
    setIsRegistering(!isRegistering);
  }

  function handleUsernameChange(e) {
    const value = e.target.value;
    setUsername(value);

    const specialCharPattern = /[!@#$%^&*(),.?":{}|<> ]/;
    if (specialCharPattern.test(value)) {
      setUsernameValid(false);
    } else {
      setUsernameValid(true);
    }
  }

  async function startSession() {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const checkConn = await api.get(
        `${session}/check-connection-session`,
        config
      );
      if (!checkConn.data.status) {
        await signSession();
      } else {
        insertLocalStorage();
        history.push("/chat");
      }
    } catch (e) {
      setTimeout(function () {
        handleCloseBackdrop();
        handleOpenErrorModal();
        setTitleError("Oops... Algo deu errado.");
        setErrorMessage("Verifique se o usuário e senha estão corretos.");
      }, 2000);
    }
  }

  async function signSession() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await api.post(`${session}/start-session`, null, config);
  }

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

  const handleCloseModal = () => {
    setOpenMenuModal(false);
  };

  const handleOpenModal = () => {
    setOpenMenuModal(true);
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Layout className={classes.paper}>
            
            
            <ModalMenu handleClose={handleCloseModal} open={openMenuModal} />
            
            <ErrorModal
              handleClose={handleCloseErrorModal}
              open={openErrorModal}
              errorMessage={errorMessage}
              titleError={titleError}
            />
            <BackdropComponent open={openBackdrop} />

            {haveLogin !== undefined ? (
              <div className={"close-item"} onClick={() => history.goBack()}>
                <X />
              </div>
            ) : null}

            <Container>
              <div className={"container-session"}>
                <div id={"left-div"}>
                  <h1> NextGo Zap </h1>
                  <p> A sua plataforma de chat online </p>
                  <img src={LoginImage} alt={"Login Team"} />
                </div>

                <div id={"right-div"}>
                  {qrCode === "" ? null : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Title>
                        <p>Escaneie o QRCode</p>
                        <p>para iniciar a sessão</p>
                      </Title>

                      <ImageCustom
                        ref={animationRef}
                        className={"animation noselect"}
                        autoplay
                        src={qrCode}
                        alt={"Smartphone"}
                        draggable={"false"}
                      />
                    </div>
                  )}

                  {qrCode !== "" ? null : (
                    <Formulario
                      onSubmit={(e) =>
                        isRegistering ? handleRegister(e) : submitSession(e)
                      }
                    >
                      <Title id={"title"}>
                        {isRegistering ? "Criar conta" : "Iniciar sessão"}
                      </Title>

                      {isRegistering ? (
                        <>
                          <div className={"top-info"}>
                            <small>Nome</small>
                          </div>

                          <input autoComplete="off" placeholder="Nome" />

                          <div className={"top-info"}>
                            <small>Nome de usuário</small>
                          </div>

                          <input
                            style={{
                              borderColor:
                                usernameValid === null
                                  ? "#737373"
                                  : usernameValid
                                  ? "green"
                                  : "red",
                              color:
                                usernameValid === null
                                  ? "black"
                                  : usernameValid
                                  ? "green"
                                  : "red",
                            }}
                            autoComplete="off"
                            placeholder={
                              usernameValid === false
                                ? "Não é permitido o uso de caracteres especiais"
                                : "Nome do usuário"
                            }
                            value={username}
                            onChange={handleUsernameChange}
                          />
                          {usernameValid === true && (
                            <span
                              style={{
                                color: "green",
                                marginLeft: "47px",
                                fontSize: "12px",
                              }}
                            >
                              Nome de usuário disponível
                            </span>
                          )}
                          {usernameValid === false && (
                            <span
                              style={{
                                color: "red",
                                marginLeft: "47px",
                                fontSize: "12px",
                              }}
                            >
                              Não é permitido o uso de caracteres especiais
                            </span>
                          )}

                          <div className={"top-info"}>
                            <small>Senha</small>
                          </div>

                          <input autoComplete="off" placeholder="Senha" />

                          <button type="submit" id="send-btn">
                            {" "}
                            Criar conta{" "}
                          </button>

                          <button onClick={toggleForm} id="new-account">
                            {" "}
                            Iniciar sessão{" "}
                          </button>
                        </>
                      ) : (
                        <>
                          <div className={"top-info"}>
                            <small>Usuário</small>
                          </div>

                          <input
                            id={"session"}
                            autoComplete="off"
                            placeholder="Nome do usuário"
                            value={session}
                            onChange={(e) => setSession(e.target.value)}
                          />

                          <div className={"top-info"}>
                            <small>Senha</small>
                          </div>

                          <input
                            id={"token"}
                            autoComplete="off"
                            placeholder="Senha"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                          />

                          <div className={"esqueceu-senha"}>
                            <span id="pass" onClick={() => handleOpenModal()}>
                              Esqueceu sua senha?
                            </span>
                          </div>

                          <button type="submit" id="send-btn">
                            Entrar
                          </button>

                          <button
                            type="button"
                            id="new-account"
                            onClick={toggleForm}
                          >
                            Criar conta
                          </button>
                        </>
                      )}
                    </Formulario>
                  )}
                </div>
              </div>
            </Container>
          </Layout>
        </Fade>
      </Modal>
    </div>
  );
}
