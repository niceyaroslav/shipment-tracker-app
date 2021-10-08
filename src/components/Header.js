import React from "react";
import { AppBar, Container, Typography } from "@material-ui/core";

const Header = (props) => {

    return (
        <AppBar position="fixed" style={{height: "8%"}}>
        <Container fixed>
          <Typography variant="h6" className={props.classes.title}>J+M Shipment Tracker</Typography>
        </Container>
      </AppBar>
    )
}
export default Header;