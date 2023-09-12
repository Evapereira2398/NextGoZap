import * as React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import SidebarContent from "../../../components/Sidebar";

const drawerWidth = 90;

const useStyles = makeStyles(() =>
   createStyles({
      root: {
         display: "flex",
         width: "100%",
         height: "100vh",
      },

      drawer: {
         width: 0,
         flexShrink: 0,
      },
    
      drawerPaper: {
         width: drawerWidth,
      },
    
      content: {
         width: "100%",
         marginLeft: drawerWidth,
      },
   })
);

export function DrawerLeft({ children }) {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{
               paper: classes.drawerPaper,
            }}
         >

            <Divider />
            <SidebarContent />
         </Drawer>
      
         <main className={classes.content}>
         {children}
         </main>
      </div>
   );
};
