import React, {useEffect, useState} from 'react';
import {css} from "@emotion/react";
import {
    Backdrop,
    Box,
    Card,
    CardContent, CircularProgress,
    Divider, Icon, IconButton, SvgIcon, Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import CodeDisplay from "./components/CodeDisplay";
import CodeInput from "./components/CodeInput";
import {api, getCurrentToken, resetToken} from "./utils/api";
import ErrorDialog from "./components/ErrorDialog";
import ExportDialog from "./components/ExportDialog";
import ClearConfirmDialog from "./components/ClearConfirmDialog";

// this does not need to update any states
let lastInput = '';
let lastAction = 'new';

const App = () => {
    const theme = useTheme();
    const styles = {
        appContainer: css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          background-color: ${theme.palette.background.default};
          color: ${theme.palette.text.primary};
          padding: 1em;
          box-sizing: border-box;
        `,
        appTitle: css`
          color: ${theme.palette.primary.main};
          font-weight: 500;
        `,
        mainCard: css`
          width: 80%;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        `,
        mainCardContent: css`
          flex-grow: 1;
          padding: 0
        `,
        inputCard: css`
          margin-top: 1em;
          width: 80%;
          border: none;
          flex-shrink: 0;
        `,
        appHeader: css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `
    };
    const [commands, setCommands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showExport, setShowExport] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const loadCommands = async () => {
        let res = await api.get('/history/' + getCurrentToken());
        if (res.status === 200) {
            setCommands(res.data.commands);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCommands();
    }, []);

    const sendCommand = async input => {
        lastInput = input;
        setLoading(true);
        lastAction = 'new';
        let result = true;
        try {
            let res = await api.post('/command', {
                command: btoa(input),
                token: getCurrentToken()
            });
            if (res.status === 200) { // TODO: update to 201
                setCommands(res.data);
            }
        } catch (error) {
            result = false;
            console.log("failed to send command!", error);
            if (error.response && error.response.data.detail) {
                setError(error.response.data.detail);
            }
        }
        setLoading(false);
        setTimeout(() => document.getElementById('code-input').focus(), 200);
        return result;
    };

    const deleteNode = async node => {
        setLoading(true);
        lastAction = 'delete';
        lastInput = node.data.command;
        try {
            let res = await api.delete(`/command/${node.id}`, {
                data: {
                    token: getCurrentToken()
                }
            });
            if (res.status === 200) {
                setCommands(res.data);
            }
        } catch (error) {
            console.log("failed to delete node!", error);
            if (error.response && error.response.data.detail) {
                setError(error.response.data.detail);
            }
        }
        setLoading(false);
    };

    const editCommand = async (node, newCommand) => {
        setLoading(true);
        lastAction = 'edit';
        lastInput = newCommand;
        try {
            let res = await api.put(`/command/${node.data.wrapper_id}`, {
                new_command: btoa(newCommand),
                token: getCurrentToken(),
                node_id: node.id
            });
            if (res.status === 200) {
                setCommands(res.data);
            }
        } catch (error) {
            console.log("failed to edit node!", error);
            if (error.response && error.response.data.detail) {
                setError(error.response.data.detail);
            }
        }
        setLoading(false);
    };

    const swapNodes = async (node1, node2) => {
        setLoading(true);
        lastAction = 'swap';
        lastInput = node1.data.command;
        try {
            let res = await api.put(`/command/${node1.id}/swap`, {
                token: getCurrentToken(),
                "swapping_wrapper_id": node2.id
            });
            if (res.status === 200) {
                setCommands(res.data);
            }
        } catch (error) {
            console.log("failed to swap nodes!", error);
            if (error.response && error.response.data.detail) {
                setError(error.response.data.detail);
            }
        }
        setLoading(false);
    };

    const handleClearConfirm = (success) => {
        setShowConfirm(false);
        if (success) {
            resetToken();
            loadCommands();
        }
    };

    return (
        <Box sx={styles.appContainer}>
            <Card variant="outlined" sx={styles.mainCard} id="display-card">
                <CardContent id="display-header" sx={styles.appHeader}>
                    <Typography variant="h2" sx={styles.appTitle}>
                        codeMeow.
                    </Typography>
                    <Box sx={{display: 'flex'}}>
                        <Tooltip title="Clear all nodes">
                            <IconButton
                                sx={{color: theme.palette.primary.light}}
                                onClick={() => setShowConfirm(true)} color="primary"
                            >
                                <Icon>clear_all</Icon>
                            </IconButton>
                        </Tooltip>
                        <label style={{width: '1em'}}/>
                        <Tooltip title="Visit the Wiki to get help!">
                            <IconButton href="https://github.com/TheCodingKittens/CK-UI/wiki">
                                <SvgIcon sx={{color: theme.palette.primary.light}}>
                                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1">
                                        <path fill-rule="evenodd"
                                              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
                                        </path>
                                    </svg>
                                </SvgIcon>
                            </IconButton>
                        </Tooltip>
                        <label style={{width: '1em'}}/>
                        <Tooltip title="Download current graph as python code">
                            <IconButton
                                sx={{color: theme.palette.primary.light}}
                                onClick={() => setShowExport(true)} color="primary"
                            >
                                <Icon>file_download</Icon>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardContent>
                <Divider/>
                <CardContent sx={styles.mainCardContent} id="code-display">
                    <CodeDisplay
                        commands={commands}
                        onEdit={editCommand}
                        onDelete={deleteNode}
                        onSwap={swapNodes}
                    />
                </CardContent>
                <Backdrop open={loading}>
                    <CircularProgress color="primary"/>
                </Backdrop>
            </Card>
            <Card variant="outlined" sx={styles.inputCard}>
                <CodeInput onSend={i => sendCommand(i)}/>
            </Card>
            <ErrorDialog
                input={lastInput}
                error={error}
                lastAction={lastAction}
                open={!!error}
                onClose={() => setError(null)}
            />
            <ExportDialog
                open={showExport}
                onClose={() => setShowExport(false)}
                commands={commands}
            />
            <ClearConfirmDialog
                open={showConfirm}
                onClose={s => handleClearConfirm(s)}
            />
        </Box>
    );
};

export default App;
