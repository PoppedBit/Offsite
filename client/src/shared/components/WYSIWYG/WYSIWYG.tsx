import { RawEditor, WYSIWYGContainer } from './styles';
import { ContentState, EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { TODO } from 'shared/types';
import { FormControlLabel, Switch } from '@mui/material';

interface Props {
  name: string;
  defaultValue?: string;
  spellCheck?: boolean;
  onChange: (name: string, value: string) => void;
  allowRaw?: boolean;
}

const WYSIWYG = (props: Props) => {
  const { name, onChange, defaultValue = '', spellCheck = true, allowRaw = false } = props;

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(defaultValue).contentBlocks)
    )
  );
  const [isRawEdit, setIsRawEdit] = useState(false);

  const handleChange = (editorState: TODO) => {
    const htmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onChange(name, htmlValue);
    setEditorState(editorState);
  };

  const handleChangeRaw = (e: TODO) => {
    // Set WYSIWYG editor state
    const htmlValue = e.target.value;
    const contentState = ContentState.createFromBlockArray(
      convertFromHTML(htmlValue).contentBlocks
    );
    setEditorState(EditorState.createWithContent(contentState));

    onChange(name, htmlValue);
  };

  const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  return (
    <WYSIWYGContainer>
      {allowRaw && (
        <FormControlLabel
          control={<Switch />}
          label="Enable Raw Editing"
          checked={isRawEdit}
          onChange={() => setIsRawEdit(!isRawEdit)}
        />
      )}
      {!isRawEdit && (
        <Editor
          editorState={editorState}
          wrapperClassName="wysiwyg-wrapper"
          editorClassName="wysiwyg"
          onEditorStateChange={handleChange}
          spellCheck={spellCheck}
        />
      )}
      {isRawEdit && <RawEditor value={value} onChange={handleChangeRaw} />}
    </WYSIWYGContainer>
  );
};

export default WYSIWYG;
