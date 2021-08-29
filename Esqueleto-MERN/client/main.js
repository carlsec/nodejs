import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'

/**
 * Ponto de entrada para renderizar o React App como indicado no WebPack configuration Object.
 * Id Root especificado no HTML template.js
 */

 hydrate(<App/>, document.getElementById('root'))