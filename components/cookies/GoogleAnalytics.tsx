import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function GoogleAnalytics() {
  if (!GA_ID) return null

  return (
    <>
      {/*
        Consent Mode v2 default – runs BEFORE the GA4 script loads.
        All signals start as 'denied'. They are updated to 'granted'
        directly by saveConsent() in lib/cookieConsent.ts when the
        user interacts with the cookie banner.
      */}
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage:  'denied',
            ad_storage:         'denied',
            ad_user_data:       'denied',
            ad_personalization: 'denied',
            wait_for_update:    500,
          });
          gtag('js', new Date());
        `}
      </Script>

      {/* GA4 tag */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* GA4 config + restore consent from localStorage for returning visitors */}
      <Script id="ga-config" strategy="afterInteractive">
        {`
          gtag('config', '${GA_ID}', { send_page_view: false });

          // Restore consent for returning visitors who already made a choice
          (function() {
            try {
              var raw = localStorage.getItem('bee_cookie_consent');
              if (!raw) return;
              var s = JSON.parse(raw);
              var granted = function(v) { return v ? 'granted' : 'denied'; };
              gtag('consent', 'update', {
                analytics_storage:  granted(s.analytics),
                ad_storage:         granted(s.marketing),
                ad_user_data:       granted(s.marketing),
                ad_personalization: granted(s.marketing),
              });
              if (s.analytics) {
                gtag('event', 'page_view');
              }
            } catch(e) {}
          })();
        `}
      </Script>
    </>
  )
}
