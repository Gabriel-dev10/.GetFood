"use client";

import { useEffect, useState } from "react";
import "swagger-ui-react/swagger-ui.css";

export default function DocsPage() {
  const [SwaggerUI, setSwaggerUI] = useState(null);

  useEffect(() => {
    import("swagger-ui-react").then(mod => setSwaggerUI(() => mod.default));
  }, []);

  if (!SwaggerUI) return <p>Carregando documentação...</p>;

  return <SwaggerUI url="/api/docs" />;
}
