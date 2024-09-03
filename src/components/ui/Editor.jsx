import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Undo,
  Heading,
  HeadingButtonsUI,
  ParagraphButtonUI,
  List,
  ListProperties,
  Markdown,
  Autoformat,
} from "ckeditor5";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import "ckeditor5/ckeditor5.css";

function Editor({ onChange, placeholder, data }) {
  return (
    <CKEditor
      data={data}
      editor={ClassicEditor}
      config={{
        plugins: [
          Essentials,
          Bold,
          Italic,
          Paragraph,
          Undo,
          Heading,
          HeadingButtonsUI,
          ParagraphButtonUI,
          List,
          ListProperties,
          // Markdown,
          // Autoformat,
        ],
        toolbar: [
          "undo",
          "redo",
          "|",
          "paragraph",
          "heading1",
          "heading2",
          "heading3",
          "heading4",
          "heading5",
          "heading6",
          "|",
          "bold",
          "italic",
          "|",
          "bulletedList",
          "numberedList",
        ],
        placeholder,
      }}
      onChange={onChange}
    />
  );
}

export default Editor;
