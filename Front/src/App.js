import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { Container, Layout } from "./style/GlobalStyle";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import light from "./style/themes/light";
import { KanbanProvider } from "./components/Kanban/KanbanContext";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={light}>
                <KanbanProvider>
                    <Layout>
                        <Container>
                            <Routes/>
                        </Container>
                    </Layout>
                    <GlobalStyle/>
                    <ToastContainer/>
                </KanbanProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
