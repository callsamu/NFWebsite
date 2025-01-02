import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Editor.scss";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";

const ToggleButton = ({ active, children, ...buttonProps }) => {
	return (
		<button
			type="button"
			aria-selected={active}
			className={`toggle-button ${active ? "active" : ""}`}
			{...buttonProps}
		>
			{children}
		</button>
	);
};

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
				<div>
					<ToggleButton
						title="Bold"
						onClick={() => editor.chain().focus().toggleBold().run()}
						active={editor.isActive("bold")}
					>
						<Bold size={16} />
					</ToggleButton>
					<ToggleButton
						title="Italic"
						onClick={() => editor.chain().focus().toggleItalic().run()}
						active={editor.isActive("italic")}
					>
						<Italic size={16} />
					</ToggleButton>
					<ToggleButton
						title="Strikethrough"
						onClick={() => editor.chain().focus().toggleStrike().run()}
						active={editor.isActive("strike")}
					>
						<Strikethrough size={16} />
					</ToggleButton>
				</div>
				<div>
					<ToggleButton
						title="Ordered List"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						active={editor.isActive("orderedList")}
					>
						<ListOrdered size={16} />
					</ToggleButton>
					<ToggleButton
						title="List"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						active={editor.isActive("bulletList")}
					>
						<List size={16} />
					</ToggleButton>
				</div>
			</div>
			<div className="editor__container">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};
