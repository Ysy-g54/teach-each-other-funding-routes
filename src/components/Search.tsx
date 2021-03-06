import React from "react";
import SiteDataView from "./SiteDataView";
import { useLocation } from "react-router-dom";
import axios from "axios";

export interface SiteDetail {
  siteDetailId: string;
  siteNm: string;
  description: string;
  siteUrl: string;
  insertDateTime: string;
}

export interface ResponseData {
  siteDetails: SiteDetail[];
  size: number;
}

export default function Search() {
  const [siteDetails, setDatas] = React.useState<SiteDetail[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const location = useLocation();

  React.useEffect(() => {
    document.title = "検索結果 - Teach Each Other Funding Routes";

    setDatas([]);
    setLoading(true);
    axios
      .get(
        `https://api.codetabs.com/v1/proxy?quest=https://script.google.com/macros/s/AKfycbwaWeRmmrACLAHh_7dxHT0bOwmQWF-hlvzTw2QwUNIpwH3BeXao/exec${location.search}`
      )
      .then((response) => {
        setDatas(response.data.siteDetails);
        setCount(response.data.size);
        setLoading(false);
      });
  }, [location.search]);

  return (
    <SiteDataView
      siteDetails={siteDetails}
      size={count}
      isLoading={isLoading}
    />
  );
}
