import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Editor.scss";

/**
* Rich text Editor Component
* @typedef {object} EditorProps
*  @property {string} content
*
* @param {EditorProps} props
*/
export const Editor = ({ content }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: content,
	});

	return (
		<div className="editor">
			<div className="editor__toolbar">
			</div>
			<div className="editor__container">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};
