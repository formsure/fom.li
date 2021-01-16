import http from './axios'

export const submission = (slug, data) => http.post(`/submission/${slug}`, data)
export const getAwsSign = data => http.post(`/upload`, data)

export const getPublicForm = (slug, dynamicLinkId) =>
    http.get(`/f/${slug}/${dynamicLinkId}`)

export const uploadAws = (signedRequest, file, fileType) =>
    http.put(signedRequest, file, {
        headers: {
            'Content-Type': fileType,
            'x-amz-acl': 'public-read'
        }
    })
