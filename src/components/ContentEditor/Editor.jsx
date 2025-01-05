import { useMemo, useRef } from "react";

import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

import { Bold, ImageIcon, Italic, LinkIcon, List, ListOrdered, Strikethrough, UnderlineIcon } from "lucide-react";

import { HeadingSelector } from "./HeadingSelector"; 
import { LinkEditor } from "./LinkEditor";

import "./Editor.scss";


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
		extensions: [
			StarterKit, 
			Image,
			Link.configure({
			}),
			Underline,
		],
		content: content,
		onTransaction: ({ editor, transaction }) => {
			let tr = transaction;
			const removingEmptyLink = tr.getMeta("removeEmptyLink");

			if (!removingEmptyLink && !tr.selection.eq(oldSelection.current)) {
				const marks = oldSelection.current.$to.marks();

				const emptyLink = marks && marks.find(mark => 
					mark.type.name === "link" &&
					mark.attrs.href === null
				);

				if (emptyLink) {
					const { to } = oldSelection.current;
					tr = editor.state.tr.removeMark(0, to, emptyLink);
					tr = tr.setMeta("removeEmptyLink", true);
					editor.view.dispatch(tr);
				}
			}

			oldSelection.current = editor.state.selection;
		},
	});

	const oldSelection = useRef(editor.state.selection);

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
					<ToggleButton
						title="Underline"
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						active={editor.isActive("underline")}
					>
						<UnderlineIcon size={16} />
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
				<div>
					<ToggleButton
						title="Link"
						onClick={() => {
							if (editor.isActive("link")) {
								editor.chain().focus().unsetMark('link').run();
							} else {
								editor.chain().focus().toggleLink({ href: null }).run()
							}
						}}
						active={editor.isActive("link")}
					>
						<LinkIcon size={16} />
					</ToggleButton>
				</div>
			</div>
			{ editor &&
				<BubbleMenu
					editor={editor}
					tippyOptions={{ placement: 'bottom' }}
					shouldShow={({ editor }) => editor.isActive("link")}
				>
					
					<LinkEditor 
						href={editor.getAttributes("link").href} 
						onChange={(href) => editor.chain().extendMarkRange("link").setLink({ href }).run()}
						onDelete={() => editor.chain().extendMarkRange("link").unsetLink().run()}
					/>
				</BubbleMenu>
			}
			<EditorContent className="editor__container" editor={editor} />
		</div>
	);
};
