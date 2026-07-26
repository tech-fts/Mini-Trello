import { UpdateCardPositionInput } from "../entities/card";

export function validateCardPositionInput(input: UpdateCardPositionInput): void {
  if (input.position === undefined || input.position === null) {
    throw new Error("Position is required");
  }

  if (!Number.isFinite(input.position) || input.position < 0) {
    throw new Error("Position must be a non-negative number");
  }
}
