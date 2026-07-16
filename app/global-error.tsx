'use client'

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
        <main aria-labelledby="global-error-heading">
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
            Error
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
              maxWidth: '24rem',
              margin: '0 0 2rem',
              lineHeight: 1.5,
            }}
          >
            The application failed to load. You can try again, or return to the
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
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '2.75rem',
                padding: '0 1.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #3A3A3A',
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
