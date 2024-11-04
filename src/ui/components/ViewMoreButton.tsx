"use client";

import React from "react";
import { Button, ButtonTitle } from "./common/Button";
import { useRouter } from "next/navigation";

const ViewMoreButton = () => {
  const router = useRouter();

  const handleViewMore = () => {
    router.push("/population");
  };

  return (
    <Button
      className="bg-gradient-to-r from-[#5B00FF] to-[#FB8D8D]"
      onClick={handleViewMore}
    >
      <ButtonTitle className="text-xs">View More</ButtonTitle>
    </Button>
  );
};

export default ViewMoreButton;
