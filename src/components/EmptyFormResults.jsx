import * as React from 'react'
import moize from 'moize'

const EmptyFormResults = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center select-none my-48">
            <img
                src="/assets/img/empty-results.svg"
                alt="Empty Results"
                height="168"
            />
            <h3 className="text-xl cursor-default text-gray-400 mt-5">
                {message || 'Empty!'}
            </h3>
        </div>
    )
}
export default moize.react(EmptyFormResults)
