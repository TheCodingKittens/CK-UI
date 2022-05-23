import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Icon, IconButton, Paper, useTheme} from "@mui/material";
import {css} from "@emotion/react";
import CodeEditor from '@uiw/react-textarea-code-editor';

const CodeInput = props => {
    const theme = useTheme();
    const styles = {
        codeInput: css`
          font-family: Source Code Pro, sans-serif;
        `
    };
    const [currentInput, setCurrentInput] = useState("");
    const [waiting, setWaiting] = useState(false);

    const sendCurrentCode = async () => {
        setWaiting(true);
        let result = true;
        if (props.onSend) {
            result = await props.onSend(currentInput);
        }
        if (result) {
            setCurrentInput("");
        }
        setWaiting(false);
    };

    return (
        <Paper variant="outlined" sx={{
            display: "flex",
            background: theme.palette.background.default
        }}>
            <CodeEditor
                language="python"
                placeholder="Enter your code here..."
                style={{flexGrow: "1", background: theme.palette.background.default}}
                value={currentInput}
                onChange={e => setCurrentInput(e.target.value)}
                disabled={waiting}
                onKeyDown={e => {
                    if (e.ctrlKey && e.code === 'Enter') {
                        sendCurrentCode();
                        e.preventDefault();
                    }
                    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
                }}
            />
            <IconButton
                disabled={currentInput.length < 1}
                onClick={() => sendCurrentCode()}
            >
                <Icon>send</Icon>
            </IconButton>
        </Paper>
    );
};

CodeInput.propTypes = {
    onSend: PropTypes.func
};

export default CodeInput;