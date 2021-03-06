import {getTextWidth} from "./misc";

const BASE_PADDING = 25;

const parseCommandsToNodes = (commands, theme) => {
    let parsed = [];
    if (commands) {
        for (let wrapper of commands) {
            let wrapperNode = {
                id: wrapper.pk,
                type: "wrapper",
                nodePadding: [
                    BASE_PADDING,
                    wrapper.output.length > 0 ? BASE_PADDING + 250 : BASE_PADDING,
                    BASE_PADDING + 150,
                    BASE_PADDING
                ], // top right, bottom, left
                data: {
                    output: wrapper.output,
                    variables: wrapper.variables,
                    command: atob(wrapper.command._decoded_bytes)
                }
            };
            parsed.push(wrapperNode);
            parsed = parsed.concat(parseInnerCommands(wrapper.nodes, wrapper.pk, theme));
        }
    }
    return parsed;
};

const parseInnerCommands = (commands, parent, theme) => {
    let parsed = [];
    for (let cmd of commands) {
        // let width = (cmd.command ? cmd.command.length : 0) * 11 + 20;
        let height = 50;
        let width = 50 + (cmd.command ? getTextWidth(cmd.command, 'normal 16px Source Code Pro') : 0);
        if (width < 100) {
            width = 100;
        }
        else if (width > window.innerWidth / 2) {
            let lines = (width / (window.innerWidth / 2));
            height += 19 * lines;
            width = window.innerWidth / 2;
        }
        let cmdNode = {
            id: cmd.node_id,
            type: cmd.type,
            parent: parent,
            width: width,
            height: height,
            data: {
                command: cmd.command,
                wrapper_id: cmd.command_pk
            }
        };
        switch (cmd.type) {
            case "If.body":
            case "If.else":
            case "While.body":
            case "For.body":
                // TODO: expand by other nesting types
                cmdNode.nodePadding = [50, 25, 25, 25];
                parsed = parsed.concat(parseInnerCommands(cmd.nodes, cmd.node_id));
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
                if (!e.target_node || !e.target_node.length) continue;

                edges.push({
                    parent: e.parent_node.length ? e.parent_node : cmd.pk,
                    from: e.source_node,
                    to: e.target_node,
                    data: {
                        executed: e.executed
                    },
                    id: `${e.source_node}-${e.target_node}`
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
            let from = commands[i].pk;
            let to = commands[i + 1].pk;
            edges.push({
                id: `${from}-${to}`,
                from, to,
                data: {
                    executed: "True"
                }
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