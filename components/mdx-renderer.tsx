"use client";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Button } from "./Button";
import { Counter } from "./Counter";
import { useEffect, useState } from "react";

interface MDXRendererProps {
  source: string;
  className?: string;
  title?: string;
}

export function MDXRenderer({
  source,
  className = "",
  title,
}: MDXRendererProps) {
  const [serializedSource, setSerializedSource] = useState<any>(null);

  useEffect(() => {
    const serializeMDX = async () => {
      const serialized = await serialize(source);
      setSerializedSource(serialized);
    };
    serializeMDX();
  }, [source]);

  if (!serializedSource) return null;

  return (
    <MDXRemote
      {...serializedSource}
      components={{
        Button,
        Counter,
      }}
    />
  );
}
