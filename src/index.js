import './index.css'

import { BaseProvider, createLightTheme } from 'baseui'
import { PLACEMENT, ToasterContainer } from 'baseui/toast'

import { HelmetProvider } from 'react-helmet-async'
import PageRouter from './PageRouter'
import React from 'react'
import ReactDOM from 'react-dom'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import reportWebVitals from './reportWebVitals'

const engine = new Styletron()

const primitives = {
    primaryFontFamily: `'B612', sans-serif;`,
    accent50: '#ECFDF5',
    accent100: '#D1FAE5',
    accent200: '#A7F3D0',
    accent300: '#6EE7B7',
    accent400: '#34D399',
    accent500: '#10B981',
    accent600: '#059669',
    accent700: '#047857',
    accent800: '#065F46',
    accent900: '#064E3B'
}
const overrides = {
    colors: {
        buttonPrimaryFill: primitives.accent600,
        buttonPrimaryHover: primitives.accent700,
        buttonPrimaryActive: primitives.accent600,
        inputFill: '#FCFCFC'
    },
    borders: {
        buttonBorderRadius: '0.125rem'
    }
}

const theme = createLightTheme(primitives, overrides)

ReactDOM.render(
    <React.StrictMode>
        <StyletronProvider value={engine}>
            <BaseProvider theme={theme}>
                <HelmetProvider>
                    <ToasterContainer
                        placement={PLACEMENT.topRight}
                        overrides={{
                            ToastBody: {
                                style: ({ $theme }) => ({
                                    ':first-child': { marginTop: '72px' }
                                })
                            }
                        }}
                        autoHideDuration={4000}>
                        <PageRouter />
                    </ToasterContainer>
                </HelmetProvider>
            </BaseProvider>
        </StyletronProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
