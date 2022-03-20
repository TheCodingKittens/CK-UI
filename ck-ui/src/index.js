import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider} from "@mui/material";
import themes from "./styles/themes";

const Root = () => {
    const [theme, setTheme] = useState(themes.getCurrentTheme());
    themes.onThemeChange(newTheme => {
        setTheme(newTheme);
    })

    return (
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    );
};

ReactDOM.render(<Root/>,
    document.getElementById('root')
);

