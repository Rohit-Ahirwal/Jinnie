import { Badge } from "@/components/ui/badge";

const symbols = [
  "RepositorySyncService",
  "GithubService",
  "EmbeddingService",
  "VectorStoreService",
];

export default function RepositorySymbols() {
  return (
    <div>
      <h3 className="mb-3 font-medium">Symbols</h3>

      <div className="flex flex-wrap gap-2">
        {symbols.map((symbol) => (
          <Badge key={symbol} variant="secondary">
            {symbol}
          </Badge>
        ))}
      </div>
    </div>
  );
}
