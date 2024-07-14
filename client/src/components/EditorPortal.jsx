import React, { useEffect } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'

function EditorPortal() {

    useEffect(() => {
        const init = async () => {
            const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
                lineNumbers: true,
                mode: 'javascript',
                theme: 'dracula',
                autoCloseTags: true,
                matchBrackets: true
            }).setSize(null, '100%')
        }
        init()
    }, [])


    return (
        <div className='h-[100%]'>
            <textarea name="" id="editor"></textarea>
        </div>
    )
}

export default EditorPortal