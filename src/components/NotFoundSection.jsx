import * as React from 'react'

import moize from 'moize'

const NotFoundSection = () => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center overflow-hidden">
            <img
                src="/assets/img/404.svg"
                alt="Formsure"
                className="mx-auto"
                width="320px"
            />
            <div className="flex items-center justify-center flex-col pt-10 mb-5 text-gray-500 text-sm">
                <a href="https://formsure.co">
                    <img
                        src="/assets/img/logo.svg"
                        alt="Formsure Logo"
                        className="h-6"
                        height="24px"
                        width="124px"
                    />
                </a>
                <p className="mt-4">Powered by Formsure</p>
                <a
                    href="https://formsure.co"
                    target="_blank"
                    className="text-xs my-1"
                    rel="noreferrer">
                    Form builder for surveys, polls, and quizzes
                </a>
                <a
                    href="https://status.formsure.co"
                    title="Status Formsure"
                    target="_blank"
                    rel="noreferrer"
                    class="text-gray-600 hover:text-gray-800 mt-3">
                    <img
                        alt="Formsure uptime"
                        height="20px"
                        width="92px"
                        src="https://img.shields.io/endpoint?style=flat-square&amp;url=https://raw.githubusercontent.com/formsure/status/master/api/formsure-dashboard/uptime.json"
                    />
                </a>
            </div>
        </div>
    )
}

export default moize.react(NotFoundSection)
