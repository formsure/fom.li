import { SIZE, StyledSpinnerNext } from 'baseui/spinner'

import React from 'react'
import { colors } from 'baseui/tokens'
import moize from 'moize'
import { withStyle } from 'baseui'

const GreenSpinner = withStyle(StyledSpinnerNext, {
    borderTopColor: colors.green500
})

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <GreenSpinner $size={SIZE.small} />
        </div>
    )
}
export default moize.react(Loading)
