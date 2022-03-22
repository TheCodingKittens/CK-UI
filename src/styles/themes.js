import { createTheme } from '@mui/material/styles';

const typography = {
    fontFamily: [
        '"M PLUS Rounded 1c", sans-serif'
    ]
};

const themes = {
    'default': createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#9571eb',
            },
            secondary: {
                main: '#e44abc',
            },
            background: {
                default: '#242429',
                paper: '#34343C',
            }
        },
        typography
    }),
    'kitty': createTheme({
        // TODO
        palette: {},
        typography
    })
};

const getCurrentTheme = () => {
    const current = localStorage.getItem('theme') ?? 'default';
    return themes[current];
}

const changeTheme = (name) => {
    if (name in themes) {
        localStorage.setItem('theme', name);
        if (themeCallback) {
            themeCallback(getCurrentTheme());
        }
    }
}

let themeCallback;
let onThemeChange = (callback) => {
    themeCallback = callback;
};

export default {
    getCurrentTheme,
    changeTheme,
    onThemeChange
};