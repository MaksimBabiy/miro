import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import React from "react";

const AuthWrapper = ({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <main className="grow flex flex-col items-center pt-[200px]">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>{footer}</CardFooter>
      </Card>
    </main>
  );
};

export default AuthWrapper;
