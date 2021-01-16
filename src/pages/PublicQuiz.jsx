import * as React from 'react'

import { Button, SIZE } from 'baseui/button'
import { COUNTRIES, PhoneInput } from 'baseui/phone-input'
// import QuizFooter from '../components/QuizFooter'
import { Controller, useForm } from 'react-hook-form'

import EmptyFormResults from '../components/EmptyFormResults'
import FormBuilder from '../components/FormBuilder'
import { FormControl } from 'baseui/form-control'
import { Helmet } from 'react-helmet-async'
import { Input } from 'baseui/input'
import Loading from '../components/Loading'
import { VscRunAll } from 'react-icons/vsc'
import { getPublicForm } from '../actions'
import { submission } from '../actions'
import { themes } from '../utils'
import { toaster } from 'baseui/toast'
import { useStyletron } from 'baseui'

const PublicQuiz = props => {
    const [css] = useStyletron()

    const [isUserdata, setIsUserdata] = React.useState(false)
    const [country, setCountry] = React.useState(COUNTRIES.US)
    const [dialcode, setDialcode] = React.useState('+1')
    const [details, setDetails] = React.useState({})
    const [form, setForm] = React.useState({})
    const [completed, setCompleted] = React.useState(false)
    const { register, errors, control, handleSubmit, reset } = useForm()
    const { qid } = props?.match?.params || ''
    const dynLinkId = window.location.search.split('d=')[1] || 'none'

    const [isLoading, setIsloading] = React.useState(true)
    const isExist = Object.keys(form).length > 0
    const isUserdetailsFilled = Object.keys(details).length > 0
    React.useEffect(() => {
        getPublicForm(qid, dynLinkId)
            .then(res => {
                const { data } = res.data
                setForm(data)
                setIsloading(false)
                if (
                    Object.keys(data.submnSettings).filter(
                        value => data.submnSettings[value] === true
                    ).length > 0
                ) {
                    setIsUserdata(true)
                }
            })
            .catch(e => {
                setIsloading(false)
            })
    }, [qid, dynLinkId])

    const onSubmitHandler = values => {
        setDetails(values)
        reset()
    }

    const submitHandler = async values => {
        let submissionObj = []

        Object.keys(values).forEach((item, i) => {
            let answerValue =
                form.defenition[i].key === 'multiOption' ||
                form.defenition[i].key === 'yesorno'
                    ? form.defenition[i].options[values[item]]
                    : values[item]
            if (form.defenition[i].key === 'phone') {
                answerValue = `${dialcode} ${answerValue}`
            }
            submissionObj.push({
                type: form.defenition[i].key,
                question: form.defenition[i].label,
                correctAns: answerValue,
                id: form.defenition[i].id
            })
        })
        const formObject = {
            formId: form._id,
            userId: form.user._id,
            isPartial: false,
            submission: submissionObj
        }
        if (dynLinkId !== 'none') {
            formObject.dynLinkId = dynLinkId
        }
        setIsloading(true)
        try {
            const res = await submission(qid, { ...formObject, ...details })
            reset({ defaultValues: '' })
            toaster.info(res?.data?.response?.message)
        } catch (e) {
            console.log(e)
            toaster.negative(e.response?.data?.response?.message)
        }
        setIsloading(false)
        setCompleted(true)
    }

    if (!isExist && isLoading) return <Loading />
    if (!isExist && !isLoading)
        return (
            <EmptyFormResults message="Sorry, we are unable to find that form." />
        )

    const background = themes.bgOverride(form.formTheme)
    const displaySettings = form.displaySettings

    return (
        <div
            className={css({
                ...background,
                minHeight: `${window.innerHeight}px`
            })}>
            <Helmet>
                <title>{form.title}</title>
                <meta
                    name="description"
                    content={form.description || form.title || ''}
                />
            </Helmet>

            <div className="container text-lg md:text-md">
                <div className="lg:w-4/6 mx-auto w-full p-4">
                    {!completed && (
                        <React.Fragment>
                            {!displaySettings.hideTitle && (
                                <h1
                                    className="font-bold md:text-4xl text-2xl mx-auto my-8 text-center"
                                    style={{ color: form.formTheme.text }}>
                                    {form.title || ''}
                                </h1>
                            )}
                            {!displaySettings.hideDescription &&
                                form.description && (
                                    <p
                                        className="mx-auto my-8 text-center xs:text-sm"
                                        style={{ color: form.formTheme.text }}>
                                        {form.description}
                                    </p>
                                )}
                        </React.Fragment>
                    )}

                    {isUserdata && !isUserdetailsFilled && !completed && (
                        <React.Fragment>
                            <form onSubmit={handleSubmit(onSubmitHandler)}>
                                {form.submnSettings.name && (
                                    <FormControl
                                        label="Your Name"
                                        caption={
                                            errors.name && errors.name.message
                                        }
                                        overrides={themes.labelOverrides(
                                            form.formTheme
                                        )}>
                                        <Input
                                            placeholder="Enter your name"
                                            error={!!errors.name}
                                            inputRef={register({
                                                required: 'Name is required'
                                            })}
                                            name="name"
                                        />
                                    </FormControl>
                                )}

                                {form.submnSettings.email && (
                                    <FormControl
                                        label="Your email"
                                        caption={
                                            errors.email && errors.email.message
                                        }
                                        overrides={themes.labelOverrides(
                                            form.formTheme
                                        )}>
                                        <Input
                                            placeholder="Enter your email address"
                                            type="email"
                                            error={!!errors.email}
                                            inputRef={register({
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
                                                    message:
                                                        'Entered value does not match email format'
                                                }
                                            })}
                                            name="email"
                                        />
                                    </FormControl>
                                )}

                                {form.submnSettings.uniqId && (
                                    <FormControl
                                        label="Your unique ID"
                                        caption={
                                            errors.uniqId &&
                                            errors.uniqId.message
                                        }
                                        overrides={themes.labelOverrides(
                                            form.formTheme
                                        )}>
                                        <Input
                                            placeholder="Enter your id"
                                            error={!!errors.uniqId}
                                            inputRef={register({
                                                required: 'ID is required'
                                            })}
                                            name="uniqId"
                                        />
                                    </FormControl>
                                )}

                                {form.submnSettings.phone && (
                                    <Controller
                                        render={({
                                            onChange,
                                            onBlur,
                                            value,
                                            name,
                                            ref
                                        }) => (
                                            <div>
                                                <FormControl
                                                    label={'Your phone number'}
                                                    caption={
                                                        errors.phone &&
                                                        errors.phone.message
                                                    }
                                                    overrides={themes.labelOverrides(
                                                        form.formTheme
                                                    )}>
                                                    <PhoneInput
                                                        country={country}
                                                        inputRef={ref}
                                                        value={value}
                                                        onTextChange={event =>
                                                            onChange(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                        onCountryChange={changeCountry => {
                                                            setDialcode(
                                                                changeCountry
                                                                    .value[0]
                                                                    .dialCode
                                                            )
                                                            setCountry(
                                                                changeCountry.option
                                                            )
                                                        }}
                                                    />
                                                </FormControl>
                                            </div>
                                        )}
                                        name="phone"
                                        control={control}
                                        defaultValue={''}
                                        rules={{
                                            required: 'Phone number required'
                                        }}
                                    />
                                )}
                                <Button
                                    type="submit"
                                    startEnhancer={() => (
                                        <VscRunAll size={24} />
                                    )}
                                    size={SIZE.large}
                                    overrides={themes.buttonOverrides(
                                        form.formTheme
                                    )}>
                                    Start Form
                                </Button>
                            </form>
                        </React.Fragment>
                    )}
                    {(isUserdetailsFilled || !isUserdata) && !completed && (
                        <FormBuilder
                            meta={{ fields: form.defenition }}
                            user={form.user}
                            onSubmit={submitHandler}
                            isLoading={isLoading}
                            formId={form._id}
                            theming={form.formTheme}
                            setDialcode={setDialcode}
                            acceptSubmission={form.acceptSubmission}
                            displaySettings={form.displaySettings}
                        />
                    )}
                    {completed && (
                        <div className="flex flex-col justify-center items-center box-border h-screen overflow-hidden h-full text-green-600 text-2xl -m-4">
                            {form.thankYouMessage}
                            <div className="my-10">
                                <Button
                                    onClick={() => {
                                        setCompleted(false)
                                    }}
                                    size={SIZE.compact}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PublicQuiz
