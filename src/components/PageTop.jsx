import * as React from 'react'

import { Helmet } from 'react-helmet-async'

const PageTop = props => {
    return (
        <Helmet>
            <title>{`${props.title} - Formsure`}</title>
            <meta
                name="description"
                content={props.description || props.title || ''}
            />
        </Helmet>
    )
}

export default PageTop
