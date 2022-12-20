const GmailAPI = require('./common/gmail')

function extractContent(message) {
  if (message) {
    return message.includes('Weber 45010001 Spirit II E-310 3-Burner')
      ? message
      : 'Email not received'
  }

  return 'Email not received'
}

export async function getEmailContent({ email, gmailCreds, after, before }) {
  const gmail = new GmailAPI(gmailCreds)
  const ToEmail = email.replace('+', '%2B')

  let content
  const totalRetry = 4

  for (let currentRetry = 0; currentRetry <= totalRetry; currentRetry++) {
    content = extractContent(
      // eslint-disable-next-line no-await-in-loop
      await gmail.readInboxContent(
        new URLSearchParams(
          `after:${after} before:${before} from:noreply@vtexcommerce.com.br to:${ToEmail}`
        ).toString()
      )
    )

    if (content !== 0) {
      return content
    }

    // await delay(5000)
  }
}
