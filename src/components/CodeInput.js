import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Icon, IconButton, InputAdornment, TextField, useTheme} from "@mui/material";
import {css} from "@emotion/react";
import {api} from "../utils/api";

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
        try {
            const result = await api.post('/command', {command: currentInput});
            setCurrentInput("");
        }
        catch (error) {
            console.error("Failed to send command to backend!", error);
        }
        setWaiting(false);
    };

    return (
        <TextField
            fullWidth multiline
            value={currentInput}
            disabled={waiting}
            onChange={e => setCurrentInput(e.target.value)}
            onKeyUp={e => {
                if (e.ctrlKey && e.code === 'Enter') {
                    sendCurrentCode();
                    e.preventDefault();
                }
                setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
            }}
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <IconButton
                            disabled={currentInput.length < 1}
                            onClick={() => sendCurrentCode()}
                        >
                            <Icon>send</Icon>
                        </IconButton>
                    </InputAdornment>,
                sx: styles.codeInput
            }}
        />
    );
};

CodeInput.propTypes = {};

export default CodeInput;