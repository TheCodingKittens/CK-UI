import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import {Box, Divider, Paper, Typography} from "@mui/material";
import React from "react";
import {css} from "@emotion/react";
import VarChip from "../components/VarChip";
import {scrollbar} from "./css-mixins";

// this method picks and chooses how each node looks!
const handleNodeRender = (e, theme, onVarsClick) => {
    const styles = {
        displayContainer: css`
          max-width: 100%;
          max-height: 100%;
          overflow-x: hidden;
        `,
        nodeContainer: css`
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        `,
        nodeHeader: css`
          align-self: flex-start;
          width: 100%;
          cursor: default;
        `,
        outputContainer: css`
          height: calc(100% - 4px);
          width: 250px;
          position: absolute;
          right: 2px;
          box-sizing: border-box;
          border-radius: 0;
          border-right: 0;
          border-bottom: 0;
          border-top: 0;
          cursor: default;
        `,
        outputBox: css`
          padding: 1em;
          box-sizing: border-box;
        `,
        varsContainer: css`
          position: absolute;
          bottom: 2px;
          left: 2px;
          width: calc(100% - 250px - 4px);
          height: 150px;
          display: flex;
          flex-direction: column;
          cursor: default;
        `,
        varChipBox: css`
          width: 100%;
          flex-grow: 1;
          overflow: auto;
          cursor: pointer;
          ${scrollbar(theme)}
        `
    };

    console.log(e);

    let content = e.node.data.command;

    switch (e.node.type) {
        case "Line":
        case "If.test":
        case "While.test":
        case "For.test":
            content = (
                <SyntaxHighlighter
                    language="python"
                    style={oneDark}
                    customStyle={{backgroundColor: 'transparent'}}
                >
                    {e.node.data.command}
                </SyntaxHighlighter>
            );
            break;

        case "If.body":
            content = (
                <Box sx={styles.nodeHeader}>
                    <Typography color="textSecondary" style={{marginLeft: '0.5em'}}>
                        if true:
                    </Typography>
                    <Divider/>
                </Box>
            );
            break;

        case "If.else":
            content = (
                <Box sx={styles.nodeHeader}>
                    <Typography color="textSecondary" style={{marginLeft: '0.5em'}}>
                        else:
                    </Typography>
                    <Divider/>
                </Box>
            );
            break;

        case "While.body":
            content = (
                <Box sx={styles.nodeHeader}>
                    <Typography color="textSecondary" style={{marginLeft: '0.5em'}}>
                        while true:
                    </Typography>
                    <Divider/>
                </Box>
            );
            break;

        case "For.body":
            content = (
                <Box sx={styles.nodeHeader}>
                    <Typography color="textSecondary" style={{marginLeft: '0.5em'}}>
                        for each iteration:
                    </Typography>
                    <Divider/>
                </Box>
            );
            break;

        // THE BEHEMOTH
        case "wrapper":
            let showOutput = e.node.data.output.length > 0;
            content = (
                <>
                    {showOutput &&
                    <Paper variant="outlined" sx={styles.outputContainer}>
                        <Typography color="primary.light" style={{marginLeft: '0.5em'}}>
                            output
                        </Typography>
                        <Divider/>
                        {/*TODO: handle scroll*/}
                        <Box sx={styles.outputBox}>
                            {e.node.data.output}
                        </Box>
                    </Paper>
                    }
                    <Box sx={styles.varsContainer} style={showOutput ? {} : {width: "calc(100% - 4px)"}}>
                        <Divider/>
                        <Typography color="primary.light" style={{marginLeft: '0.5em'}}>
                            current variables
                        </Typography>
                        <Divider/>
                        <Box sx={styles.varChipBox} onClick={() => onVarsClick(e.node)}>
                            {generateVarChips(e.node.data.vars)}
                        </Box>
                    </Box>
                </>
            );
            break;
    }

    return (
        <foreignObject height={e.height} width={e.width} x={0} y={0}>
            <Paper variant="outlined" sx={styles.nodeContainer}>
                {content}
            </Paper>
        </foreignObject>
    );
};

const generateVarChips = (vars) => {
    let chips = [];
    for (let v in vars) {
        chips.push(
            <VarChip name={v} value={vars[v]}/>
        );
    }

    return chips;
};

export {
    handleNodeRender,
    generateVarChips
}