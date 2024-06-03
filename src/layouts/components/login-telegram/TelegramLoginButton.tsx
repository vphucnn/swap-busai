import React, { useRef, useEffect, useState } from "react";

export const TelegramLoginButton = ({
  botName,
  buttonSize,
  className,
  cornerRadius,
  requestAccess,
  usePic,
  dataOnauth,
  dataAuthUrl,
  lang,
}: any) => {
  const [loader, setLoader] = useState(false);
  const instance = useRef<any>(null);
  useEffect(() => {
    if (instance && !loader) {
      (window as any).TelegramLoginWidget = {
        dataOnauth: (user: any) => {
          dataOnauth(user);
        },
      };
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", botName);
      script.setAttribute("data-size", buttonSize);
      if (cornerRadius !== undefined) {
        script.setAttribute("data-radius", cornerRadius);
      }
      script.setAttribute("data-request-access", requestAccess);
      script.setAttribute("data-userpic", usePic);
      script.setAttribute("data-lang", lang);

      if (dataAuthUrl !== undefined) {
        script.setAttribute("data-auth-url", dataAuthUrl);
      } else {
        script.setAttribute(
          "data-onauth",
          "TelegramLoginWidget.dataOnauth(user)"
        );
      }
      script.async = true;

      instance?.current?.appendChild(script);

      setTimeout(() => {
        setLoader(true);
      }, 1000);
      console.log(instance)
    }
  }, [instance]);

  return (
    <div style={{
    }} ref={instance} className={className} />
  );
};
