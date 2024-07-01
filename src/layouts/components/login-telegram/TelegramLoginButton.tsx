import { useEffect, useRef, useState } from "react";
import { useAuth } from "src/hooks/useAuth";

export const TelegramLoginButton = ({
  botName,
  buttonSize,
  className,
  cornerRadius,
  requestAccess,
  usePic,
  dataAuthUrl,
  lang,
}: any) => {
  const [loader, setLoader] = useState(false);
  const instance = useRef<any>(null);
  const auth = useAuth()

  // const handleSubmit = async (data: any) => {
  //   try {
  //     const response = API.loginTelegram(data)
  //     console.log("response", response)
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //   }
  // };

  const handleSubmit = (data: FormData) => {
    auth.loginTelegram(data, () => {
      console.log('error')
    })
  }
  useEffect(() => {
    if (instance && !loader) {
      (window as any).TelegramLoginWidget = {
        dataOnAuth: (user: any) => {
          handleSubmit(user)
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
          "TelegramLoginWidget.dataOnAuth(user)"
        );
      }
      script.async = true;
      instance?.current?.appendChild(script);
      setTimeout(() => {
        setLoader(true);
      }, 1000);
      console.log(instance)
    }
  }, [botName, buttonSize, cornerRadius, dataAuthUrl, instance, lang, loader, requestAccess, usePic]);

  return (
    <div style={{
      display: 'none'
    }} ref={instance} className={className} />
  );
};
