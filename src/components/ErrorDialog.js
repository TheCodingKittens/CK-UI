import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider,
    Paper,
    Typography,
    useTheme
} from "@mui/material";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import {Light as SyntaxHighlighter} from "react-syntax-highlighter";

const ErrorDialog = props => {
    const theme = useTheme();
    return (
        <Dialog open={props.open} PaperProps={{sx: {background: theme.palette.background.paper}}} onClose={props.onClose}>
            <DialogTitle>Invalid Input!</DialogTitle>
            <DialogContent>
                <Typography>The input you supplied produced an error!</Typography>
                <br/>
                <Alert severity="error">{props.error}</Alert>
                <br/>
                <Paper variant="outlined">
                    <Typography color="text.secondary" style={{marginLeft: '0.5em'}}>your input:</Typography>
                    <Divider/>
                    <SyntaxHighlighter
                        language="python"
                        style={oneDark}
                        customStyle={{backgroundColor: 'transparent'}}
                        showLineNumbers={true}
                    >
                        {props.input}
                    </SyntaxHighlighter>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

ErrorDialog.propTypes = {
    open: PropTypes.bool,
    input: PropTypes.string,
    error: PropTypes.string,
    onClose: PropTypes.func
};

export default ErrorDialog;