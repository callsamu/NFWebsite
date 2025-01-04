import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Bold, ImageIcon, Italic, List, ListOrdered, Strikethrough } from "lucide-react";

import { HeadingSelector } from "./HeadingSelector"; 

import "./Editor.scss";
import { useRef } from "react";


const ImageInputButton = ({ onChange, children }) => {
	const input = useRef(null);

	function onInputChange() {
		const file = input.current.files[0];
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			onChange(reader.result);
			input.current.value = null;
		}
	}

	return (
		<div>
			<input 
				style={{ display: "none" }} 
				ref={input} 
				type="file" 
				id="image-input"
				onChange={onInputChange}
			/>
			<label 
				for="image-input"
				onClick={() => input.current.click()} 
			>
				<button className="editor-button">
					{ children }
				</button>
			</label>
		</div>
	);
};


const ToggleButton = ({ active, children, ...buttonProps }) => {
	return (
		<button
			type="button"
			aria-selected={active}
			className="editor-button"
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
		extensions: [StarterKit, Image],
		content: content,
	});

	return (
		<div className="editor">
			<div className="editor__toolbar">
				<div>
					<HeadingSelector 
						isActive={(type, props) => editor.isActive(type, props)}
						setNode={(type, props) => editor.chain().focus().setNode(type, props).run()}
					/>
				</div>
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
				<div>
					<ImageInputButton 
						onChange={(url) => editor.chain().focus().setImage({ src: url }).run()}
					>
						<ImageIcon size={16} />
					</ImageInputButton>
				</div>
			</div>
			<div className="editor__container">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};
