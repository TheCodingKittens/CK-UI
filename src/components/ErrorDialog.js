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

const getTitle = lastAction => {
    switch (lastAction) {
        case 'edit':
            return 'Invalid Edit!';

        case 'delete':
            return 'Invalid Deletion!';

        case 'swap':
            return 'Invalid Swap!';

        default:
            return 'Invalid Input!';
    }
};

const getDescription = lastAction => {
    switch (lastAction) {
        case 'edit':
            return 'By editing the node in this way, errors further down the graph will be produced!';

        case 'delete':
            return 'By deleting this node, new errors in this node or further down the graph will be produced!';

        case 'swap':
            return 'By deleting these nodes, new errors will be produced!';

        default:
            return 'The input you supplied produced an error!';
    }
}

const getInputCaption = lastAction => {
    switch (lastAction) {
        case 'delete':
            return 'node to be deleted:';

        case 'edit':
            return 'your edit:';

        case 'swap':
            return 'swapped node:';

        default:
            return 'your input:';
    }
}

const ErrorDialog = props => {
    const theme = useTheme();
    return (
        <Dialog
            open={props.open}
            PaperProps={{sx: {background: theme.palette.background.paper}}}
            onClose={props.onClose}
        >
            <DialogTitle>{getTitle(props.lastAction)}</DialogTitle>
            <DialogContent>
                <Typography>{getDescription(props.lastAction)}</Typography>
                <br/>
                <Alert severity="error">{props.error}</Alert>
                <br/>
                <Paper variant="outlined">
                    <Typography color="text.secondary" style={{marginLeft: '0.5em'}}>
                        {getInputCaption(props.lastAction)}
                    </Typography>
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