"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import "swagger-ui-react/swagger-ui.css";

interface SwaggerUIProps {
  url: string;
}

export default function DocsPage() {
  const [SwaggerUI, setSwaggerUI] = useState<ComponentType<SwaggerUIProps> | null>(null);

  useEffect(() => {
    import("swagger-ui-react").then((mod) =>
      setSwaggerUI(() => mod.default as ComponentType<SwaggerUIProps>)
    );
  }, []);

  if (!SwaggerUI) return <p>Carregando documentação...</p>;

  return <SwaggerUI url="/api/docs" />;
}
