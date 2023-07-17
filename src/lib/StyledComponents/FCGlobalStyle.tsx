"use client"

import {createGlobalStyle} from "styled-components";
import {readableColor} from "polished";

const FCGlobalStyle = createGlobalStyle`
  body {
    blockquote,
    dl,
    dd,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    figure,
    p,
    pre {
      margin: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: inherit;
      font-weight: inherit;
    }

    img,
    svg,
    video,
    canvas,
    audio,
    iframe,
    embed,
    object {
      display: block;
      vertical-align: middle;
    }

    img,
    video {
      max-width: 100%;
      height: auto;
    }

    *,
    ::before,
    ::after {
      border-width: 0;
      border-style: solid;
      border-color: theme('borderColor.DEFAULT', currentColor);
    }
    
    hr {
        border-top-width: 1px;
    }

    background: ${props => props.theme.colors.background1};
    
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: ${props => readableColor(props.theme.colors.background1)};
  }
`

export default FCGlobalStyle;