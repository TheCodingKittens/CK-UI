import React from 'react';
import PropTypes from 'prop-types';
import {css, useTheme} from "@emotion/react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography} from "@mui/material";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import {scrollbar} from "../utils/css-mixins";
import {Icon} from "reaflow";

const downloadCode = (code) => {
    let element = document.getElementById('code-download-anchor');
    if (!element) {
        element = document.createElement("a");
        element.id = 'code-download-anchor';
        element.style.display = 'none';
        document.body.appendChild(element); // Required for this to work in FireFox
    }
    const file = new Blob([code], {type: 'text/x-python'});
    element.href = URL.createObjectURL(file);
    element.download = "codemeow.py";
    element.click();
}

const ExportDialog = props => {
    const theme = useTheme();
    const styles = {
        codeContainer: css`
          max-height: 50vh;
          overflow-y: auto;
          ${scrollbar(theme)}
        `
    };

    let content = '';
    if (props.commands) {
        for (let cmd of props.commands) {
            content += atob(cmd.command._decoded_bytes) + '\n';
        }
    }
    content = content.trim();

    return (
        <Dialog
            open={props.open}
            PaperProps={{sx: {background: theme.palette.background.paper}}}
            onClose={props.onClose}>
            <DialogTitle><Icon>receipt</Icon>Export current state</DialogTitle>
            <DialogContent>
                <Paper variant="outlined" sx={styles.codeContainer}>
                    <SyntaxHighlighter
                        language="python"
                        style={oneDark}
                        customStyle={{backgroundColor: 'transparent', margin: '1em'}}
                        wrapLongLines
                        showLineNumbers
                    >
                        {content}
                    </SyntaxHighlighter>
                </Paper>
                <br/>
                <Typography color="textSecondary">
                    The above is a code representation of the current graph.
                    To download it as a python file, click the button below!
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
                <Button onClick={() => downloadCode(content)}>Download</Button>
            </DialogActions>
        </Dialog>
    );
};

ExportDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    nodes: PropTypes.array
};

export default ExportDialog;