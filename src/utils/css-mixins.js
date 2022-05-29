
const scrollbar = theme => `
&::-webkit-scrollbar {
    width: 0.36rem;
    height: 0.36rem;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0.18rem;
    -webkit-box-shadow: inset 0 0 0.36rem rgba(0, 0, 0, .3);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.18rem;
    background-color: ${theme.palette.divider};
  }
}`;

export {
    scrollbar
}