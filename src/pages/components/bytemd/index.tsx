import gfm from '@bytemd/plugin-gfm'
import React, { useMemo, useState } from 'react'
import { Editor } from '@bytemd/react'
import 'bytemd/dist/index.css'

import zhHans from './zh_Hans.json'
import { Form } from '@arco-design/web-react';

// import highlightssr from '@bytemd/plugin-highlight-ssr'
// import highlight from '@bytemd/plugin-highlight'
// import breaks from '@bytemd/plugin-breaks'
// import footnotes from '@bytemd/plugin-footnotes'
// import frontmatter from '@bytemd/plugin-frontmatter'
// import gemoji from '@bytemd/plugin-gemoji'
// import mediumZoom from '@bytemd/plugin-medium-zoom'
// import 'highlight.js/styles/vs.css'

 const EditorNode = ({ContentData}) => {
  const [value, setValue] = useState('')


   const plugins = [
     gfm(),
     // highlight(),
     // highlightssr(),
     // breaks(),
     // frontmatter(),
     // footnotes(),
     // gemoji(),
     // mediumZoom(),
     // Add more plugins here
   ]

  return (

    <Editor
      locale={zhHans}
      value={value}
      plugins={plugins}
      onChange={(v) => {
        setValue(v)
        ContentData(v)
      }}
      // uploadImages={async (files) => {
      //   // upload images here
      //   return [
      //     {
      //       url: 'https://picsum.photos/200/300',
      //     },
      //   ]
      // }}
    />

  )
}

export default EditorNode;