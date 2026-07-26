import assert from "assert";
import { Card, CreateCardInput, UpdateCardPositionInput } from "../src/domain/cards/entities/card";
import { CardRepository } from "../src/domain/cards/repositories/cardRepository";
import { getCardById } from "../src/domain/cards/use-cases/getCardById";
import { updateCardPosition } from "../src/domain/cards/use-cases/updateCardPosition";
import { InMemoryCardRepository } from "../src/infrastructure/persistence/inMemory/cardRepository";

class TestCardRepository extends InMemoryCardRepository implements CardRepository {
  seed(cards: Card[]): void {
    super.seed(cards);
  }
}

async function runCardUseCaseTests() {
  const repository = new TestCardRepository();
  repository.seed([
    {
      id: "card-1",
      boardId: "board-1",
      columnId: "col-1",
      title: "First card",
      description: "Test card 1",
      position: 0,
      createdAt: new Date().toISOString(),
    },
  ]);

  const card = await getCardById(repository, "card-1");
  assert.ok(card);
  assert.strictEqual(card?.title, "First card");

  const missingCard = await getCardById(repository, "missing");
  assert.strictEqual(missingCard, null);

  const updatedCard = await updateCardPosition(repository, "card-1", { position: 1 });
  assert.ok(updatedCard);
  assert.strictEqual(updatedCard?.position, 1);
  assert.strictEqual(updatedCard?.columnId, "col-1");

  await assert.rejects(
    async () => {
      await updateCardPosition(repository, "card-1", { position: -1 });
    },
    { message: "Position must be a non-negative number" },
  );

  await assert.rejects(
    async () => {
      await updateCardPosition(repository, "card-1", { position: NaN });
    },
    { message: "Position must be a non-negative number" },
  );

  console.log("✅ All card use-case tests passed");
}

runCardUseCaseTests().catch((error) => {
  console.error("❌ Card use-case tests failed");
  console.error(error);
  process.exit(1);
});
