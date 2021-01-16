import * as React from 'react'
import moize from 'moize'

const Logo = () => {
    return (
        <a href="/">
            <img src="/assets/img/logo.svg" alt="Formsure" className="h-6" />
        </a>
    )
}
export default moize.react(Logo)
