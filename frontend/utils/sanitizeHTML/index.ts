import DOMPurify from 'isomorphic-dompurify'

const sanitizeHTML = (html: string) => DOMPurify.sanitize(html)

export default sanitizeHTML
