/* import { EditorState , convertToRaw} from 'draft-js';
 */
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './textEditor.css';

const TextEditor = ({editorstate,onEditorStateChange}) => {
   

   /*  const onEditorStateChange = (editorstate)=>{
        console.log(editorstate.value)
        setEditorState(editorstate)
        getEditorContent(draftToHtml(convertToRaw(editorstate.getCurrentContent())))
    } */
   
  return (
    <div>
     <Editor
         editorState={editorstate}
         toolbarClassName="toolbarClassName"
         wrapperClassName="editorWrapper"
         editorClassName="editor"
         onEditorStateChange={onEditorStateChange}
/>;
    {/*  <textarea value={draftToHtml(convertToRaw(editorstate.getCurrentContent()))}></textarea> */}
    </div>
  )
}

export default TextEditor
