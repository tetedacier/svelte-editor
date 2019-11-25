import { css, cx } from 'emotion'
import { stopIcon, deleteIcon, checkIcon, handleIcon, lockIcon } from '../graphics'
export const checkbox = css`
flex:initial;
`
export const done = css`
border: 1px solid hsl(240, 8%, 90%);
background-color:hsl(240, 8%, 98%);
`

export const button = css`
position: absolute;
top: 0;
width: 2em;
height: 100%;
background-size: 1.4em 1.4em;
border: none;
opacity: 0;
transition: opacity 0.2s;
text-indent: -9999px;
cursor: pointer;
`

export const handleButton = cx([button, handleIcon, css`
right: 2.2em;
`])

export const terminateButton = cx([button, checkIcon, css`
right: 4.2em;
`])

export const pauseButton = cx([button, stopIcon, css`
right: 2.2em;
`])

export const reopenButton = cx([button, lockIcon, css`
right: 2.2em;
`])

export const deleteButton = cx([button, deleteIcon, css`
right: 0.2em;
`])

export const label = css`
position: relative;
display:flex;
line-height: 1.2;
padding: 0.5em;
margin: 0 0 0.5em 0;
border-radius: 2px;
user-select: none;
border: 1px solid hsl(240, 8%, 70%);
background-color:hsl(240, 8%, 93%);
color: #333;
&:hover button {
  opacity: 1;
}
`

export const h2 = css`
font-size: 2em;
font-weight: 200;
user-select: none;
margin: 0 0 0.5em 0;
`

const gridDisplay = css`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 1em;
max-width: 36em;
margin: 0 auto;
`

export const board = gridDisplay

export const action = cx([gridDisplay, css`
grid-template-columns: 1fr;
border:none;
background-color: transparent;
`])

export const actionLabel = cx([label, action])
export const actionLabelDone = cx([actionLabel, done])

export const task = css`
display:flex;
position:relative;
`
