import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

const NavigationScroll: FC<{ children: any }> = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return <>{children}</>;
};

export default NavigationScroll;
