import React from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {generateVarChips} from "../utils/render-utils";

const VarsDialog = props => {
    return (
        <Dialog open={props.open}>
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