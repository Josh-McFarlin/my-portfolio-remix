import React from "react";
import { usePreviewSubscription } from "~/utils/sanity/utils";

interface PropTypes {
  data: any;
  setData: (data: any) => void;
  query: string;
  queryParams: string;
}

const Preview: React.FC<PropTypes> = ({
  data,
  setData,
  query,
  queryParams,
}) => {
  const { data: previewData } = usePreviewSubscription(query, {
    params: queryParams,
    initialData: data,
  });

  React.useEffect(() => setData(previewData), [previewData]);

  return <div>Preview Mode</div>;
};

export default Preview;
