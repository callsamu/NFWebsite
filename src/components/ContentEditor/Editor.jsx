import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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
		<EditorContent editor={editor} />
	);
};
