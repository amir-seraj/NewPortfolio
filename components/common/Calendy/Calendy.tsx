import { FC, useEffect, useState } from "react";
import { PopupButton } from "react-calendly";

interface Props {
  className?: string;
}
export const Calendy: FC<Props> = ({ children }) => {
  const [documentReady, setDocumentReady] = useState(false);
  useEffect(() => {
    setDocumentReady(true);
  }, [documentReady]);

  const pageSettings = {
    hideGdprBanner: true,
  };

  return (
    documentReady && (
      <PopupButton
        className="mb-1 mr-3 inline-block bg-[#00423B] py-4 px-7 font-heading text-sm uppercase text-white ring-[#00423B] ring-offset-2 transition duration-200 ease-linear hover:bg-[#00534A] hover:ring dark:bg-[#00423B] dark:ring-yellow-600 dark:ring-offset-yellow-700 md:px-8 2xl:ring-offset-4"
        url="https://calendly.com/amirseraj-ir"
        /*
         * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
         * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
         */
        rootElement={document.getElementById("__next")}
        pageSettings={pageSettings}
        text={children.toString()}
      />
    )
  );
};
