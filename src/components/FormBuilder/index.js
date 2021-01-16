/* eslint-disable */
import React, { useEffect, useState } from 'react'

import { Button } from 'baseui/button'
import Logo from '../../components/Logo'
import { ProgressBar } from 'baseui/progress-bar'
import WidgetRender from './widgetRender'
import { useForm } from 'react-hook-form'
import { useStyletron } from 'baseui'

const { themes } = require('../../utils')

const FormBuilder = ({
    meta,
    user,
    onSubmit,
    isLoading,
    formId,
    theming,
    displaySettings,
    setDialcode,
    acceptSubmission
}) => {
    const [css, theme] = useStyletron()
    const [progress, setProgress] = React.useState(5)

    const MAX_MB_VALUE = meta?.fields?.length
    const spacer = css({
        marginTop: theme.sizing.scale600,
        marginBottom: theme.sizing.scale600,
        display: 'flex',
        justifyContent: 'space-between'
    })

    let defaultValues = {}
    meta.fields.map(item => (defaultValues[item.key] = item.defaultValue || ''))
    const { register, control, handleSubmit, setValue, errors } = useForm({
        defaultValues: defaultValues
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} name={meta.name}>
            {meta.fields.map((item, index) => {
                return (
                    <WidgetRender
                        item={item}
                        user={user}
                        key={item.id}
                        control={control}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        formId={formId}
                        labelOverrides={themes.labelOverrides(theming)}
                        setDialcode={setDialcode}
                    />
                )
            })}
            <Button
                isLoading={isLoading}
                disabled={!acceptSubmission}
                overrides={themes.buttonOverrides(theming)}>
                Submit
            </Button>

            {!displaySettings.hideBranding && (
                <div className="flex items-center justify-center flex-col pt-10 mb-5 text-gray-500 text-sm">
                    <Logo />
                    <p className="mt-4">Powered by Formsure</p>
                    <a
                        href="https://formsure.co"
                        target="_blank"
                        className="text-xs my-1"
                        rel="noopener">
                        Form builder for surveys, polls, and quizzes
                    </a>
                </div>
            )}
        </form>
    )
}
export default FormBuilder
