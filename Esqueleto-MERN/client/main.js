import React from 'react'
import { render } from 'react-dom'
import App from './App'

/**
 * Ponto de entrada para renderizar o React App como indicado no WebPack configuration Object.
 * Id Root especificado no HTML template.js
 */

 render(<App/>, document.getElementById('root'))