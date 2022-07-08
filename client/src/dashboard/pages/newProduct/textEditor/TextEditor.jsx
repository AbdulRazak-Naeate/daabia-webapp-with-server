import { useState } from "react";
import { EditorState , convertToRaw} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './textEditor.css';

const TextEditor = ({getEditorContent}) => {
    const [editorstate,setEditorState]=useState(EditorState.createEmpty());

    const onEditorStateChange = (editorstate)=>{
        console.log(editorstate.value)
        setEditorState(editorstate)
        getEditorContent(draftToHtml(convertToRaw(editorstate.getCurrentContent())))
    }
   
  return (
    <div>
     <Editor
         editorState={editorstate}
         toolbarClassName="toolbarClassName"
         wrapperClassName="editorWrapper"
         editorClassName="editor"
         onEditorStateChange={onEditorStateChange}
/>;
     <textarea value={draftToHtml(convertToRaw(editorstate.getCurrentContent()))}></textarea>
    </div>
  )
}

export default TextEditor
