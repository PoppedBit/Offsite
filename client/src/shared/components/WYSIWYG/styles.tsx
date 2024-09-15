import styled from '@emotion/styled';

export const WYSIWYGContainer = styled('div')({
  // Controls
  '& .rdw-editor-toolbar': {},

  '& .wysiwyg': {
    padding: '0px 10px',
    border: 'rgba(0, 0, 0, .23) solid 1px',
    borderRadius: '5px',

    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.87)'
    },

    '&:focus-within': {
      borderColor: '#1976d2',
      borderWidth: '2px'
    },

    '.DraftEditor-editorContainer': {
      minHeight: '150px'
    }
  }
});

export const RawEditor = styled('textarea')({
  width: '100%',
  height: '300px'
});
