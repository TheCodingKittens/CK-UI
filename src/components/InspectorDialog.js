import {Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme} from "@mui/material";
import React from "react";
import {css} from "@emotion/react";
import Inspector from "react-inspector";
import {getInspectorTheme} from "../styles/inspector-theme";
import {scrollbar} from "../utils/css-mixins";

const InspectorDialog = props => {
    // TODO: Manage longer Lists by splitting them into columns or something
    // show list name, length, values
    const theme = useTheme();
    const styles = {
        dialogContainer: css`
          max-height: 80vh;
          overflow-y: auto;
          ${scrollbar(theme)}
        `
    };

    return (
        <Dialog
            open={props.open}
            PaperProps={{
                sx: {background: theme.palette.background.paper},
                onClick: e => e.stopPropagation()
            }}
            onClose={e => {
                e.stopPropagation();
                props.onClose();
            }}
        >
            <DialogTitle>Variable Details of {props.name}</DialogTitle>
            <DialogContent sx={styles.dialogContainer}>
                <Inspector
                    data={props.content}
                    expandLevel={1}
                    theme={getInspectorTheme(theme)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default InspectorDialog;