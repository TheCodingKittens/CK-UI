import React, {useEffect, useState} from 'react';
import {css} from "@emotion/react";
import {
    Backdrop,
    Box,
    Card,
    CardContent, CircularProgress,
    Divider,
    Typography,
    useTheme
} from "@mui/material";
import CodeDisplay from "./components/CodeDisplay";
import CodeInput from "./components/CodeInput";
import {api, getCurrentToken} from "./utils/api";


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
    };
    const [commands, setCommands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let res = await api.get('/history/' + getCurrentToken());
            if (res.status === 200) {
                setCommands(res.data.commands);
                setLoading(false);
            }
        })();
    }, []);

    const sendCommand = async input => {
        setLoading(true);
        let res = await api.post('/command', {
            command: btoa(input),
            token: getCurrentToken()
        });
        if (res.status === 200) { // TODO: update to 201
            setCommands(res.data);
            setLoading(false);
        }
    };

    const editCommand = async input => {
        // TODO: send edit command request
        // let res = await api.post('/command', {command: btoa(input)});
        // if (res.status === 200) { // TODO: update to 201
        //     res = await api.get('/history');
        //     if (res.status === 200) {
        //         setCommands(res.data);
        //     }
        // }
    };

    return (
        <Box sx={styles.appContainer}>
            <Card variant="outlined" sx={styles.mainCard} id="display-card">
                <CardContent id="display-header">
                    <Typography variant="h2" sx={styles.appTitle}>
                        codeMeow.
                    </Typography>
                </CardContent>
                <Divider/>
                <CardContent sx={styles.mainCardContent} id="code-display">
                    <CodeDisplay commands={commands} onEdit={editCommand}/>
                </CardContent>

                <Backdrop open={loading}>
                    {/*<Typography>submitting...</Typography>*/}
                    <CircularProgress color="primary"/>
                </Backdrop>
            </Card>
            <Card variant="outlined" sx={styles.inputCard}>
                <CodeInput onSend={i => sendCommand(i)}/>
            </Card>
        </Box>
    );
};

export default App;
