import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
logo:  <strong>Chess.Fish Docs</strong>

,
project: {
link: 'https://github.com/partylikeits1983',
},
chat: {
link: 'https://discord.com',
},
docsRepositoryBase: 'https://github.com/partylikeits1983',
footer: {
text: 'Chess.fish Docs',
},

 useNextSeoProps() {
    return {
      titleTemplate: '%s – Chess.fish'
    }
  },

  primaryHue: { dark: 155, light: 145},

  faviconGlyph: '♕'
}

export default config
