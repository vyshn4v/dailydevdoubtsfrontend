import { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import { imageUpload } from '../../services/question';

// eslint-disable-next-line react/prop-types
function QuilEditor( ) {
    const [value, setValue] = useState()
    const quillRef = useRef(null);
    const handleImageUpload = (file) => {
        imageUpload(file).then((response) => {
            console.log(response.data);
            // const imageUrl = response.data.imageUrl;
            // const quill = quillRef.current.getEditor();
            // const range = quill.getSelection();
            // quill.insertEmbed(range.index, 'image', imageUrl);
        }).catch((error) => {
            console.log('Image upload failed:', error.message);
        });
    };
    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image'],
                ['code-block']
            ],
            handlers: {
                image: () => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();
                    input.onchange = () => {
                        const file = input.files[0];
                        handleImageUpload(file);
                    };
                }
            }
        }
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', "code-block"
    ]
    return [
        value,
        <ReactQuill key={13} style={{ height: "200px" }} ref={quillRef} theme="snow" modules={modules} formats={formats} onChange={e => setValue(e)} />
    ]
}

export default QuilEditor