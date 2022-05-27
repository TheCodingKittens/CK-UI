import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper} from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {useTheme} from "@emotion/react";

const EditNodeDialog = props => {
    const theme = useTheme();
    const [newCommand, setNewCommand] = useState('');

    useEffect(() => {
        if (props.node) {
            setNewCommand(props.node.data.command);
        }
    }, [props.node]);

    const handleEditClose = (success) => {
        if (props.onClose) {
            props.onClose(success ?? false, newCommand);
        }
    };

    const handleChange = e => {
        let newVal = e.target.value.trim();
        let newLine = newVal.search(/\r?\n/);
        newVal = (newLine >= 0) ? newVal.substr(0, newLine) : newVal;
        if (newVal === newCommand) {
            newVal += ' ';
        }
        setNewCommand(newVal);
    }
    return (
        <Dialog
            open={props.open} onClose={() => handleEditClose()}
            PaperProps={{sx: {background: theme.palette.background.paper}}}
        >
            <DialogTitle>
                Edit existing node
            </DialogTitle>
            <DialogContent>
                <Paper variant="outlined" sx={{overflow: "hidden"}}>
                    <CodeEditor
                        language="python"
                        style={{background: theme.palette.background.default}}
                        value={newCommand}
                        onChange={e => handleChange(e)}
                        id="edit-code-input"
                    />
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleEditClose(false)}>Cancel</Button>
                <Button onClick={() => handleEditClose(true)}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

EditNodeDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    node: PropTypes.object
};

export default EditNodeDialog;