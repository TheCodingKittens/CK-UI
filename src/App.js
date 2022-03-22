import React from 'react';
import {css} from "@emotion/react";
import {
    Box,
    Card,
    CardContent,
    Divider,
    Typography,
    useTheme
} from "@mui/material";
import CodeDisplay from "./components/CodeDisplay";
import CodeInput from "./components/CodeInput";


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
        `,
        inputCard: css`
          margin-top: 1em;
          width: 80%;
          border: none;
        `,
    };
    return (
        <Box sx={styles.appContainer}>
            <Card variant="outlined" sx={styles.mainCard}>
                <CardContent>
                    <Typography variant="h2" sx={styles.appTitle}>
                        codeMeow.
                    </Typography>
                </CardContent>
                <Divider/>
                <CardContent>
                    <CodeDisplay/>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={styles.inputCard}>
                <CodeInput/>
            </Card>
        </Box>
    );
};

export default App;
