import 'client/style.scss'
import Root from 'client/Root'

import * as api from 'client/api'

window.api = api // for debugging

if (process.env.NODE_ENV !== 'production') require ('inferno-devtools')

const root = document.createElement ('div')
root.setAttribute ('class', 'root')
document.body.appendChild (root)
Inferno.render (<Root/>, root)
