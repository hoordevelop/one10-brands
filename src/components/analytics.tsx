import Script from "next/script";
import { safeId } from "@/lib/seo";

export function Analytics({ nonce }: { nonce?: string }) {
  const gtm = safeId(process.env.GTM_CONTAINER_ID, /^GTM-[A-Z0-9]+$/);
  const ga = gtm ? "" : safeId(process.env.GA_MEASUREMENT_ID, /^G-[A-Z0-9]+$/);
  const pixel = safeId(process.env.META_PIXEL_ID, /^\d{5,20}$/);

  return (
    <>
      {gtm ? (
        <Script id="gtm" nonce={nonce} strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${gtm}';document.head.appendChild(s);`}
        </Script>
      ) : null}
      {ga ? (
        <>
          <Script nonce={nonce} src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga4" nonce={nonce} strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      ) : null}
      {pixel ? (
        <Script id="meta-pixel" nonce={nonce} strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
