import { KIND, Notification } from 'baseui/notification'
import { getAwsSign, uploadAws } from '../../../actions'

import { Controller } from 'react-hook-form'
import { FileUploader } from 'baseui/file-uploader'
import { FormControl } from 'baseui/form-control'
import React from 'react'
import { formatFilename } from '../../../utils'
import { validationRules } from '../utils'

const FileField = ({
    item,
    user,
    control,
    errors,
    labelOverrides,
    setValue,
    formId
}) => {
    const [errorMessage, setErrorMessage] = React.useState('')
    const [isUploading, setIsUploading] = React.useState(false)
    React.useEffect(() => {
        let content = document.getElementsByClassName('upload-files')[0]
        if (content) {
            const kbButtons = content.getElementsByTagName('button')
            if (kbButtons[0]) kbButtons[0].type = 'button'
        }
    }, [isUploading])
    const fileHandler = async (acceptedFiles, rejectedFiles, fieldName) => {
        if (Object.keys(acceptedFiles).length === 0) {
            setErrorMessage('Maximum file size exceed.')
        }
        setIsUploading(true)
        for await (let file of acceptedFiles) {
            try {
                const { data } = await getAwsSign({
                    fileName: file.name,
                    fileType: file.type,
                    formId: formId,
                    fileSize: file.size,
                    userId: user._id
                })

                const { status } = await uploadAws(
                    data.data.signedRequest,
                    file,
                    file.type
                )
                if (status === 200) {
                    setValue(fieldName, data.data.url, {
                        shouldDirty: true
                    })
                }
                setIsUploading(false)
            } catch (e) {
                setIsUploading(false)
            }
        }
    }

    return (
        <div className="upload-files fsp">
            <Controller
                render={({ onChange, onBlur, value, name, ref }) => (
                    <FormControl
                        label={item.label}
                        caption={
                            errors[item.id] || errorMessage ? (
                                <p>
                                    {errors[item.id] && errors[item.id].message}
                                    {errorMessage && errorMessage}
                                </p>
                            ) : (
                                'Maximum file upload size 10MB'
                            )
                        }
                        overrides={labelOverrides}>
                        <React.Fragment>
                            {!value ? (
                                <FileUploader
                                    accept={item.fileType}
                                    maxSize={10000000}
                                    value={value}
                                    errorMessage={errorMessage}
                                    multiple={false}
                                    onCancel={() => {
                                        setErrorMessage('')
                                        setIsUploading(false)
                                    }}
                                    onRetry={() => {
                                        setErrorMessage('')
                                        setIsUploading(false)
                                    }}
                                    inputRef={ref}
                                    progressMessage={
                                        isUploading
                                            ? `Uploading... hang tight.`
                                            : ''
                                    }
                                    overrides={{
                                        ButtonComponent: {
                                            props: {
                                                type: 'button'
                                            }
                                        }
                                    }}
                                    onDrop={(acceptedFiles, rejectedFiles) =>
                                        fileHandler(
                                            acceptedFiles,
                                            rejectedFiles,
                                            item.id
                                        )
                                    }
                                />
                            ) : (
                                <Notification
                                    kind={KIND.positive}
                                    overrides={{
                                        Body: {
                                            style: { width: 'auto' }
                                        }
                                    }}
                                    closeable
                                    onClose={() =>
                                        setValue(item.id, '', {
                                            shouldDirty: true
                                        })
                                    }>
                                    {formatFilename(value)}
                                </Notification>
                            )}
                        </React.Fragment>
                    </FormControl>
                )}
                name={item.id}
                control={control}
                defaultValue={''}
                rules={validationRules(item.rules)}
            />
        </div>
    )
}
export default FileField
