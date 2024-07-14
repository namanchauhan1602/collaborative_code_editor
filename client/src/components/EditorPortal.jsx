import React, { useEffect, useRef } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'

function EditorPortal({ socketRef, roomId}) {

    const editorRef = useRef(null)

    useEffect(() => {
        const init = async () => {
            const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
                lineNumbers: true,
                mode: 'javascript',
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true
            })
            editorRef.current = editor
            editor.setSize(null, '95%');
            editor.on('change', (instance, changes) => {
                const { origin } = changes
                const code = instance.getValue()
                if (origin !== 'setValue') {
                    socketRef.current.emit('code-change', {
                        roomId,
                        code
                    })
                }
            })
        }
        init()
    }, [])

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('code-change', ({ code }) => {
                if (code != null) {
                    editorRef.current.setValue(code)
                }
            })
        }
        return () => {
            socketRef.current.off('code-change')
        }
    }, [socketRef.current])


    return (
        <div className='h-[100%]'>
            <h3 className='text-white mb-2'>Write your code here</h3>
            <textarea name="" id="editor"></textarea>
        </div>
    )
}

export default EditorPortal