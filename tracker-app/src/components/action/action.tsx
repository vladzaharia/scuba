import { ReactNode } from 'react'
import './action.css'
import { CommonColor } from '../../types'

interface ActionProps {
	text?: string | JSX.Element
	description?: string | JSX.Element
	className?: string
	color?: CommonColor
	children?: ReactNode
}

export default function Action({ text, description, className, color, children }: ActionProps) {
	console.log(className)
	return (
		<div className={`action ${className || ''} ${color || ''}`}>
			<div className="text">
				{text && <span className="fw-500">{text}</span>}
				{description && <span className="description">{description}</span>}
			</div>
			{children}
		</div>
	)
}
