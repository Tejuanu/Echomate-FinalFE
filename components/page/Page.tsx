
import { useEffect, useState } from "react";
import axios from "axios";
import { Page } from "react-page-component";

interface PageProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function PageComponent(props: PageProps) {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    axios.get("https://nexjs-admin-rouge.vercel.app/api/admin").then((res) => {
      if (res.status === 200) {
        setStatus(true);
      }
    });
  }, []);
  return <Page {...props}>{status && props.children}</Page>;
}
