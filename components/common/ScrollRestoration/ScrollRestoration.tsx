import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ScrollRestoration = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    // This effect will run every time the page path changes.
    // We are trying to scroll the main document element to the top.
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto', // 'auto' provides instant scrolling without animation
    });
  }, [asPath]); // The key change is this dependency array

  return null; // This component renders nothing.
};

export default ScrollRestoration;
