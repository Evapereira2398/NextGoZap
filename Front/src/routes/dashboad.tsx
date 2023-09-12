import { Route, Switch } from "react-router-dom";
import SendMessagePage from "../pages/ChatPage";
import KanbanPage  from '../pages/KanbanPage';
import DisparoPage from '../pages/DisparoPage';
import DefinirMsgPage from '../pages/DefinirMsgPage';
import { DrawerLeft } from "../components/Drawer";

export function Dashboard() {
  return (
    <div style={{ display: "flex", width: "100%", overflow: "hidden"}}>
      <Switch>
        <DrawerLeft>
          <Route path="/chat" component={SendMessagePage} />
          <Route path="/kanban" component={KanbanPage} />
          <Route path="/disparo" component={DisparoPage} />
          <Route path="/definirmsgpage" component={DefinirMsgPage} />
        </DrawerLeft>
      </Switch>
    </div>
  );
}