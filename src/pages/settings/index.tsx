import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import { Container } from "src/components/general/containers/Container";

export const Settings = () => {
  return <Container className="bg-white h-[100vh]">
    <div className="grid">
      <Card>
        <CardTitle>Hello World</CardTitle>
        <CardContent>Test</CardContent>
      </Card>
    </div>
  </Container>
};
