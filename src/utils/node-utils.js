import {getTextWidth} from "./misc";

const BASE_PADDING = 25;

const parseCommandsToNodes = (commands, theme) => {
    let parsed = [];
    if (commands) {
        for (let wrapper of commands) {
            let wrapperNode = {
                id: wrapper.id,
                type: "wrapper",
                nodePadding: [
                    BASE_PADDING,
                    wrapper.output.length > 0 ? BASE_PADDING + 250 : BASE_PADDING,
                    BASE_PADDING + 150,
                    BASE_PADDING
                ], // top right, bottom, left
                data: {
                    output: wrapper.output,
                    vars: wrapper.vars
                }
            };
            parsed.push(wrapperNode);
            parsed = parsed.concat(parseInnerCommands(wrapper.commands, wrapper.id, theme));
        }
    }
    return parsed;
};

const parseInnerCommands = (commands, parent, theme) => {
    let parsed = [];
    for (let cmd of commands) {
        // let width = (cmd.command ? cmd.command.length : 0) * 11 + 20;
        let width = 50 + (cmd.command ? getTextWidth(cmd.command, 'normal 16px Source Code Pro') : 0);
        let cmdNode = {
            id: cmd.id,
            type: cmd.type,
            parent: parent,
            width: width,
            height: 50,
            data: {
                command: cmd.command
            }
        };
        switch (cmd.type) {
            case "If.body":
            case "If.else":
            case "While.body":
            case "For.body":
                // TODO: expand by other nesting types
                cmdNode.nodePadding = [50, 25, 25, 25];
                parsed = parsed.concat(parseInnerCommands(cmd.value, cmd.id));
                break;
            default:
                // cmdNode.text = cmd.command;
                break;
        }
        parsed.push(cmdNode);
    }

    return parsed;
}

const getNodeStyle = (data, theme) => {
    let style;
    switch (data.type) {
        case 'command':
        default:
            style = {
                backgroundColor: theme.palette.primary.dark
            };
            break;

    }
    return {
        ...style,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
};

const generateFakeEdges = nodes => {
    let edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
        let from = nodes[i].id;
        let to = nodes[i + 1].id;
        edges.push({
            id: `${from}-${to}`,
            from, to
        });
    }
    return edges;
};

const parseEdges = commands => {
    let edges = [];
    if (commands) {
        edges = generateSurfaceEdges(commands);
        for (let cmd of commands) {
            for (let e of cmd.edges) {
                edges.push({
                    parent: cmd.id,
                    ...e,
                    id: `${e.from}-${e.to}`
                })
            }
        }
    }
    return edges;
};

const generateSurfaceEdges = commands => {
    let edges = [];
    if (commands) {
        for (let i = 0; i < commands.length - 1; i++) {
            let from = commands[i].id;
            let to = commands[i + 1].id;
            edges.push({
                id: `${from}-${to}`,
                from, to
            });
        }
    }
    return edges;
}


export {
    parseCommandsToNodes,
    parseEdges,
    getNodeStyle,
    generateFakeEdges,
    generateSurfaceEdges
}