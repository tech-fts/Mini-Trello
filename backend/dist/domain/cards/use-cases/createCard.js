"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCard = createCard;
/**
 * Create a new card.
 *
 * DRY: Validation is handled by the controller.
 *      The use-case trusts its input and focuses on orchestration.
 * SRP: This function only knows how to persist a card.
 */
async function createCard(cardRepository, input) {
    return cardRepository.create(input);
}
