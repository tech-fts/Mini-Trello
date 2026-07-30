import { UpdateCardPositionInput } from "../entities/card";
import { DomainError } from "../../../shared/utils/http";

export function validateCardPositionInput(input: UpdateCardPositionInput): void {
  if (input.position === undefined || input.position === null) {
    throw new DomainError("Position is required");
  }

  if (!Number.isFinite(input.position) || input.position < 0) {
    throw new DomainError("Position must be a non-negative number");
  }
}
