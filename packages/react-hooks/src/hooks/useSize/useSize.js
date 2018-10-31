import { useState } from "react";

export default function useSize({ width = 0, height = 0 } = {}) {
  return useState({ width, height });
}
