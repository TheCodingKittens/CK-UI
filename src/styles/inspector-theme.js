
export const getInspectorTheme = theme => {
   return {
       BASE_FONT_FAMILY: 'Source Code Pro',
       BASE_FONT_SIZE: '14px',
       BASE_LINE_HEIGHT: 1.2,

       BASE_BACKGROUND_COLOR: 'transparent',
       BASE_COLOR: theme.palette.text.primary,

       OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
       OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
       OBJECT_NAME_COLOR: "#7ac2ff",
       OBJECT_VALUE_NULL_COLOR: 'rgb(127, 127, 127)',
       OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(127, 127, 127)',
       OBJECT_VALUE_REGEXP_COLOR: "#98c379",
       OBJECT_VALUE_STRING_COLOR: "#98c379",
       OBJECT_VALUE_SYMBOL_COLOR: theme.palette.primary.main,
       OBJECT_VALUE_NUMBER_COLOR: "#d19a66",
       OBJECT_VALUE_BOOLEAN_COLOR: 'hsl(252, 100%, 75%)',
       OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "#c678dd",

       HTML_TAG_COLOR: 'rgb(93, 176, 215)',
       HTML_TAGNAME_COLOR: 'rgb(93, 176, 215)',
       HTML_TAGNAME_TEXT_TRANSFORM: 'lowercase',
       HTML_ATTRIBUTE_NAME_COLOR: 'rgb(155, 187, 220)',
       HTML_ATTRIBUTE_VALUE_COLOR: 'rgb(242, 151, 102)',
       HTML_COMMENT_COLOR: 'rgb(137, 137, 137)',
       HTML_DOCTYPE_COLOR: 'rgb(192, 192, 192)',

       ARROW_COLOR: theme.palette.primary.main,
       ARROW_MARGIN_RIGHT: 3,
       ARROW_FONT_SIZE: 12,
       ARROW_ANIMATION_DURATION: '0',

       TREENODE_FONT_FAMILY: 'Menlo, monospace',
       TREENODE_FONT_SIZE: '14px',
       TREENODE_LINE_HEIGHT: 1.2,
       TREENODE_PADDING_LEFT: 12,

       TABLE_BORDER_COLOR: 'rgb(85, 85, 85)',
       TABLE_TH_BACKGROUND_COLOR: 'rgb(44, 44, 44)',
       TABLE_TH_HOVER_COLOR: 'rgb(48, 48, 48)',
       TABLE_SORT_ICON_COLOR: 'black', //'rgb(48, 57, 66)',
       TABLE_DATA_BACKGROUND_IMAGE:
           'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))',
       TABLE_DATA_BACKGROUND_SIZE: '128px 32px',
   };
};