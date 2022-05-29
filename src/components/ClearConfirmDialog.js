import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from "@emotion/react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

const ClearConfirmDialog = props => {
    const theme = useTheme();

    const handleClose = (success) => {
        if (props.onClose) {
            props.onClose(success);
        }
    };

    return (
        <Dialog
            open={props.open}
            PaperProps={{sx: {background: theme.palette.background.paper}}}
            onClose={() => handleClose(false)}
        >
            <DialogTitle>Clear all nodes</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Do you want to delete all nodes and start a new session?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(true)}>Yes</Button>
                <Button onClick={() => handleClose(false)}>No</Button>
            </DialogActions>
        </Dialog>
    );
};

ClearConfirmDialog.propTypes = {};

export default ClearConfirmDialog;