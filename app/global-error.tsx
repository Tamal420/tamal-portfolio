'use client'

const EMAIL = 'tamalsaha700.ts@gmail.com'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          color: '#FAFAFA',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '1.5rem',
        }}
      >
        <main role="alert" aria-labelledby="global-error-heading">
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#00C278',
              marginBottom: '0.75rem',
            }}
          >
            Unable to load
          </p>
          <h1
            id="global-error-heading"
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              margin: '0 0 0.75rem',
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#A1A1A1',
              maxWidth: '28rem',
              margin: '0 0 2rem',
              lineHeight: 1.55,
            }}
          >
            The application failed to load, so this page could not be shown.
            Try again. If it keeps happening, email me or return to the
            homepage.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                minHeight: '2.75rem',
                height: '2.75rem',
                padding: '0 1.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: '#FAFAFA',
                color: '#0A0A0A',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio page failed to load')}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '2.75rem',
                height: '2.75rem',
                padding: '0 1.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #00875A',
                backgroundColor: '#001A0F',
                color: '#00C278',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Email Tamal
            </a>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '2.75rem',
                height: '2.75rem',
                padding: '0 1.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #8A8A8A',
                color: '#FAFAFA',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Back to homepage
            </a>
          </div>
          {error?.digest ? (
            <p
              style={{
                marginTop: '1.5rem',
                fontSize: '0.75rem',
                color: '#8A8A8A',
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  )
}
