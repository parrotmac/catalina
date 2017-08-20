import 'client/style'
import Root from 'client/Root'

import * as api from 'client/api'

window.api = api // for debugging

const root = document.createElement ('div')
root.setAttribute ('class', 'root')
document.body.appendChild (root)
Inferno.render (<Root/>, root)
