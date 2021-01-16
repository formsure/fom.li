import * as React from 'react'

import EmptyFormResults from '../components/EmptyFormResults'
import { Helmet } from 'react-helmet-async'
import Loading from '../components/Loading'
import QuestionList from '../components/QuestionList'
import { getsubmission } from '../actions'
import { useParams } from 'react-router-dom'

const PublicSubmission = () => {
    const [isLoading, setIsloading] = React.useState(true)
    const [submission, setSubmission] = React.useState([])
    const [meta, setMeta] = React.useState({})
    let { subSlug } = useParams()
    let isExist = submission?.length > 0
    React.useEffect(() => {
        setIsloading(true)
        getsubmission(subSlug)
            .then(res => {
                const { data } = res.data
                setSubmission(data.submission)
                setMeta({
                    createdAt: data.createdAt
                })
                setIsloading(false)
            })
            .catch(e => {
                setIsloading(false)
            })
    }, [subSlug])

    if (isLoading) return <Loading />
    if (!isExist && !isLoading)
        return (
            <EmptyFormResults message="Sorry, we are unable to find that submission." />
        )
    return (
        <div className="container text-lg md:text-md">
            <div className="lg:w-4/6 mx-auto w-full p-4">
                <Helmet>
                    <title>{`Submission`}</title>
                </Helmet>
                {isExist && (
                    <React.Fragment>
                        <QuestionList submission={submission} meta={meta} />
                        <div className="flex items-center justify-center flex-col pt-10 mb-5 text-gray-500 text-sm">
                            <p className="mt-4">Powered by Formsure</p>
                            <a
                                href="https://formsure.co"
                                target="_blank"
                                className="text-xs my-1"
                                rel="noreferrer">
                                Form builder for surveys, polls, and quizzes
                            </a>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default PublicSubmission
