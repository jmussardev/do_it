import { useState } from "react";
import p1 from "./../public/icons/p1.png";
import p2 from "./../public/icons/p2.png";
import p3 from "./../public/icons/p3.png";

export default function switchPriotity(priority: {}) {
  switch (priority) {
    case p1:
      return p2;
    case p2:
      return p3;
    case p3:
      return p1;

    default:
      break;
  }
}
