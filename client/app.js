import 'client/style'
import Root from 'client/Root'

const root = document.createElement ('div')
root.setAttribute ('class', 'root')
document.body.appendChild (root)
Inferno.render (<Root/>, root)
