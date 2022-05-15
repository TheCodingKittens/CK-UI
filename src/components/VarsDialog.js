import React from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {generateVarChips} from "../utils/render-utils";
import {useTheme} from "@emotion/react";

const VarsDialog = props => {
    const theme = useTheme();
    return (
        <Dialog open={props.open} PaperProps={{sx: {background: theme.palette.background.paper}}} onClose={props.onClose}>
            <DialogTitle>Current Variables</DialogTitle>
            <DialogContent>
                {generateVarChips(props.node ? props.node.data.vars : {})}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

VarsDialog.propTypes = {
    open: PropTypes.bool,
    node: PropTypes.object,
    onClose: PropTypes.func
};

export default VarsDialog;