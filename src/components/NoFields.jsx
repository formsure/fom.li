import * as React from 'react'
import moize from 'moize'

const NoFields = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center select-none my-40">
            <img
                src="/assets/img/left-arrow.svg"
                alt="No fields"
                height="300"
            />
            <h3 className="text-base cursor-default text-gray-400 mt-5">
                {message || 'Empty!'}
            </h3>
        </div>
    )
}
export default moize.react(NoFields)
