"use client"

import {useServerInsertedHTML} from "next/navigation";
import {ReactNode, useState} from "react";
import {createStyleRegistry, StyleRegistry} from "styled-jsx";

type StyledRegistryProps= {
	children?: ReactNode
}

const StyledRegistry = (props: StyledRegistryProps) => {

	// Only create stylesheet once with lazy initial state
	// x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
	const [jsxStyleRegistry] = useState(() => createStyleRegistry())

	useServerInsertedHTML(() => {
		const styles = jsxStyleRegistry.styles()
		jsxStyleRegistry.flush()
		return <>{styles}</>
	})

	return <StyleRegistry registry={jsxStyleRegistry}>{props.children}</StyleRegistry>
}

export default StyledRegistry;